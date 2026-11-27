@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js was not found. Use the same Node.js installation as Start AIM.cmd.
 pause
 exit /b 1
)
echo Close the black Start AIM launcher window before continuing.
echo This splits your CURRENT HTML. It does not replace it with another version.
echo Your private key, profiles, ROM and Firefox saves are not changed.
node "%~dp0tools\split-casey-assets.mjs" --root "%~dp0."
if errorlevel 1 (
 echo Migration did not complete. Read the message above.
) else (
 echo You can now start Casey's Room with Start AIM.cmd as usual.
)
pause
