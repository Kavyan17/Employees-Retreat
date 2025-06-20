#!/bin/bash

echo "🚀 Starting project setup..."

### Lock to script's root directory
cd "$(dirname "$0")" || exit 1

### --- System Prerequisites Check ---
echo "🔍 Checking system requirements..."

check_cmd() {
  if ! command -v $1 &> /dev/null; then
    echo "❌ $1 is not installed. Please install it and rerun the script."
    exit 1
  fi
}

check_cmd python3
check_cmd pip3
check_cmd node
check_cmd npm

echo "✅ All system requirements satisfied."


### --- Backend Setup ---
echo "📁 Setting up backend..."
cd backend || { echo "❌ Cannot find backend directory"; exit 1; }

if [ ! -d "venv" ]; then
  echo "🐍 Creating virtual environment..."
  python3 -m venv venv
fi

echo "📦 Activating virtual environment and installing backend dependencies..."
source venv/bin/activate
pip3 install -r requirements.txt

echo "🧹 Resetting database..."
python3 -m app.reset_db || { echo "❌ Failed to run reset_db.py"; deactivate; exit 1; }

# Start Flask backend in background
echo "🚀 Starting Flask backend..."
export FLASK_APP=app
export FLASK_ENV=development
flask run &

BACKEND_PID=$!

deactivate
cd ..


### --- Frontend Setup ---
echo "📁 Setting up frontend..."
cd frontend || { echo "❌ Cannot find frontend directory"; kill $BACKEND_PID; exit 1; }

echo "📦 Installing frontend dependencies..."
npm install || { echo "❌ npm install failed"; kill $BACKEND_PID; exit 1; }

echo "🚀 Starting React frontend..."
npm run dev &

FRONTEND_PID=$!

cd ..

echo ""
echo "🎉 Full Setup Complete!"
echo "🟢 Flask backend running (PID: $BACKEND_PID)"
echo "🟢 React frontend running (PID: $FRONTEND_PID)_
