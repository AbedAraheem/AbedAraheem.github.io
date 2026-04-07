@echo off
chcp 65001 >nul
title 🔄 Update Portfolio Website
color 0E

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║         🔄 تحديث الملف الشخصي على الإنترنت                 ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/3] إضافة التعديلات الجديدة...
git add .
echo.

set /p msg=📝 أدخل وصف التحديث (ثم اضغط Enter): 
if "%msg%"=="" set msg=Update portfolio content

git commit -m "%msg%"
echo.

echo [2/3] رفع التحديثات إلى GitHub...
git push origin main

echo.
if %ERRORLEVEL% EQU 0 (
    color 0A
    echo  ✅ تم التحديث! سيظهر على الإنترنت خلال دقيقة واحدة.
    echo  🌐 https://AbedAraheem.github.io
    start https://AbedAraheem.github.io
) else (
    color 0C
    echo  ❌ حدث خطأ - تأكد من اتصالك بالإنترنت.
)

echo.
pause
