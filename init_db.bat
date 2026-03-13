@echo off
chcp 65001 >nul
echo === MySQL 数据库初始化 ===
echo.

set MYSQL_PASSWORD=YourPassword
set MYSQL_USER=root
set DATABASE_NAME=campusbook
set INIT_SCRIPT=f:\trae 作业\lab2\init_database.sql

echo 正在创建数据库...
mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS %DATABASE_NAME% DEFAULT CHARACTER SET utf8mb4;"
if %ERRORLEVEL% EQU 0 (
    echo ✓ 数据库创建成功
) else (
    echo ✗ 数据库创建失败，请检查密码
    goto :end
)

echo.
echo 正在运行初始化脚本...
type "%INIT_SCRIPT%" | mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% %DATABASE_NAME%
if %ERRORLEVEL% EQU 0 (
    echo ✓ 数据库初始化成功
) else (
    echo ✗ 初始化脚本执行失败
    goto :end
)

echo.
echo === 初始化完成 ===
echo.
echo 请按以下步骤更新后端配置：
echo 1. 编辑：f:\trae 作业\lab2\CampusBook\backend\src\main\resources\application.yml
echo 2. 修改 password: password 为 password: %MYSQL_PASSWORD%
echo 3. 重启后端服务：.\run_backend.ps1
echo.

:end
pause
