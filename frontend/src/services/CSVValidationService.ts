import { ValidationResult } from '../types/validation';

class CSVValidationService {
  private static API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;

  static async validateFile(file: File): Promise<ValidationResult> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.API_BASE_URL}/validate-csv`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'An error occurred during validation');
    }

    return result;
  }

  static async downloadSampleCSV(): Promise<void> {
    const response = await fetch(`${this.API_BASE_URL}/sample-csv`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

export default CSVValidationService; 