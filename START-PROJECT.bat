@echo off
start "ProjectFlow Backend" cmd /k "cd /d %~dp0backend && npm install && npm run dev"
start "ProjectFlow Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"
echo ProjectFlow is starting...
pause
