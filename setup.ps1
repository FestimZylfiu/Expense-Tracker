# Quick Setup Script for Expense Tracker

Write-Host "🚀 Setting up Expense Tracker..." -ForegroundColor Cyan

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env created! Please edit it with your MongoDB URI and Session Secret" -ForegroundColor Green
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Install backend dependencies
Write-Host "`n📦 Installing backend dependencies..." -ForegroundColor Cyan
npm install

# Install frontend dependencies
Write-Host "`n📦 Installing frontend dependencies..." -ForegroundColor Cyan
cd frontend
npm install

# Check if frontend .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  Creating frontend .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Frontend .env created!" -ForegroundColor Green
} else {
    Write-Host "✅ Frontend .env file already exists" -ForegroundColor Green
}

cd ..

Write-Host "`n✨ Setup complete!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Make sure MongoDB is running"
Write-Host "2. Edit .env file with your configuration"
Write-Host "3. Run 'npm run dev' in the root directory to start the backend"
Write-Host "4. Run 'npm run dev' in the frontend directory to start the frontend"
Write-Host "`n🌐 Backend will run on: http://localhost:4000"
Write-Host "🌐 Frontend will run on: http://localhost:3000"
