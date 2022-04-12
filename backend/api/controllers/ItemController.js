const items = require("../models/Item");
const options = require("../models/Option");
const ObjectId = require('mongodb').ObjectId;
const URL = "http://localhost:3000/";

class ItemController {
  detailItem(req, res, next) {
    let param = req.params.slug;
    let type = param.slice(0, param.search("-"));
    let route = "phone";
    let capacity = param.slice(param.search("-") + 1, param.length);
    items
      .aggregate([
        { $match: { type: route } },
        {
          $lookup: {
            from: "options",
            localField: "slug",
            foreignField: "slug",
            as: "options",
          },
        },
      ])
      .then((data) => {
        options
          .find({ detail: capacity, slug: type })
          .then((options) => {
            let path = [
              { name: "Điện Thoại", href: "/phone" },
              { name: data[0].name, href: "" },
            ];
            let mainItem = options.filter((option) => {
              return option.detail === capacity;
            });

            let item = data.filter((phone) => phone.slug == type)[0];

            let alloptions = item.options;
            let techinfo = item.techInfo;
            let demoinfo = [];
            let i = 0;
            for (let infoItem of techinfo) {
              for (let detailInfoItem of infoItem.infoDetail) {
                if (demoinfo.length < 7) demoinfo.push(detailInfoItem);
                i++;
                if (i == 6) break;
              }
            }
            items.find({ type: route }).then((itemPhone) => {});
            data = data
              .filter((dataitem) => dataitem.slug != type)
              .slice(0, 10);
            res.json({
              path: path,
              item: item,
              color: mainItem[0].color,
              idOption: mainItem[0]._id,
              capacity: capacity,
              demoinfo: demoinfo,
              options: alloptions,
              sameItem: data,
            });
          })
          .catch(next);
      })
      .catch(next);
  }
  detailItemLaptop(req, res, next) {
    let param = req.params.slug;
    let type = param.slice(0, param.search("-"));
    let route = "laptop";
    let capacity = param.slice(param.search("-") + 1, param.length);
    items
      .aggregate([
        { $match: { type: route } },
        {
          $lookup: {
            from: "options",
            localField: "slug",
            foreignField: "slug",
            as: "options",
          },
        },
      ])
      .then((data) => {
        options
          .find({ detail: capacity, slug: type })
          .then((options) => {
            let path = [
              { name: "Laptop", href: "/laptop" },
              { name: data[0].name, href: "" },
            ];
            let mainItem = options.filter((option) => {
              return option.detail === capacity;
            });

            let item = data.filter((phone) => phone.slug == type)[0];

            let alloptions = item.options;
            let techinfo = item.techInfo;
            let demoinfo = [];
            let i = 0;
            for (let infoItem of techinfo) {
              for (let detailInfoItem of infoItem.infoDetail) {
                if (demoinfo.length < 7) demoinfo.push(detailInfoItem);
                i++;
                if (i == 6) break;
              }
            }
            items.find({ type: route }).then((itemPhone) => {});
            data = data
              .filter((dataitem) => dataitem.slug != type)
              .slice(0, 10);
            res.json({
              path: path,
              item: item,
              color: mainItem[0].color,
              idOption: mainItem[0]._id,
              capacity: capacity,
              demoinfo: demoinfo,
              options: alloptions,
              sameItem: data,
            });
          })
          .catch(next);
      })
      .catch(next);
  }
  detailItemTablet(req, res, next) {
    let param = req.params.slug;
    let type = param.slice(0, param.search("-"));
    let route = "tablet";
    let capacity = param.slice(param.search("-") + 1, param.length);
    items
      .aggregate([
        { $match: { type: route } },
        {
          $lookup: {
            from: "options",
            localField: "slug",
            foreignField: "slug",
            as: "options",
          },
        },
      ])
      .then((data) => {
        options
          .find({ detail: capacity, slug: type })
          .then((options) => {
            let path = [
              { name: "Tablet", href: "/tablet" },
              { name: data[0].name, href: "" },
            ];
            let mainItem = options.filter((option) => {
              return (option.detail = capacity);
            });

            let item = data.filter((phone) => phone.slug == type)[0];

            let alloptions = item.options;
            let techinfo = item.techInfo;
            let demoinfo = [];
            let i = 0;
            for (let infoItem of techinfo) {
              for (let detailInfoItem of infoItem.infoDetail) {
                if (demoinfo.length < 7) demoinfo.push(detailInfoItem);
                i++;
                if (i == 6) break;
              }
            }
            items.find({ type: route }).then((itemPhone) => {});
            data = data
              .filter((dataitem) => dataitem.slug != type)
              .slice(0, 10);
            res.json({
              path: path,
              item: item,
              color: mainItem[0].color,
              idOption: mainItem[0]._id,
              capacity: capacity,
              demoinfo: demoinfo,
              options: alloptions,
              sameItem: data,
            });
          })
          .catch(next);
      })
      .catch(next);
  }
  detailItemAccessory(req, res, next) {
    let param = req.params.slug;
    let type = param.slice(0, param.search("-"));
    let route = "accessory";
    let capacity = param.slice(param.search("-") + 1, param.length);
    items
      .aggregate([
        { $match: { type: route } },
        {
          $lookup: {
            from: "options",
            localField: "slug",
            foreignField: "slug",
            as: "options",
          },
        },
      ])
      .then((data) => {
        options
          .find({ detail: capacity, slug: type })
          .then((options) => {
            let path = [
              { name: "Phụ Kiện", href: "/accessory" },
              { name: data[0].name, href: "" },
            ];
            let mainItem = options.filter((option) => {
              return (option.detail = capacity);
            });

            let item = data.filter((phone) => phone.slug == type)[0];

            let alloptions = item.options;
            let techinfo = item.techInfo;
            let demoinfo = [];
            let i = 0;
            for (let infoItem of techinfo) {
              for (let detailInfoItem of infoItem.infoDetail) {
                if (demoinfo.length < 7) demoinfo.push(detailInfoItem);
                i++;
                if (i == 6) break;
              }
            }
            items.find({ type: route }).then((itemPhone) => {});
            data = data
              .filter((dataitem) => dataitem.slug != type)
              .slice(0, 10);
            res.json({
              path: path,
              item: item,
              color: mainItem[0].color,
              idOption: mainItem[0]._id,
              capacity: capacity,
              demoinfo: demoinfo,
              options: alloptions,
              sameItem: data,
            });
          })
          .catch(next);
      })
      .catch(next);
  }
  async getItemsAdmin (req, res, next) {
    const itemsPerPage = await items.countDocuments ({});
    //let itemsPerPage = 22;
    let page = req.query.page ? parseInt (req.query.page) : 1;
    items
      .aggregate ([
        {
          $match: {
            type: {$regex: /^/},
          },
        },
        {
          $lookup: {
            from: 'options',
            localField: 'slug',
            foreignField: 'slug',
            as: 'slug',
          },
        },
      ])
      .skip (itemsPerPage * (page - 1))
      .limit (itemsPerPage)
      .then (items => {
        res.json ({
          items: items,
        });
      })
      .catch (next);
  }

