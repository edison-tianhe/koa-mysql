const mysqlCreateTable = [
  ` create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id )
  );`
]

module.exports = mysqlCreateTable