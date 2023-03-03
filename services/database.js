const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/dotcode',);

const Employees=mongoose.model('Employees',{
    email:String,
    password:String
});

module.exports={
    Employees
}