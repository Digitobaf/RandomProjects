@echo off
setlocal
cd /d "%~dp0aim-local"
if not exist "abby-profile.txt" copy /y "abby-profile.example.txt" "abby-profile.txt" >nul
echo Editing: %CD%\abby-profile.txt
echo Save your notes. They apply to the next new reply automatically.
notepad "abby-profile.txt"
