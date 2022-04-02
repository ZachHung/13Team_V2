const nodemailer = require("nodemailer");
const user = require("../models/User");
const cart = require("../models/Cart");
const address = require("../models/Address");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
var recoveryCode = 9450;
var confirmCode = 1234;
var emailRecovery = "tnhut806@gmail.com";
var sender = "tnhut1234@outlook.com";
var password = "Trannhut1";
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secureConnection: false,
  auth: {
    user: `${sender}`, // generated ethereal user
    pass: `${password}`, // generated ethereal password
  },
  tls: {
    ciphers: "SSLv3",
  },
});

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function sendMail(desMail, Message) {
  var code = getRandom(1000, 10000);
  transporter.sendMail({
    from: `${sender}`, // sender address
    to: `${desMail}`, // list of receivers
    subject: "Mã Xác Thực Gmail", // Subject line
    text: `${Message} ${code}`, // plain text body
  });
  console.log(code);
  return code;
}
class AccountController {
  register(req, res, next) {
    user.find({ email: req.body.email }).then((users) => {
      if (users.length !== 0) {
        res.status(202).json({
          status: "false",
          message: "Email Đã Được Sử Dụng",
        });
      } else {
        res.json({ status: "true" });
        confirmCode = sendMail(
          req.body.email,
          "Mã Xác Thực gmail của bạn là :"
        );
        console.log(confirmCode);
      }
    });
  }

  registerConfirm(req, res, next) {
    if (req.body.code === `${confirmCode}`) {
      user
        .create({
          email: req.body.email,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
          ),
          phone: req.body.phone,
          name: req.body.name,
        })
        .then((userItem) => {
          cart
            .create({
              userID: userItem._id,
              list: [],
            })
            .then((cartItem) => {
              res.json({
                ...userItem,
                status: "true",
              });
            })
            .catch((err) => {
              res.json({
                status: "false",
                message: "Lỗi database vui lòng nhập lại mã",
              });
            });
        })
        .catch((err) => {
          res.json({
            status: "false",
            message: "Lỗi database vui lòng nhập lại mã",
          });
        });
    } else {
      res.json({
        status: "false",
        message: "Mã Xác Minh Không Chính Xác",
      });
    }
  }
  login(req, res, next) {
    const loginInfo = req.body;
    let email = loginInfo.email;

    user
      .findOne({ email: email })
      .then((users) => {
        if (users === null) {
          res.status(202).json({
            message: "Email Không Tồn Tại Vui Lòng Đăng Kí Tài Khoản",
          });
        } else {
          const hashedPassword = CryptoJS.AES.decrypt(
            users.password,
            process.env.PASS_SECRET
          );

          const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

          if (originPassword !== req.body.password) {
            res.status(202).json({
              message: "Mật Khẩu Không Chính Xác",
            });
          } else {
            const accessToken = jwt.sign(
              {
                id: users._id,
                isAdmin: users.isAdmin,
              },
              process.env.JWT_SECRET,
              { expiresIn: "3d" }
            );

            const { password, ...others } = users._doc;
            res.status(200).json({ ...others, accessToken });
          }
        }
      })
      .catch(next);
  }
  user(req, res, next) {
    if (typeof req.session.user == "undefined") {
      res.json({
        status: "false",
      });
    } else {
      res.json({ name: `${req.session.user.name}`, status: "true" });
    }
  }
  recovery(req, res, next) {
    user.find({ email: req.body.email }).then((users) => {
      if (users.length === 0) {
        res.status(202).json({
          status: "false",
          message: "Không Tồn Tại Tài Khoản Phù Hợp Với Email Này",
        });
      } else {
        recoveryCode = sendMail(req.body.email, "Mã Khôi Phục Của Bạn Là: ");
        res.json({
          status: "true",
        });
      }
    });
  }
  recoveryConfirm(req, res, next) {
    console.log(req.body, recoveryCode);
    if (req.body.code == recoveryCode) {
      emailRecovery = req.body.email;
      res.json({
        status: "true",
      });
    } else {
      res.status(202).json({
        status: "false",
        message: "Mã Xác Minh Không Chính Xác",
      });
    }
  }
  recoveryUpdate(req, res, next) {
    console.log(req.body, emailRecovery);
    var password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    );

    user
      .updateOne(
        {
          email: `${emailRecovery}`,
        },
        {
          password: `${password}`,
        }
      )
      .then((data) => {
        console.log(data);
        res.json({
          status: "true",
        });
      })
      .catch((err) => {
        res.json({
          status: "false",
        });
      });
  }
  signOut(req, res, next) {
    req.session.destroy();
  }
  userInfo(req, res, next) {
    address
      .find()
      .select("name")
      .then((data) => {
        let district = [];
        let ward = [];
        let userProvince = req.session.user.address.province;
        let userDistrict = req.session.user.address.district;
        data = data.map((item) => item.toObject());
        if (userProvince != "") {
          address.find({ name: userProvince }).then((districtData) => {
            districtData = districtData.map((item) => item.toObject());
            district = districtData[0].districts;

            let districtSelected = district.filter(
              (districtData) => districtData.name == userDistrict
            );

            ward = districtSelected[0].wards;
            res.json({
              user: req.session.user,
              province: data,
              district: district,
              ward: ward,
            });
          });
        } else {
          res.json({
            user: req.session.user,
            province: data,
            district: district,
            ward: ward,
          });
        }
      })
      .catch((err) => {});
    /*
		res.render("userinfo", {
			user: req.session.user,
		});
		*/
  }
  update(req, res, next) {
    user
      .updateOne(
        {
          _id: req.session.user._id,
        },
        {
          name: req.body.username,
          phone: req.body.phone,
          gender: req.body.gender,
          birthday: req.body.birthday,
          email: req.body.email,
          address: {
            province: req.body.province,
            district: req.body.district,
            ward: req.body.ward,
            addressdetail: req.body.addressDetail,
          },
        }
      )
      .then((data) => {
        (req.session.user.name = req.body.username),
          (req.session.user.phone = req.body.phone),
          (req.session.user.gender = req.body.gender),
          (req.session.user.birthday = req.body.birthday);
        req.session.user.email = req.body.email;
        req.session.user.address = {
          province: req.body.province,
          district: req.body.district,
          ward: req.body.ward,
          addressdetail: req.body.addressDetail,
        };
        req.session.save();
        res.json({
          status: "true",
        });
      });
  }
}
module.exports = new AccountController();
