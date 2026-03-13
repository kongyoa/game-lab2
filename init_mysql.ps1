# MySQL 数据库初始化脚本
Write-Host "=== MySQL 数据库初始化 ===" -ForegroundColor Green

# MySQL 配置
$mysqlUser = "root"
$databaseName = "campusbook"
$initScript = "f:\trae 作业\lab2\init_database.sql"

# 尝试不同的密码组合
$passwords = @("", "root", "password", "123456")
$success = $false

foreach ($pwd in $passwords) {
    Write-Host "`n尝试密码：'$pwd'" -ForegroundColor Yellow
    
    $pwdParam = if ($pwd) { "-p$pwd" } else { "" }
    
    # 测试连接
    $result = & mysql -u $mysqlUser $pwdParam -e "SHOW DATABASES;" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ 密码正确！" -ForegroundColor Green
        Write-Host "当前数据库列表:"
        Write-Host $result
        
        # 检查是否已有 campusbook 数据库
        if ($result -like "*$databaseName*") {
            Write-Host "`n✓ 数据库 '$databaseName' 已存在" -ForegroundColor Green
        } else {
            Write-Host "`n正在创建数据库 '$databaseName'..." -ForegroundColor Yellow
            & mysql -u $mysqlUser $pwdParam -e "CREATE DATABASE IF NOT EXISTS $databaseName DEFAULT CHARACTER SET utf8mb4;"
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ 数据库创建成功！" -ForegroundColor Green
            }
        }
        
        # 运行初始化脚本
        Write-Host "`n正在运行初始化脚本..." -ForegroundColor Yellow
        Get-Content $initScript | & mysql -u $mysqlUser $pwdParam $databaseName
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ 数据库初始化成功！" -ForegroundColor Green
        } else {
            Write-Host "⚠ 初始化脚本执行失败，但数据库已创建" -ForegroundColor Yellow
        }
        
        # 更新后端配置
        Write-Host "`n更新后端配置文件..." -ForegroundColor Yellow
        $configPath = "f:\trae 作业\lab2\CampusBook\backend\src\main\resources\application.yml"
        if (Test-Path $configPath) {
            $content = Get-Content $configPath -Raw
            $content = $content -replace 'password: password', "password: $pwd"
            $content | Set-Content $configPath -NoNewline
            Write-Host "✓ 配置文件已更新 (密码设置为：'$pwd')" -ForegroundColor Green
        }
        
        $success = $true
        break
    }
}

if (-not $success) {
    Write-Host "`n❌ 无法连接 MySQL，请检查:" -ForegroundColor Red
    Write-Host "1. MySQL 服务是否运行" -ForegroundColor Yellow
    Write-Host "2. root 用户密码是否正确" -ForegroundColor Yellow
    Write-Host "3. 手动执行：mysql -u root -p" -ForegroundColor Yellow
}

Write-Host "`n=== 初始化完成 ===" -ForegroundColor Green
