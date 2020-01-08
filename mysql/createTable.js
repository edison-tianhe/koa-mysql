const mysqlCreateTable = [
  ` create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    sex INT(1) DEFAULT 1,
    phone CHAR(11) NOT NULL,
    \`createtime\` datetime DEFAULT CURRENT_TIMESTAMP,
    \`updatetime\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY ( id )
  );`,
  ` create table if not exists articles(
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`userId\` INT NOT NULL,
    \`title\` VARCHAR(255) DEFAULT NULL,
    \`content\` longtext DEFAULT NULL,
    \`category\` VARCHAR(255) DEFAULT NULL,
    \`stick\` TINYINT(1) DEFAULT false,
    \`status\` TINYINT(1) DEFAULT true,
    \`createtime\` datetime DEFAULT CURRENT_TIMESTAMP,
    \`updatetime\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY ( id )
  )character set utf8;`,
]

module.exports = mysqlCreateTable