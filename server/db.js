// const Pool=require("pg-pool");
// const pool= new Pool({
//     user: "postgres",
//     password:"nasrin",
//     host:"localhost",
//     port:5432,
//     database:"register"
// });

// module.exports=pool;



const Pool = require ("pg").Pool;

const pool = new Pool({

    user:"postgres",
    password:"nasrin",
    host:"localhost",
    port:5432,
    database:"register"
});

module.exports = pool;