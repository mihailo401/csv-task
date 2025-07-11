# Backend API

Flask API for CSV validation with modular architecture.

## Setup

```bash
pip install -r requirements.txt
python app.py
```

Server starts on `http://localhost:5000`

## API Endpoints

- `GET /api/health` - Server status
- `POST /api/validate-csv` - Upload and validate CSV
- `GET /api/sample-csv` - Download sample file

## Architecture

- `app.py` - Application factory
- `routes.py` - API endpoints
- `services.py` - Business logic
- `validators.py` - CSV validation rules
- `config.py` - Configuration management

## Environment Variables

- `FLASK_RUN_HOST` - Server host (default: 127.0.0.1)
- `FLASK_RUN_PORT` - Server port (default: 5000)
