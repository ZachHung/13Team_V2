const phoneControler = require("../api/controllers/PhoneController");
const phonerouter = require("./phone");
const accountrouter = require("./account");
const checkoutrouter = require("./cart");
const purchaserouter = require("./purchase");
const searchrouter = require("./search");
const userrouter = require("./user");
const addressrouter = require("./address");
const laptoprouter = require("./laptop");
const tabletrouter = require("./tablet");
const accessorytrouter = require("./accessory");
const productsAdminrouter = require("./itemsAdmin");
const customersAdminrouter = require("./usersAdmin");
const purchasesAdminrouter = require("./purchasesAdmin");

function route(app) {
  app.use("/api/admin/products", productsAdminrouter);
  app.use("/api/admin/customers", customersAdminrouter);
  app.use("/api/admin/purchases", purchasesAdminrouter);
  app.use("/api/search", searchrouter);
  app.use("/api/laptop", laptoprouter);
  app.use("/api/accessory", accessorytrouter);
  app.use("/api/tablet", tabletrouter);
  app.use("/api/address", addressrouter);
  app.use("/api/purchase", purchaserouter);
  app.use("/api/account", accountrouter);
  app.use("/api/cart", checkoutrouter);
  app.use("/api/phone", phonerouter);
  app.use("/api/user", userrouter);
  app.get("/api", (req, res) => {
    res.send("7Team API");
  });
}
module.exports = route;
