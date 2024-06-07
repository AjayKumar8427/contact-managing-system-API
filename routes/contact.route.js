const express =require('express');
const { createContact, getContact, getContactById, updateContact, deleteContact } = require('../controllers/contact.controller');
const validateToken = require('../middleware/validateTokenHandler');
const route=express.Router();

route.use(validateToken)

route.post('/',createContact)
route.get('/',getContact)
route.get('/:id',getContactById)
route.put('/:id',updateContact)
route.delete('/:id',deleteContact)


module.exports=route;