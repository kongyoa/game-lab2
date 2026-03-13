-- 数据库初始化脚本
CREATE DATABASE IF NOT EXISTS campusbook DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE campusbook;

-- 1. 用户表 (Users)
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT AUTO_INCREMENT COMMENT '主键ID',
    `username` VARCHAR(50) NOT NULL COMMENT '用户名',
    `password_hash` VARCHAR(100) NOT NULL COMMENT '加密密码',
    `student_id` VARCHAR(20) NOT NULL COMMENT '学号',
    `school_id` INT COMMENT '学校ID',
    `credit_score` INT DEFAULT 100 COMMENT '信用分',
    `avatar_url` VARCHAR(255) COMMENT '头像URL',
    `status` TINYINT DEFAULT 1 COMMENT '状态 1:正常 0:禁用',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_username` (`username`),
    UNIQUE KEY `uk_student_id` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 2. 图书表 (Books)
CREATE TABLE IF NOT EXISTS `books` (
    `id` BIGINT AUTO_INCREMENT COMMENT '主键ID',
    `user_id` BIGINT NOT NULL COMMENT '发布者ID',
    `isbn` VARCHAR(20) NOT NULL COMMENT 'ISBN',
    `title` VARCHAR(100) NOT NULL COMMENT '书名',
    `author` VARCHAR(100) NOT NULL COMMENT '作者',
    `publisher` VARCHAR(100) COMMENT '出版社',
    `original_price` DECIMAL(10, 2) COMMENT '原价',
    `price` DECIMAL(10, 2) NOT NULL COMMENT '售价',
    `condition_level` TINYINT COMMENT '新旧程度 1-10',
    `location_id` INT COMMENT '校区/宿舍ID',
    `status` TINYINT DEFAULT 1 COMMENT '状态 1:在售 2:已预订 3:已售出 0:下架',
    `images` JSON COMMENT '图片列表JSON',
    `description` TEXT COMMENT '描述',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_isbn` (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='图书表';

-- 3. 订单表 (Orders)
CREATE TABLE IF NOT EXISTS `orders` (
    `id` BIGINT AUTO_INCREMENT COMMENT '主键ID',
    `buyer_id` BIGINT NOT NULL COMMENT '买家ID',
    `seller_id` BIGINT NOT NULL COMMENT '卖家ID',
    `book_id` BIGINT NOT NULL COMMENT '图书ID',
    `amount` DECIMAL(10, 2) NOT NULL COMMENT '交易金额',
    `status` TINYINT DEFAULT 0 COMMENT '状态 0:待支付 1:已支付 2:待发货 3:已发货 4:已完成 5:已取消',
    `payment_method` TINYINT COMMENT '支付方式 1:支付宝 2:微信',
    `trade_type` TINYINT COMMENT '交易方式 1:面交 2:快递',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_buyer_id` (`buyer_id`),
    KEY `idx_seller_id` (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';

-- 4. 消息表 (Messages)
CREATE TABLE IF NOT EXISTS `messages` (
    `id` BIGINT AUTO_INCREMENT COMMENT '主键ID',
    `sender_id` BIGINT NOT NULL COMMENT '发送者ID',
    `receiver_id` BIGINT NOT NULL COMMENT '接收者ID',
    `content` TEXT NOT NULL COMMENT '消息内容',
    `msg_type` TINYINT DEFAULT 1 COMMENT '消息类型 1:文本 2:图片 3:系统',
    `is_read` TINYINT DEFAULT 0 COMMENT '是否已读 0:未读 1:已读',
    `send_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间',
    PRIMARY KEY (`id`),
    KEY `idx_sender_receiver` (`sender_id`, `receiver_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='消息表';

-- 5. 评价表 (Comments)
CREATE TABLE IF NOT EXISTS `comments` (
    `id` BIGINT AUTO_INCREMENT COMMENT '主键ID',
    `order_id` BIGINT NOT NULL COMMENT '关联订单ID',
    `from_user_id` BIGINT NOT NULL COMMENT '评价人ID',
    `to_user_id` BIGINT NOT NULL COMMENT '被评价人ID',
    `rating` TINYINT NOT NULL COMMENT '评分 1-5',
    `content` VARCHAR(500) COMMENT '评价内容',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评价表';
