const nodemailer = require("nodemailer");
const user = require("../models/User");
const cart = require("../models/Cart");
const address = require("../models/Address");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;
var recoveryCode = 9450;
var confirmCode = 1234;
var emailRecovery = "tnhut806@gmail.com";
var sender = process.env.NODEMAILER_MAIL;
var password = process.env.NODEMAILER_PASSWORD;

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
        if (data.modifiedCount !== 0) {
          res.json({
            status: "true",
          });
        } else {
          res.status(202).json({
            message: "Lỗi Hệ Thống",
          });
        }
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
    user
      .findOne({ _id: ObjectId(req.params.userID) })
      .then((userData) => {
        const { password, ...others } = userData._doc;
        address
          .find()
          .select("name")
          .then((data) => {
            let district = [];
            let ward = [];
            let userProvince = userData.address.province;
            let userDistrict = userData.address.district;
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
                  user: others,
                  province: data,
                  district: district,
                  ward: ward,
                });
              });
            } else {
              res.json({
                user: others,
                province: data,
                district: district,
                ward: ward,
              });
            }
          })
          .catch((err) => {});
      })
      .catch((err) => {
        res.send(err);
      });
  }
  update(req, res, next) {
    console.log("oke");
    user
      .updateOne(
        {
          _id: req.user.id,
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
        if (data.modifiedCount != 0) {
          user.findOne({ _id: req.user.id }).then((user) => {
            const { password, ...others } = user._doc;
            res.send(others);
          });
        }
      });
  }
  async getUsersAdmin(req, res, next) {
    const usersPerPage = await user.countDocuments({});
    const page = Number(req.query.page) || 1;
    user
      .find({})
      .skip(usersPerPage * (page - 1))
      .limit(usersPerPage)
      .then((user) => {
        res.json({
          user: user,
        });
      })
      .catch(next);
  }

  deleteUsersAdmin(req, res, next) {
    const userId = req.params.id;
    user
      .deleteOne({ _id: ObjectId(userId) })
      .then((data) => {
        if (data.modifiedCount != 0) {
          user.find({}).then((userRes) => {
            res.json({ user: userRes });
          });
        }
      })
      .catch(next);
  }
  deleteManyUsersAdmin(req, res, next) {
    const ids = req.body;
    user
      .deleteMany({ _id: { $in: ids } })
      .then((data) => {
        if (data.modifiedCount != 0) {
          user.find().then((userRes) => {
            res.json({ user: userRes });
          });
        }
      })
      .catch(next);
  }

  edit(req, res, next) {
    user
      .findById(req.params.id)
      .then((user) => res.json({ user: user }))
      .catch(next);
  }

  updateUser(req, res, next) {
    user
      .updateOne(
        {
          _id: req.params.id,
        },
        {
          name: req.body.username,
          isAdmin: req.body.isAdmin,
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
        if (data.modifiedCount != 0) {
          user.findOne({ _id: req.user.id }).then((user) => {
            const { password, ...others } = user._doc;
            res.send(others);
          });
        }
      });
    // if (req.body.isAdmin == "on") {
    //   req.body.isAdmin = true;
    // } else {
    //   req.body.isAdmin = false;
    // }
    // console.log(req.body);

    // user
    //   .updateOne({ _id: req.params.id }, req.body)
    //   .then(() => res.redirect(URL + "admin/customers/update/" + req.params.id))
    //   .catch(next);
  }
  editProfileAdmin(req, res, next) {
    user
      .findById(req.params.id)
      .then((users) => {
        const curPass = CryptoJS.AES.decrypt(
          users.password,
          process.env.PASS_SECRET
        ).toString(CryptoJS.enc.Utf8);

        res.json({ user: users, currentPwd: curPass });
      })
      .catch(next);
  }
  updateProfileAdmin(req, res, next) {
    var passChangeHash = CryptoJS.AES.encrypt(
      req.body.newPassword,
      process.env.PASS_SECRET
    );
    user
      .updateOne(
        {
          _id: ObjectId(req.params.id),
        },
        {
          name: req.body.username,
          password: `${passChangeHash}`,
          phone: req.body.phone,
          gender: req.body.gender,
          birthday: req.body.birthday,
          address: {
            province: req.body.province,
            district: req.body.district,
            ward: req.body.ward,
            addressdetail: req.body.addressDetail,
          },
        }
      )
      .then((data) => {
        if (data.modifiedCount != 0) {
          user.findOne({ email: req.body.email }).then((user) => {
            const { ...users } = user._doc;
            res.send(users);
          });
        }
      });
    // const {
    //   username,
    //   email,
    //   currentPassword,
    //   newPassword,
    //   newPasswordRepeat,
    //   birthday,
    //   gender,
    //   province,
    //   district,
    //   ward,
    //   addressdetail,
    //   phoneNumber,
    // } = req.body;
    // const idUser = req.params.id;
    // user
    //   .findById(idUser)
    //   .then((userRes) => {
    //     if (!userRes) {
    //       res.status(202).json({
    //         message:
    //           "Không tồn tại tài khoản, có thể đã gặp trục trặc, vui lòng kiểm tra lại phiên đăng nhập!",
    //       });
    //       res.redirect(URL + "admin/settings/");
    //       return;
    //     }
    //   user
    //     .findOne({ email: email })
    //     .then((emailRes) => {
    //       if (currentPassword || newPassword || newPasswordRepeat) {
    //         if (
    //           currentPassword !==
    //           CryptoJS.AES.decrypt(
    //             userRes.password,
    //             process.env.PASS_SECRET
    //           ).toString(CryptoJS.enc.Utf8)
    //         ) {
    //           res.redirect(URL + "admin/settings/");
    //           return;
    //         } else if (newPassword !== newPasswordRepeat) {
    //           res.redirect(URL + "admin/settings/");
    //           return;
    //         } else {
    //           userRes.password = CryptoJS.AES.encrypt(
    //             newPassword,
    //             process.env.PASS_SECRET
    //           );
    //         }
    //       }
    //       else if (!currentPassword && !newPassword && !newPassword) {
    //         if (userRes.name !== name) userRes.name = name;
    //         if (userRes.phone !== phoneNumber) userRes.phone = phoneNumber;
    //         if (userRes.birthday !== birthday) userRes.birthday = birthday;
    //         if (userRes.gender !== gender) userRes.gender = gender;
    //         if (userRes.address.province !== province)
    //           userRes.address.province = province;
    //         if (userRes.address.district !== district)
    //           userRes.address.district = district;
    //         if (userRes.address.ward !== ward) userRes.address.ward = ward;
    //         if (userRes.address.addressdetail !== addressdetail)
    //           userRes.address.addressdetail = addressdetail;

    //         user
    //           .updateOne({ _id: idUser }, userRes)
    //           .then(() => {
    //             if (data.modifiedCount != 0) {
    //               user.findOne({ _id: req.user.id }).then((user) => {
    //                 const { password, ...others } = user._doc;
    //                 res.send(others);
    //               });
    //             }
    //           })
    //           .catch(next);
    //       }
    //     })
    //     .catch(next);

    // })
    // .catch(next);
  }
}
module.exports = new AccountController();
