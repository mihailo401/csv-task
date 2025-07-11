# CSV Task - Simple Makefile

.PHONY: help backend-dev backend-install backend-docker frontend-dev frontend-build frontend-install clean

help:
	@echo "Available commands:"
	@echo "  backend-install  - Install Python dependencies"
	@echo "  backend-dev      - Start Flask development server"
	@echo "  backend-docker   - Build and run backend Docker container"
	@echo "  frontend-install - Install Node.js dependencies"
	@echo "  frontend-dev     - Start React development server"
	@echo "  frontend-build   - Build React app for production"
	@echo "  clean           - Clean up generated files"

backend-install:
	cd backend && pip install -r requirements.txt

backend-dev:
	cd backend && python app.py

backend-docker:
	docker build -t csv-backend ./backend
	docker run -p 5000:5000 csv-backend

frontend-install:
	cd frontend && npm install

frontend-dev:
	cd frontend && npm start

frontend-build:
	cd frontend && npm run build

clean:
	rm -rf frontend/build
	rm -rf backend/__pycache__
	rm -rf backend/uploads/*
