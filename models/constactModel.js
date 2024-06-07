const mongoose=require('mongoose');

const contactSchema= mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    }
    
},
{
    timestamps:true
}
)

module.exports =mongoose.model('contact',contactSchema);