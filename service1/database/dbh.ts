import mongoose from 'mongoose';
const dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/Present'

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err) {
        console.log(`Failed to connect to databsae ${dbUrl}`);
    } else {
        console.log(`Connect to database sucessfully ${dbUrl}`);
    }
});

export { mongoose }