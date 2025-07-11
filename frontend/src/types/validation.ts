export interface ValidationError {
  row: number;
  column: string;
  error: string;
}

export interface ValidationResult {
  success: boolean;
  total_rows: number;
  total_errors: number;
  errors: ValidationError[];
  columns_found: string[];
  message: string;
} 