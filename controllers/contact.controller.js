const asyncHandler=require('express-async-handler');
const contact =require('../models/constactModel');

// @access private
const createContact= asyncHandler(async(req,res)=>{
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fiels are mandatory !")
    }
     
    const allContact= await contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(allContact)
});

// @access private
const getContact=asyncHandler(async(req,res)=>{
    const allContact= await contact.find({user_id : req.user.id});
    res.status(200).json(allContact);

});

// @access private
const getContactById=asyncHandler(async (req,res)=>{
    const singleContact = await contact.findById(req.params.id);
    if(!singleContact){
        res.status(404);
        throw new Error("contact not found")
    }
    res.status(200).json(singleContact)
})

// @access private
const updateContact=asyncHandler(async(req,res)=>{
    const contact= await contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user donsn't have permission to update other user contacts");
    }

    const toUpdate= await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true});


    res.status(200).json(toUpdate)
})

// @access private
const deleteContact=asyncHandler(async(req,res)=>{
    const contact= await contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user donsn't have permission to delete other user contacts");
    }
    const Contact = await contact.findByIdAndDelete(req.params.id);
    res.status(200).json(Contact)
});


module.exports={createContact,getContact,getContactById,updateContact,deleteContact}