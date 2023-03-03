const database = require('./database.js');

const jwt = require('jsonwebtoken');

const login = (email, password) => {
    return database.Employees.findOne({ email }).then(user => {
        if (user) {
            if (password == user.password) {
                const token = jwt.sign({ currentUser: email }, 'dotcod');
                return {
                    statusCode: 200,
                    status: true,
                    message: 'login successfully',
                    token: token
                }
            } else {
                return {
                    statusCode: 400,
                    status: false,
                    message: 'invalid password'
                }
            }
        } else {
            return {
                statusCode: 400,
                status: false,
                message: 'user not registered..please register your name'
            }
        }
    })
}

const getEmployeeDetails=()=>{
    return database.Employees.find().then(result=>{
        if(result){
            return {
                status:true,
                statusCode:200,
                employee:result
            }
        }else{
            return{
                status:false,
                statusCode:400,
                employee:[]
            }
        }
    })
}

module.exports = {
    login,
    getEmployeeDetails
}