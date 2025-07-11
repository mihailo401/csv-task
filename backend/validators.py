import pandas as pd
import re
from datetime import datetime
from typing import List, Dict, Any

class CSVValidator:
    REQUIRED_COLUMNS = ['Objekt-ID', 'Straße', 'PLZ', 'Ort']
    
    @staticmethod
    def allowed_file(filename: str) -> bool:
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'csv'}
    
    @staticmethod
    def validate_csv_data(df: pd.DataFrame) -> List[Dict[str, Any]]:
        errors = []
        
        missing_columns = [col for col in CSVValidator.REQUIRED_COLUMNS if col not in df.columns]
        if missing_columns:
            errors.append({
                'row': 0,
                'column': 'header',
                'error': f'Missing required columns: {", ".join(missing_columns)}'
            })
            return errors
        
        objekt_ids = []
        
        for index, row in df.iterrows():
            row_num = index + 1
            
            for col in CSVValidator.REQUIRED_COLUMNS:
                if pd.isna(row[col]) or str(row[col]).strip() == '':
                    errors.append({
                        'row': row_num,
                        'column': col,
                        'error': f'Missing required value for {col}'
                    })
            
            if not pd.isna(row['PLZ']) and str(row['PLZ']).strip() != '':
                plz_str = str(row['PLZ']).strip()
                if not re.match(r'^\d{5}$', plz_str):
                    errors.append({
                        'row': row_num,
                        'column': 'PLZ',
                        'error': f'PLZ must be exactly 5 digits, got: {plz_str}'
                    })
            
            if 'Baujahr' in df.columns and not pd.isna(row['Baujahr']) and str(row['Baujahr']).strip() != '':
                try:
                    baujahr = int(row['Baujahr'])
                    current_year = datetime.now().year
                    if baujahr < 1850 or baujahr > current_year:
                        errors.append({
                            'row': row_num,
                            'column': 'Baujahr',
                            'error': f'Baujahr must be between 1850 and {current_year}, got: {baujahr}'
                        })
                except (ValueError, TypeError):
                    errors.append({
                        'row': row_num,
                        'column': 'Baujahr',
                        'error': f'Baujahr must be a valid 4-digit number, got: {row["Baujahr"]}'
                    })
            
            if not pd.isna(row['Objekt-ID']) and str(row['Objekt-ID']).strip() != '':
                objekt_ids.append(str(row['Objekt-ID']).strip())
        
        if len(objekt_ids) != len(set(objekt_ids)):
            seen = set()
            duplicates = set()
            for obj_id in objekt_ids:
                if obj_id in seen:
                    duplicates.add(obj_id)
                seen.add(obj_id)
            
            for index, row in df.iterrows():
                row_num = index + 1
                obj_id = str(row['Objekt-ID']).strip()
                if obj_id in duplicates:
                    errors.append({
                        'row': row_num,
                        'column': 'Objekt-ID',
                        'error': f'Duplicate Objekt-ID found: {obj_id}'
                    })
        
        return errors 