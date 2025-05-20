const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    date:{
        type:Date
    },
    capacity:{
        type:Number
    },
    availbleSeat:{
        type:Number
    },
    createBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User"
    }
}
)

const Event = mongoose.model("Event", eventSchema)

module.exports = Event;