#!/bin/bash

echo "🚀 Starting project setup..."

### --- System Prerequisites Check ---
echo "🔍 Checking system requirements..."

# Check Python 3
if ! command -v python3 &> /dev/null
then
    echo "❌ Python3 is not installed. Please install it from https://www.python.org/downloads/"
    exit 1
fi

# Check pip
if ! command -v pip3 &> /dev/null
then
    echo "❌ pip3 is not installed. Please install it using 'python3 -m ensurepip'"
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install it (comes with Node.js)."
    exit 1
fi

echo "✅ All system requirements satisfied."


### --- Backend Setup ---
echo "📁 Setting up backend..."
cd backend || { echo "❌ Cannot find backend directory"; exit 1; }

# Create virtual environment if not present
if [ ! -d "venv" ]; then
  echo "🐍 Creating virtual environment..."
  python3 -m venv venv
fi

echo "📦 Activating virtual environment and installing backend dependencies..."
source venv/bin/activate
pip3 install -r requirements.txt

echo "🧹 Resetting database..."
python3 reset_db.py

deactivate
cd ..

### --- Frontend Setup ---
echo "📁 Setting up frontend..."
cd frontend || { echo "❌ Cannot find frontend directory"; exit 1; }

echo "📦 Installing frontend dependencies..."
npm install

cd ..

### ✅ Done!
echo ""
echo "🎉 Setup complete!"
echo "👉 Next steps:"
echo "1️⃣ Start Flask backend:"
echo "   cd backend && source venv/bin/activate && flask run"
echo ""
echo "2️⃣ Start React frontend:"
echo "   cd frontend && npm start"
echo ""
echo "Happy Coding 💻✨"
