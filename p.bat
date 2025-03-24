@echo off
@REM ! p venv, p i package_name, p u package_name, p r
:: Check if the project folder path is provided


@REM ! RUN PYTHON FILE
if exist "%~1.py" (
    python "%~1.py"
    exit /b
)

@REM ! INIT IN MINICOMPUTER
if "%1"=="s" (
    python -m venv venv
    call venv\Scripts\activate
    pip install -r requirements.txt
    exit /b
)


@REM ! VENV
if "%1"=="venv" (
    python -m venv venv
    call venv\Scripts\activate
    exit /b
)

@REM ! PIP REQUIREMENTS
if "%1"=="r" (
    pip install -r requirements.txt
    exit /b
)

@REM ! PIP INSTALL
if "%1"=="i" (
    if "%2"=="" (
        echo Please provide python package name
        exit /b
    )
    pip install %2
    pip freeze > requirements.txt
    exit /b

@REM ! PIP UNINSTALL
) else if "%1"=="u" (
    if "%2"=="" (
        echo Please provide python package name
        exit /b
    )
    pip uninstall %2
    pip freeze > requirements.txt

@REM ! - ELSE
) else (
    echo Please provide command. Either 'i' or 'u'
    exit /b
)
