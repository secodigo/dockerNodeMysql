const express = require('express');
const app = express();
const port = 5000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql');

const sqlInsert = `INSERT INTO people(name) values('rodrigo')`

const sqlSelectPeoples = `Select * from people;`
const connection = mysql.createConnection(config);

function createDatabase() {
    var sql = "CREATE DATABASE IF NOT EXISTS nodedb;";
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log("DATABASE CREATED");
    });
}

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    createDatabase();
    createTablePeople();
  });

app.get('/', async (req, res) => {
    await connection.query(sqlInsert);
    
    await connection.query(sqlSelectPeoples, async function (err, rows, fields) {
        if (err) throw err;
        let values = "";
        rows.forEach( (row) => {
            values += '<div>' + (`${row.id} - ${row.name}`) + '</div>';
        });
        res.send('<h1>Full Cycle Rocks!</h1>'+ values)
    });
})

app.listen(port, () => {
    console.log('rodando na porta' + port)
})


function createTablePeople() {
    var sql = "CREATE TABLE if not exists people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log("Table created");
    });
}

