# CampusBook 校园图书交易平台 📚

一个基于 Spring Boot + Vue 3 构建的校园二手图书交易平台，让闲置图书流动起来，共享知识的力量。

## 项目简介

CampusBook 是一个面向高校学生的二手图书交易平台，提供图书发布、浏览、购买等功能。采用前后端分离架构，后端使用 Spring Boot 提供 RESTful API，前端使用 Vue 3 构建现代化用户界面。

## 功能特性

- 用户管理：注册、登录、个人信息管理
- 图书管理：发布、编辑、删除图书信息
- 图书浏览：搜索、筛选、查看详情
- 订单系统：购买、订单状态管理
- 评论系统：图书评价与评分
- 消息系统：买卖双方沟通

## 技术栈

### 后端
- **框架**: Spring Boot 3.2.3
- **ORM**: MyBatis-Plus 3.5.5
- **数据库**: MySQL 8.0
- **安全**: Spring Security
- **构建工具**: Maven 3.9.9

### 前端
- **框架**: Vue 3.5.30
- **构建工具**: Vite 8.0.0
- **语言**: TypeScript 5.9.3
- **样式**: CSS3

## 项目结构

```
CampusBook/
├── backend/                    # 后端项目
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/campusbook/
│   │   │   │   ├── config/     # 配置类
│   │   │   │   ├── controller/ # 控制器
│   │   │   │   ├── service/    # 服务层
│   │   │   │   ├── mapper/     # 数据访问层
│   │   │   │   └── entity/     # 实体类
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   └── test/
│   └── pom.xml
├── frontend/                   # 前端项目
│   ├── src/
│   │   ├── components/         # 组件
│   │   ├── assets/            # 静态资源
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── database/
    └── schema.sql             # 数据库结构
```

## 快速开始

### 环境要求

- JDK 21+
- Node.js 18+
- MySQL 8.0+
- Maven 3.6+

### 数据库配置

1. 创建数据库：
```sql
CREATE DATABASE campusbook DEFAULT CHARACTER SET utf8mb4;
```

2. 运行初始化脚本：
```bash
mysql -u root -p campusbook < init_database.sql
```

3. 修改后端配置 `CampusBook/backend/src/main/resources/application.yml`：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/campusbook
    username: root
    password: your_password
```

### 启动后端

```bash
cd CampusBook/backend
mvn spring-boot:run
```

后端服务将运行在 http://localhost:8081

### 启动前端

```bash
cd CampusBook/frontend
npm install
npm run dev
```

前端服务将运行在 http://localhost:5173

## API 接口

### 用户接口
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/users | 获取所有用户 |
| GET | /api/users/{id} | 获取指定用户 |
| POST | /api/users | 创建用户 |
| PUT | /api/users/{id} | 更新用户 |
| DELETE | /api/users/{id} | 删除用户 |

### 图书接口
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/books | 获取所有图书 |
| GET | /api/books/{id} | 获取指定图书 |
| POST | /api/books | 发布图书 |
| PUT | /api/books/{id} | 更新图书 |
| DELETE | /api/books/{id} | 删除图书 |

### 订单接口
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/orders | 获取所有订单 |
| GET | /api/orders/{id} | 获取指定订单 |
| POST | /api/orders | 创建订单 |

## 数据库设计

### 用户表
| 字段 | 类型 | 描述 |
|------|------|------|
| id | BIGINT | 主键 |
| username | VARCHAR(50) | 用户名 |
| password_hash | VARCHAR(255) | 密码哈希 |
| student_id | VARCHAR(20) | 学号 |
| credit_score | INT | 信用分 |

### 图书表
| 字段 | 类型 | 描述 |
|------|------|------|
| id | BIGINT | 主键 |
| user_id | BIGINT | 发布者ID |
| title | VARCHAR(200) | 书名 |
| author | VARCHAR(100) | 作者 |
| price | DECIMAL(10,2) | 售价 |
| condition_level | INT | 成色等级 |

## 辅助脚本

| 文件 | 描述 |
|------|------|
| init_database.sql | 数据库初始化脚本 |
| init_db.ps1 | PowerShell 数据库初始化 |
| init_db.bat | 批处理数据库初始化 |
| run_backend.ps1 | 后端启动脚本 |

## 开发说明

- 后端端口：8081
- 前端端口：5173
- 数据库端口：3306
- API 前缀：/api

## 许可证

MIT License

## 作者

CampusBook Team

---

如有问题或建议，欢迎提交 Issue 或 Pull Request。
