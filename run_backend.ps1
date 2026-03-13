# 设置 Maven 路径
$MavenHome = "$PSScriptRoot\maven\apache-maven-3.9.9"
$env:Path = "$MavenHome\bin;$env:Path"
$env:MAVEN_HOME = $MavenHome
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"

# 切换到后端目录
Set-Location "$PSScriptRoot\CampusBook\backend"

# 启动 Spring Boot 应用
Write-Host "Starting Spring Boot Backend..."
mvn spring-boot:run
