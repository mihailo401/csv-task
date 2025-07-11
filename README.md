# Data Quality Gateway

A CSV validation system for German real estate data (Immobilien-Stammdaten) with a React frontend and Flask backend.

## Quick Start

```bash
# Backend
cd backend && pip install -r requirements.txt && python app.py

# Frontend  
cd frontend && npm install && npm start
```

Backend runs on `http://localhost:5000`, frontend on `http://localhost:3000`.

## What It Does

Upload CSV files containing German real estate data and get instant validation feedback. The system checks:

- Required columns (Objekt-ID, Straße, PLZ, Ort)
- Data format (PLZ = 5 digits, Baujahr = 1850-current year)
- Missing values and duplicate IDs

## Sample Data

Use `sample_comprehensive.csv` to test all validation rules.

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Python + Flask
- **Validation**: Pandas for CSV processing 