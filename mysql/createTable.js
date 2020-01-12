const mysqlCreateTable = [
  // * 创建用户表
  ` create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    email VARCHAR(100) NOT NULL COMMENT '电子邮箱',
    avator VARCHAR(100) NOT NULL COMMENT '用户头像',
    sex INT(1) DEFAULT 1 COMMENT '性别',
    phone CHAR(11) NOT NULL COMMENT '手机号',
    \`createtime\` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    \`updatetime\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY ( id )
  );`,
  // * 创建文章表
  ` create table if not exists articles(
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`userId\` INT NOT NULL COMMENT '用户ID',
    \`title\` VARCHAR(255) DEFAULT NULL COMMENT '文章标题',
    \`content\` longtext DEFAULT NULL COMMENT '文章内容',
    \`category\` INT DEFAULT NULL COMMENT '文章分类',
    \`stick\` TINYINT(1) DEFAULT false COMMENT '是否置顶(1置顶/0普通)',
    \`status\` TINYINT(1) DEFAULT true COMMENT '是否上线(1上线/0下线)',
    \`createtime\` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    \`updatetime\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY ( id )
  )character set utf8;`,
  // * 创建分类表
  ` create table if not exists categorys(
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`label\` VARCHAR(255) NOT NULL COMMENT '分类名称',
    \`status\` TINYINT(1) DEFAULT true COMMENT '是否上线(1上线/0下线)',
    \`createtime\` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    \`updatetime\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY ( id )
  )character set utf8;`,
]

module.exports = mysqlCreateTable