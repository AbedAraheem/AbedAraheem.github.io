@echo off
:: Re-writing the deployment script to be extremely stable and avoid encoding errors
title 🚀 Deploying to GitHub Pages - Stable Version
color 0E

echo Preparing deployment to: https://github.com/AbedAraheem/AbedAraheem.github.io
echo ========================================================
echo [1/6] Setting Git Identity...
git config --global user.name "AbedAraheem"
git config --global user.email "0595732675geehe@gmail.com"

echo [2/6] Initializing Git...
git init

echo [3/6] Adding files...
git add .

echo [4/6] Saving Version...
git commit -m "Portfolio update - Stable Deployment"

echo [5/6] Connecting to GitHub Repository...
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/AbedAraheem/AbedAraheem.github.io.git

echo [6/6] Uploading to GitHub (Force Push)...
echo NOTE: A login window might appear. Please enter your credentials.
git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo SUCCESS: Your website is live!
    echo URL: https://AbedAraheem.github.io
    echo ========================================================
    start https://AbedAraheem.github.io
) else (
    echo.
    echo ========================================================
    echo ERROR: Deployment failed.
    echo TIP: Make sure you have Git installed and you are logged in.
    echo ========================================================
)

pause
