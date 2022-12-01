import mysql from "mysql2"; 

//create db connection 
const db=mysql.createConnection({
        host:"localhost", 
        user:"root", 
        password:"", 
        database:"emt_database" 
    });

export default db; 
