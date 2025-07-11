import pandas as pd
from typing import Dict, Any, Tuple

try:
    from .validators import CSVValidator
except ImportError:
    from validators import CSVValidator

class CSVService:
    @staticmethod
    def process_csv_file(file) -> Tuple[bool, Dict[str, Any], int]:
        if 'file' not in file:
            return False, {'error': 'No file uploaded'}, 400
        
        uploaded_file = file['file']
        
        if uploaded_file.filename == '':
            return False, {'error': 'No file selected'}, 400
        
        if not CSVValidator.allowed_file(uploaded_file.filename):
            return False, {'error': 'Only CSV files are allowed'}, 400
        
        encodings_to_try = ['utf-8', 'utf-8-sig', 'latin-1', 'cp1252', 'iso-8859-1']
        df = None
        
        for encoding in encodings_to_try:
            try:
                uploaded_file.seek(0)
                df = pd.read_csv(uploaded_file, encoding=encoding)
                break
            except UnicodeDecodeError:
                continue
            except Exception as e:
                continue
        
        if df is None:
            return False, {'error': 'Unable to read CSV file. Please check the file encoding.'}, 400
        
        errors = CSVValidator.validate_csv_data(df)
        
        response = {
            'success': True,
            'total_rows': len(df),
            'total_errors': len(errors),
            'errors': errors,
            'columns_found': list(df.columns)
        }
        
        if len(errors) == 0:
            response['message'] = 'CSV validation passed successfully!'
        else:
            response['message'] = f'Found {len(errors)} validation error(s)'
        
        return True, response, 200 