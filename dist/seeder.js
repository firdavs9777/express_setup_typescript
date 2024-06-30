"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./data/user");
const products_1 = require("./data/products");
const users_1 = __importDefault(require("./models/users"));
const product_1 = __importDefault(require("./models/product"));
const db_1 = __importDefault(require("./config/db"));
const order_1 = __importDefault(require("./models/order"));
dotenv_1.default.config();
(0, db_1.default)();
const importData = async () => {
    try {
        await order_1.default.deleteMany();
        await product_1.default.deleteMany();
        await users_1.default.deleteMany();
        const createUsers = await users_1.default.insertMany(user_1.users);
        const adminUser = createUsers[0]._id;
        const sampleProducts = products_1.products.map((product) => {
            return { ...product, user: adminUser };
        });
        await product_1.default.insertMany(sampleProducts);
        process.exit(1);
    }
    catch (error) {
        console.log(`${error}`, 'Error happened');
    }
};
const destroyData = async () => {
    try {
        await order_1.default.deleteMany();
        await product_1.default.deleteMany();
        await users_1.default.deleteMany();
        console.log('Data Destroyed!');
    }
    catch (error) {
        console.log(`${error}`);
    }
};
if (process.argv[2] == '-d') {
    destroyData();
}
else {
    importData();
}
