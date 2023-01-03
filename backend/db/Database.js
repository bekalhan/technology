const mongoose = require('mongoose');

    try{
         mongoose.connect(process.env.DB_URL,{
            useUnifiedTopology : true,
            useNewUrlParser : true
        })
        console.log("connected to database")
    }catch(error){
        console.log(error);
    }