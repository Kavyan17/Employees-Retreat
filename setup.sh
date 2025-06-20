#!/bin/bash

echo "🔧 Setting up backend virtual environment..."
cd backend

# Create venv only if it doesn't exist
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

source venv/bin/activate

echo "📦 Installing backend dependencies..."
pip install -r requirements.txt

echo "🧹 Resetting database..."
python3 reset_db.py

cd ..

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

cd ..

echo "✅ Setup complete!"
echo "👉 To start the app:"
echo "1. Start Flask: cd backend && source venv/bin/activate && flask run"
echo "2. Start React: cd frontend && npm start"
