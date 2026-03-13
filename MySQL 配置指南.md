# MySQL 数据库配置指南

## ✅ MySQL 服务状态
- **服务名称**: MySQL80
- **运行状态**: 已启动
- **启动类型**: 自动

## 🔧 配置步骤

### 1. 获取 MySQL root 密码

如果您不知道 MySQL root 密码，有以下几种方法：

#### 方法 1: 使用初始密码文件
MySQL 8.0 初次安装时会生成临时密码：
```powershell
# 查找临时密码
Get-Content "C:\ProgramData\MySQL\MySQL Server 8.0\Data\*.err" | Select-String "temporary password"
```

#### 方法 2: 重置 root 密码
1. 停止 MySQL 服务：
   ```powershell
   net stop MySQL80
   ```

2. 以安全模式启动（跳过授权表）：
   ```powershell
   mysqld --defaults-file="C:\ProgramData\MySQL\MySQL Server 8.0\my.ini" --skip-grant-tables --shared-memory
   ```

3. 新开一个终端，重置密码：
   ```sql
   mysql -u root
   USE mysql;
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'YourNewPassword';
   FLUSH PRIVILEGES;
   EXIT;
   ```

4. 重启 MySQL 服务：
   ```powershell
   net start MySQL80
   ```

### 2. 创建数据库

登录 MySQL 后执行：
```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS campusbook 
DEFAULT CHARACTER SET utf8mb4 
DEFAULT COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE campusbook;
```

### 3. 运行初始化脚本

```powershell
# 方法 1: 使用命令行
mysql -u root -p campusbook < "f:\trae 作业\lab2\init_database.sql"

# 方法 2: MySQL 客户端内执行
mysql -u root -p
USE campusbook;
SOURCE f:\trae 作业\lab2\init_database.sql;
```

### 4. 更新后端配置

编辑 `CampusBook\backend\src\main\resources\application.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/campusbook
    username: root
    password: YourPassword  # 改为你的实际密码
```

## 📝 快速配置脚本

创建并运行以下 PowerShell 脚本（需要手动设置密码）：

```powershell
# 设置你的 MySQL 密码
$mysqlPassword = "YourPassword"

# 创建数据库
mysql -u root -p$mysqlPassword -e "CREATE DATABASE IF NOT EXISTS campusbook DEFAULT CHARACTER SET utf8mb4;"

# 运行初始化脚本
mysql -u root -p$mysqlPassword campusbook < "f:\trae 作业\lab2\init_database.sql"

Write-Host "数据库初始化完成！" -ForegroundColor Green
```

## 🔍 验证连接

```powershell
# 测试数据库连接
mysql -u root -pYourPassword -e "SHOW DATABASES;"

# 验证表已创建
mysql -u root -pYourPassword campusbook -e "SHOW TABLES;"
```

## 📊 初始化后的数据库结构

执行初始化脚本后，将创建以下表：
- `users` - 用户表
- `books` - 图书表
- `orders` - 订单表
- `comments` - 评论表
- `messages` - 消息表

并插入测试数据：
- 测试用户：testuser
- 测试图书：Java 编程思想

## ⚠️ 常见问题

### Q: 找不到 mysql 命令
**A**: 将 MySQL 添加到 PATH：
```powershell
$env:Path += ";C:\Program Files\MySQL\MySQL Server 8.0\bin"
```

### Q: 服务无法启动
**A**: 检查事件查看器或 MySQL 错误日志：
```powershell
Get-Content "C:\ProgramData\MySQL\MySQL Server 8.0\Data\*.err" -Tail 50
```

### Q: 中文乱码
**A**: 确保使用 utf8mb4 字符集，已在初始化脚本中配置。

---

**创建时间**: 2026-03-13
**MySQL 版本**: 8.0