  async deleteItemAdmin (req, res, next) {
    const itemId = req.params.id;

    const itemDelete = await items.findOne ({_id: itemId});
    if (itemDelete) {
      try {
        const deleteProduct = await itemDelete.deleteOne ({_id: itemId});
      } catch (e) {
        console.error (`[Error] ${e}`);
        throw Error ('Có lỗi xảy ra, vui lòng thử lại!!');
      }
      //const deleteOption = await options.find({'item': itemId});
      //     var opts = [];
      //     opts.push (itemId);
      //     items.aggregate ([
      //       {$match: {_id: itemId}},
      //       {
      //         $lookup: {
      //           from: 'options',
      //           localField: 'item',
      //           foreignField: '_id',
      //           as: 'options',
      //         },
      //       },
      //     ])
      //     .then((data)=>{
      //       console.log(data);
      //       //options.deleteMany ({item: opts[0].toString ()});
      //     })

      //     //console.log(opts);
      //     //const optionDelete = options.find({item: opts[0].toString() }).remove();
      //     //console.log(optionDelete);
      //     //optionDelete.({item: opts[0].toString() });
      //     //console.log(optionDelete);
      //   } catch (e) {
      //     console.error (`[Error] ${e}`);
      //     throw Error ('Có lỗi xảy ra, vui lòng thử lại!!');
      //   }
      // }
      // const optionDelete = await options.find({'item': id.toString()});
    }
  }

  edit(req, res, next) {
    const id = ObjectId(req.params.id)
    console.log(id);
    items
      .aggregate([
        {
          $match: {
            _id: id
          },
        },
        {
          $lookup: {
            from: "options",
            localField: "slug",
            foreignField: "slug",
            as: "slug",
          },
        },
      ]).then((items) => {
        res.json({
          items: items,
        });
      })
      .catch(next);
  }

