require("dotenv").config();

if(!process.env.RENDER){
  console.log('目前在 Render 環境下運行，使用 Render 環境變數')
}else{
  const dotenv = require('dotenv')
  const result = dotenv.config()
}

const { DataSource } = require("typeorm");
const Users = require("../entities/Users");
const Products = require("../entities/Products");
const ProductCategories = require("../entities/ProductCategories");
const ProductTags = require("../entities/ProductTags");
const ProductLinkTags = require("../entities/ProductLinkTags");
const Orders = require("../entities/Orders");
const OrderLinkProducts = require("../entities/OrderLinkProducts");

const dataSource = new DataSource({
  type: "postgres",
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  poolSize: 10,
  entities: [
    Users,
    ProductCategories,
    ProductTags,
    Products,
    ProductLinkTags,
    Orders,
    OrderLinkProducts,
  ],
  ssl:false,
});

module.exports = { dataSource };
