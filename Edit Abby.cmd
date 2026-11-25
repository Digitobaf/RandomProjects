@echo off
setlocal
cd /d "%~dp0aim-local"
if not exist "abby-profile.txt" copy /y "abby-profile.example.txt" "abby-profile.txt" >nul
notepad "abby-profile.txt"
