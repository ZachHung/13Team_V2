const address = require("../models/Address");

class Address {
  District(req, res, next) {
    req.query.province &&
      address
        .find({ name: req.query.province })
        .then((data) => {
          data = data.map((item) => item.toObject());
          res.json(data[0].districts);
        })
        .catch(next);
  }

  Ward(req, res, next) {
    address
      .find({
        name: req.query.province,
      })
      .then((data) => {
        data = data.map((item) => item.toObject());
        let districts = data[0].districts;

        let districtSelected = districts.filter(
          (district) => district.name == req.query.district
        );

        let ward = districtSelected[0].wards;
        res.json(ward);
      })
      .catch((err) => {});
  }

  GetAllAddress(req, res, next) {
    address.find({}).then(address => res.json({ address: address }))
      .catch(next);
  }

  GetDistrict(req, res, next) {
    address.findOne({ name: req.params.name })
      .then(address => res.json({ address: address }))
      .catch(next);
  }

  GetWard(req, res, next) {
    address.findOne({ name: req.params.name1 })
      .then(address => {
        address.districts.forEach(element => {
          if(element.name == req.params.name2){
            res.json({ address: element})
          }
        });
        
      })
      .catch(next);
  }
}
module.exports = new Address();
