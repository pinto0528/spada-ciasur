#!/usr/bin/env bash
export PYTHONPATH="$PWD/backend"
set -e


echo "2️⃣  Abrir pgAdmin4 (si está en tu PATH)"
# "D:\PINTOPC\Program Files\PostgreSQL\pgAdmin 4\runtime\pgAdmin4.exe" &

echo "3️⃣  Arrancando API principal en http://127.0.0.1:8000"
uvicorn spada.app.main:app --reload --port 8000 &

echo "4️⃣  Arrancando download-server en http://127.0.0.1:7000"
uvicorn spada.download_server.download_server:app --reload --port 7000 &

echo "5️⃣  Arrancando frontend Next.js en http://localhost:6000"
pushd frontend/spada
npm run dev & 
popd

wait  # espera a que terminen (Ctrl+C para parar todo)
