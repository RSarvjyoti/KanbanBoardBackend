const { connect } = require('mongoose');

const connectDB = async (url) =>{
    try{
        await connect(url);
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;