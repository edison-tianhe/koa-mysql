const mysqlCreateTable = [
  // * 创建用户表
  ` create table if not exists users(
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`username\` VARCHAR(100) NOT NULL UNIQUE COMMENT '用户名',
    \`password\` VARCHAR(100) NOT NULL COMMENT '密码',
    \`email\` VARCHAR(100) NOT NULL COMMENT '电子邮箱',
    \`avator\` VARCHAR(100) NOT NULL COMMENT '用户头像',
    \`sex\` INT(1) DEFAULT 1 COMMENT '性别',
    \`phone\` CHAR(11) NOT NULL COMMENT '手机号',
    \`createtime\` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    \`updatetime\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY ( id )
  );`,
  // * 创建文章表
  ` create table if not exists articles(
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`userId\` INT NOT NULL COMMENT '用户ID',
    \`title\` VARCHAR(255) DEFAULT NULL COMMENT '文章标题',
    \`intro\` VARCHAR(255) DEFAULT '作者有点小偷懒~,该文章么得相关简介~' COMMENT '文章简介',
    \`content\` longtext DEFAULT NULL COMMENT '文章内容(MarkDown)',
    \`contentHTML\` longtext DEFAULT NULL COMMENT '文章内容(HTML)',
    \`category\` INT DEFAULT NULL COMMENT '文章分类',
    \`stick\` TINYINT(1) DEFAULT false COMMENT '是否置顶(1置顶/0普通)',
    \`status\` TINYINT(1) DEFAULT true COMMENT '是否上线(1上线/0下线)',
    \`preview\` INT DEFAULT 0 COMMENT '预览数量',
    \`comment\` INT DEFAULT 0 COMMENT '评论数量',
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
  // * 创建文章评论表
  ` create table if not exists articleComment(
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`articleId\` INT NOT NULL COMMENT '文章ID',
    \`name\` VARCHAR(255) DEFAULT NULL COMMENT '昵称',
    \`email\` VARCHAR(255) NOT NULL COMMENT '电子邮箱',
    \`blog\` VARCHAR(255) NOT NULL COMMENT '博客',
    \`comment\` longtext DEFAULT NULL COMMENT '文章评论内容',
    \`replyList\` longtext DEFAULT NULL COMMENT '回复列表',
    \`privacy\` TINYINT(1) DEFAULT false COMMENT '是否私密(1私密/0正常)',
    \`createtime\` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    \`updatetime\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY ( id )
  )character set utf8;`,
]

module.exports = mysqlCreateTable