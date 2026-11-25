@echo off
setlocal
cd /d "%~dp0aim-local"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js LTS from https://nodejs.org/ and try again.
  pause
  exit /b 1
)
node -e "process.exit(Number(process.versions.node.split('.')[0]) >= 22 ? 0 : 1)"
if errorlevel 1 (
  echo Please install the current Node.js LTS version from https://nodejs.org/.
  pause
  exit /b 1
)
if not exist "node_modules\@google\genai\package.json" (
  echo Installing Google's Gemini connection. This is only needed the first time.
  call npm ci --omit=dev --no-audit --no-fund
  if errorlevel 1 (
    echo Installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)
node launch.mjs
if errorlevel 1 pause
