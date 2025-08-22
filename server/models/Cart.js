const mongoose=require("mongoose")

const CartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",  // taking the id from the "User" Schema reference, to know which user has added the Cart 
        required:true
    },
    items:[
        {
            productId:{  // taking the id from the "Product" Schema reference, to know what product has been added in the cart List
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }
    ]
},{
    timestamps:true
})

module.exports = mongoose.model("Card",CartSchema)