  updateItem(req, res, next) {
    var techInfoConvert = {
      techInfo: [
        {
          infoType: "Màn hình",
          infoDetail: [
            {
              infoName: "kích Thước Màn Hình",
              infoNum: req.body.infoNum[0]
            },
            {
              infoName: "Công nghệ màn hình",
              infoNum: req.body.infoNum[1]
            },
            {
              infoName: "Độ phân giải màn hình",
              infoNum: req.body.infoNum[2]
            }
          ]
        },
        {
          infoType: "Camera sau",
          infoDetail: [
            {
              infoName: "Camera sau",
              infoNum: req.body.infoNum[3]
            },
            {
              infoName: "Quay video",
              infoNum: req.body.infoNum[4]
            }
          ]
        },
        {
          infoType: "CPU",
          infoDetail: [
            {
              infoName: "Chip xử lí",
              infoNum: req.body.infoNum[5]
            }
          ]
        },
        {
          infoType: "RAM",
          infoDetail: [
            {
              infoName: "Bộ nhớ trong",
              infoNum: req.body.infoNum[6]
            }
          ]
        }
      ]
    }

    req.body.techInfo = techInfoConvert.techInfo;
    if (req.file != null) {
      const pathImage = '/' + req.file.path.split('\\').splice(1).join('/').split('/').slice(1).join('/')
      req.body.image[req.body.image.length] = pathImage;
    }

    console.log(req.body)
    items.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect(URL + 'admin/products/update/' + req.params.id))
      .catch(next)
  }

  updateItemDetail(req, res, next) {
    var BD = req.body;
    var str = "";

    if (req.file != null) {
      const pathImage = '/' + req.file.path.split('\\').splice(1).join('/').split('/').slice(1).join('/')
      BD.image[BD.image.length - 1] = pathImage;
    }

    req.body.name.forEach((element, index) => {
      str = str +
        '{"name": "' + element +
        '", "image": "' + BD.image[index] +
        '", "number": ' + + BD.number[index] +
        ', "price": ' + BD.price[index] +
        ', "discount": ' + BD.discount[index] + "\}, ";
    });
    str = '{"detail": "' + BD.detail + '", "color": [' + str + ']}'
    str = str.replace(', ]', ']')
    console.log(str)
    
    str = JSON.parse(str);

    options.updateOne({ _id: req.params.id }, str)
      .then(() => res.redirect(URL + 'admin/products/updateDetail/' + BD.id))
      .catch(next)
  }
  async createPostItems(req,res,next)
  {
    
    try{
      console.log("aaaaaa");
        
        var techInfoConvert = {
          techInfo: [
            {
              infoType: "Màn hình",
              infoDetail: [
                {
                  infoName: "kích Thước Màn Hình",
                  infoNum: req.body.size
                },
                {
                  infoName: "Công nghệ màn hình",
                  infoNum: req.body.typescreen
                },
                {
                  infoName: "Độ phân giải màn hình",
                  infoNum: req.body.resolution
                }
              ]
            },
            {
              infoType: "Camera sau",
              infoDetail: [
                {
                  infoName: "Camera sau",
                  infoNum: req.body.triple
                },
                {
                  infoName: "Quay video",
                  infoNum: req.body.video
                }
              ]
            },
            {
              infoType: "CPU",
              infoDetail: [
                {
                  infoName: "Chip xử lí",
                  infoNum: req.body.cpu
                }
              ]
            },
            {
              infoType: "RAM",
              infoDetail: [
                {
                  infoName: "Bộ nhớ trong",
                  infoNum: req.body.ram
                }
              ]
            }
          ]
        }
        const brand1={
          name: req.body.brand,
          brandimage: req.body.brandimage
        }
        const item={
          name: req.body.name,
          type: req.body.type,
          description: req.body.description,
          image:req.body.image,
          slug: req.body.slug,
          techInfo: techInfoConvert,
          brand: brand1
        }
        const createitem=new items(item);
       
        console.log(createitem);
        // req.body.techInfo = techInfoConvert.techInfo;
        
        try
        { var result =await createitem.save()
        .then((data)=>res.redirect(URL+"/admin/products"))
        .catch(next);
        }
        catch(e)
        {
          console.log(e.message);
        }
       
      
        res.status('200');
    }
    catch(e)
    {
      console.log("error");
      res.status(500).json({error: e.message});
    }
  }

  async findItemById(req,res,next)
  {
    try{
      var item =await items.findById(req.params.id)
      .then((item)=>(
        console.log(item),
      res.json({
        item: item,
      })))
      console.log(item);
    }
    catch(e)
    {
      console.log("error");
      res.status(500).json({error: e.message});
    }
  }
  async createPostOptions(req,res, next)
  {
    try{
      console.log(req.body);
      var color=new Array();
      for(var i=0;i<req.body.color.length;i++)
      {
        var temp={
          name:req.body.color[i],
          image:req.body.image[i],
          price:req.body.price[i],
          discount:req.body.price[i]
        }
        color.push(temp);
      }
    const option={
      slug: req.body.slug,
      detail: req.body.detail,
      color: color,
      item: req.params.id
    }
    //console.log(option);
    console.log(req.body);
    console.log(req.body.slug);
    const createoption=new options(option);
    try
        { var result =await createoption.save()
        .then((data)=>res.redirect(URL+"admin/products"))
        .catch(next);
        }
        catch(e)
        {
          console.log(e.message);
        }
  }

  catch(e)
  {
    console.log("error");
    res.status(500).json({error: e.message});
  }


  }
}
module.exports = new ItemController();
