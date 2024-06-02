const mongoose = require('mongoose');
import dotenv from 'dotenv';

import colors from 'colors';
import { users } from './data/user';
import { products } from './data/products';
import User from './models/users'
import Product from './models/product';
import connectDB from './config/db';
import Order from './models/order';
dotenv.config();
connectDB();
const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        const createUsers = await User.insertMany(users);
        const adminUser = createUsers[0]._id;
        const sampleProducts = products.map((product)=> {
            return {...product, user: adminUser}
        })
        await Product.insertMany(sampleProducts);
        console.log('Data Imported!');
        process.exit(1);
    }
    catch(error:Error | any){
     console.log(`${error}`,'Error happened');
    }
}
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed!')
    }
    catch(error:Error | any){
        console.log(`${error}`);
    }
}
if(process.argv[2] == '-d'){
    destroyData();
}
else {
    importData();
}