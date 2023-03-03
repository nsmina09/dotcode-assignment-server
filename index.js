
const express = require('express');

const app = express();

app.listen(3000);

app.use(express.json());

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200'
}));

const dataservices = require('./services/data.service');

const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['token'];
        const data = jwt.verify(token, 'dotcod');
        next();
        // if(data){
        //     return res.send("Successfully Verified");
        // }else{
        //     // Access Denied
        //     return res.status(401).send('Access denied');
        // }
    } catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: 'Access denied...please login again'
        })
    }
}

app.post('/sign-in', (req, res) => {
    dataservices.login(
        req.body.email,
        req.body.password
    ).then(result=>{
        console.log(result);
        res.status(result.statusCode).json(result);
    })
})

app.get('/get-employees',(req,res)=>{
    dataservices.getEmployeeDetails( ).then(result=>{
        res.status(result.statusCode).json(result);
    })
})