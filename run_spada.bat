@echo off
setlocal enabledelayedexpansion

REM === Configuración ===
set PORT_FILE=ports.txt
set LOG_FILE=log_spada.txt
set BASH_SCRIPT=D:\PINTOPC\Program Files\Git\git-bash.exe
set SH_SCRIPT=/d/PINTOPC/Codigo/SPADA/spada-ciasur/start_spada.sh

REM === Timestamp inicial ===
for /f %%i in ('powershell -command "Get-Date -Format yyyy-MM-dd_HH:mm:ss"') do set timestamp=%%i
echo [%timestamp%] ===== INICIANDO SPADA ===== >> %LOG_FILE%

REM === Verificar archivo de puertos ===
if not exist %PORT_FILE% (
    echo [%timestamp%] ERROR: No se encontró el archivo %PORT_FILE% >> %LOG_FILE%
    exit /b
)

echo [%timestamp%] Puertos leídos de %PORT_FILE%: >> %LOG_FILE%

for /f %%P in (%PORT_FILE%) do (
    echo   - Puerto: %%P >> %LOG_FILE%
    for /f "tokens=5" %%T in ('netstat -aon ^| findstr :%%P') do (
        echo [%timestamp%] Liberando puerto %%P (PID: %%T) >> %LOG_FILE%
        taskkill /PID %%T /F >nul 2>&1
    )
)

REM === Ejecutar Bash y redirigir todo al log ===
echo [%timestamp%] Ejecutando bash con: %SH_SCRIPT% >> %LOG_FILE%

REM === Ejecutar el script bash y esperar a que termine ===
"%BASH_SCRIPT%" -c "sh %SH_SCRIPT% | while read line; do echo [$(date '+%%Y-%%m-%%d %%H:%%M:%%S')] - $line; done | tee -a %LOG_FILE%; wait"


REM === Timestamp final ===
for /f %%i in ('powershell -command "Get-Date -Format yyyy-MM-dd_HH:mm:ss"') do set endtime=%%i
echo [%endtime%] ===== SPADA FINALIZADO ===== >> %LOG_FILE%
