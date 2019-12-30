const mysqlCreateTable = [
  ` create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    sex INT(1) DEFAULT 1,
    phone CHAR(11) NOT NULL,
    PRIMARY KEY ( id )
  );`
]

module.exports = mysqlCreateTable