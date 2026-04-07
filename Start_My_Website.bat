@echo off
chcp 65001 >nul
title 🚀 AbdulRaheem Portfolio Server
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════╗
echo  ║         🚀 AbdulRaheem - Portfolio Server            ║
echo  ╠══════════════════════════════════════════════════════╣
echo  ║  جاري تشغيل خادم الملف الشخصي المحلي...             ║
echo  ║  🌐  http://localhost:3000                           ║
echo  ╚══════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [خطأ] Node.js غير مثبت. جاري المحاولة بـ Python...
    python -m http.server 3000
    goto :end
)

node server.js

:end
echo.
pause
