# MySQL Database Initialization Script
param([string]$Password = "123147843399")

$mysqlUser = "root"
$databaseName = "campusbook"
$initScript = "f:\trae作业\lab2\init_database.sql"

Write-Host "=== MySQL Database Initialization ===" -ForegroundColor Cyan

# Test connection
Write-Host "Testing MySQL connection..." -ForegroundColor Yellow
$result = mysql -u $mysqlUser "-p$Password" -e "SELECT 1;" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Connection failed. Please check password." -ForegroundColor Red
    Write-Host $result
    exit 1
}

Write-Host "Connection successful." -ForegroundColor Green

# Create database
Write-Host "Creating database..." -ForegroundColor Yellow
mysql -u $mysqlUser "-p$Password" -e "CREATE DATABASE IF NOT EXISTS $databaseName DEFAULT CHARACTER SET utf8mb4;" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Database creation failed." -ForegroundColor Red
    exit 1
}

Write-Host "Database created successfully." -ForegroundColor Green

# Run initialization script
Write-Host "Initializing tables..." -ForegroundColor Yellow
Get-Content $initScript | mysql -u $mysqlUser "-p$Password" $databaseName 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Initialization failed." -ForegroundColor Red
    exit 1
}

Write-Host "Initialization successful." -ForegroundColor Green

# Verify
Write-Host "Verifying database..." -ForegroundColor Yellow
mysql -u $mysqlUser "-p$Password" -e "USE $databaseName; SHOW TABLES;" 2>&1

Write-Host "`n=== Initialization Complete ===" -ForegroundColor Green
Write-Host "Please update application.yml password to: $Password" -ForegroundColor Yellow
