@echo off
setlocal
cd /d "%~dp0aim-local"
if not exist "mercer-profile.txt" copy /y "mercer-profile.example.txt" "mercer-profile.txt" >nul
notepad "mercer-profile.txt"
