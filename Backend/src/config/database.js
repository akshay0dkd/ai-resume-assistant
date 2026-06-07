
const mongoose = require("mongoose")




async function connectToDb() { 
try {   await  mongoose.connect(process.env.MONGO_URI)

   console.log("Connected to Database.")
}
  catch(err){
    console.log(err)
  }
}

module.exports =  connectToDb