from flask import Blueprint, request, jsonify, send_from_directory
import os

try:
    from .services import CSVService
except ImportError:
    from services import CSVService

api = Blueprint('api', __name__)

@api.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'CSV Validation API is running'})

@api.route('/validate-csv', methods=['POST'])
def validate_csv():
    try:
        _, response, status_code = CSVService.process_csv_file(request.files)
        return jsonify(response), status_code
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        }), 500

@api.route('/sample-csv', methods=['GET'])
def get_sample_csv():
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return send_from_directory(parent_dir, 'sample.csv', as_attachment=True) 