const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const mongoURI = 'mongodb+srv://ayesha19765:Mdb1201@cluster0.arq1aqv.mongodb.net/AshFoodMERN?retryWrites=true&w=majority';

const connectDB = async (callback) => {
    try {
        await mongoose.connect(mongoURI);
        console.log('connected to mongo');

        const foodCollection = await mongoose.connection.db.collection('food_items');
        const foodData = await foodCollection.find({}).toArray();

        const categoryCollection = await mongoose.connection.db.collection('food_category');
        const categoryData = await categoryCollection.find({}).toArray();

        callback(null, foodData, categoryData);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        callback(err, null, null);
        process.exit(1);
    }
};

module.exports = connectDB;
