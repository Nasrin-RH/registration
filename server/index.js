
const express=require("express");
const app=express();
const cors=require("cors");
const pool=require("./db");
const bcrypt = require('bcrypt');//to hash password
const jwt = require('jsonwebtoken');
const secret_key = '3ph_davas';


var corsOption = {
    origin: true,//reflects req oigin as defined by req.header('Origin')
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',//configures access-control-allow-methods
    credentials: true,//to pass header
    exposedHeaders: ['x-auth-token']//expose custom header
};

const logger = require('morgan');
const { response } = require("express");
//middleware
app.use(cors(corsOption));
app.use(express.json());//req.body
app.use(logger('dev')) //status color change


//register

//get all
app.get("/reg" , async(req,res) => {
    try {
        const allTodos = await pool.query("select * from users1");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//post a row

app.post("/reg",async(req,response) => {
    //try {
      
        const {name,company,department,designation,contact,email,password} = req.body;



        bcrypt.hash(password, 10).then(function (hash) {
            
            if( name != '' && password != '' && email != '' && 
                company != '' && department != '' && designation != '' && 
                contact != '' ) {
                pool.query(`INSERT INTO users1 (name,company,department,designation,contact,email,password)
                            VALUES ($1, $2, $3, $4, $5, $6, $7)`, [name,company,department,designation,contact,email,hash], (error, results) => {
                    if(error) {
                        console.log(error)
                        response.status(500).json({ msg: "ERROR", err: error });
                    } else {
                        response.status(200).json({ msg: "REGISTERED" });
                    }
                });
            } else {
                response.status(403).json({ msg: "INVALID INPUT" });
            }
        });
   // };
    
        
        // const newTodo = await pool.query(
        //   "insert into users1 (name,company,department,designation,contact,email,password) values($1,$2,$3,$4,$5,$6,$7) returning *",
        //   [ 
        //     name,company,department,designation,contact,email,password
         
        //   ]
        // );
        

    //     //send response with the status and a message in json format so the the frontend receices a proper response
    //     res.status(200).json({msg:"success",result:newTodo.rows[0]});

    // } catch (err) {
    //     console.error(err.message);
    //     //similar for error messages
    //     res.status(500).json({msg:"Error",result:err})
    // }
});

//signin

app.get("/signin" , async(req,response) => {
    try {
        const allTodos = await pool.query("select email,password from users1");
        response.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});



app.post("/signin",async(request, response) =>{

    console.log('from login====>>>>', request.body)
    var email = request.body.email;
    var password = request.body.password;
    if(email != '' && password != null) {
        pool.query(`SELECT * FROM users1 where email=$1`, [email], (error, results) => {
            if(error) {
                response.status(500).json({msg: "ERROR", err: error});
            } else {
                if(results.rows.length == 0) {
                    response.status(404).json({ msg: "USER NOT FOUND" });
                } else if(results.rows.length > 1) {
                    response.status(409).json({ msg: "DUPLICATE USERS" });
                } else {
                    bcrypt.compare(password, results.rows[0].password, function(err, res) {
                        if(err) {
                            response.status(500).json({ msg: "ERROR", err: error });
                        } else {
                            if(res == true) {
                                console.log(results.rows[0].email);
                                // var date = Date();
                                var secret_id = results.rows[0].id + results.rows[0].email;
                                response.status(200).json({
                                    msg: "SUCCESS",
                                    access_token: jwt.sign({
                                        _id: results.rows[0].id,
                                    }, secret_key, { expiresIn: 60 * 60 })
                                });
                               
                            } else {
                                response.status(401).json({ msg: "NO MATCH" });
                            }
                        }
                    });
                }
            }
        });
    } else {
        response.status(403).json({ msg: "INVALID CREDENTIALS" })
    }
})

app.listen(5000,()=>{
    console.log("server has started on port 5000");

});