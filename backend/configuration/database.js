
const pool=require('pg').Pool;
require('dotenv').config();


const p=new pool(
    {
    user: process.env.user_name,
    host: process.env.host,
    database: process.env.db,
    password: process.env.dbpassword,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT
    }

);

console.log( {
    user: process.env.user_name,
    host: process.env.host,
    database: process.env.db,
    password: process.env.dbpassword,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT
    })
 p.connect((err,client,release)=>
{
    if(err)
    {
        return console.error(err);
    }
    else
    {
        console.log("Mubarak h111o db connected");

    }
});

module.exports=p;




