#!/usr/bin/env bash
export PYTHONPATH="$PWD/backend"
set -e


echo "$(date '+%Y-%m-%d %H:%M:%S') - Abrir pgAdmin4 (disabled)"
# "D:\PINTOPC\Program Files\PostgreSQL\pgAdmin 4\runtime\pgAdmin4.exe" &

echo "$(date '+%Y-%m-%d %H:%M:%S') - Arrancando API principal en http://127.0.0.1:8000"
uvicorn spada.app.main:app --reload --port 8000 &

echo "$(date '+%Y-%m-%d %H:%M:%S') - Arrancando download-server en http://127.0.0.1:7000"
uvicorn spada.download_server.download_server:app --reload --port 7000 &

echo "$(date '+%Y-%m-%d %H:%M:%S') - Arrancando frontend Next.js en http://localhost:3000"
pushd frontend/spada
npm run dev & 
popd

wait  # espera a que terminen (Ctrl+C para parar todo)
