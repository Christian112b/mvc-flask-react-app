/**
 * Input validation and sanitization utilities
 * Note: Supabase uses parameterized queries, so SQL injection is handled at the DB level.
 * These functions provide additional validation and XSS protection for user input.
 */

// Maximum lengths for task fields
export const MAX_TASK_NAME_LENGTH = 255
export const MAX_TASK_DESCRIPTION_LENGTH = 1000

/**
 * Validates and sanitizes task name input
 * @param name - The raw input name
 * @returns Object with sanitized value and error message if invalid
 */
export function validateTaskName(name: string): { value: string; error?: string } {
  if (!name || !name.trim()) {
    return { value: '', error: 'El nombre de la tarea es requerido' }
  }
  
  const trimmed = name.trim()
  
  if (trimmed.length > MAX_TASK_NAME_LENGTH) {
    return { 
      value: trimmed.slice(0, MAX_TASK_NAME_LENGTH), 
      error: `El nombre no puede exceder ${MAX_TASK_NAME_LENGTH} caracteres` 
    }
  }
  
  return { value: trimmed }
}

/**
 * Validates and sanitizes task description input
 * @param description - The raw input description
 * @returns Object with sanitized value and error message if invalid
 */
export function validateTaskDescription(description: string): { value: string; error?: string } {
  if (!description) {
    return { value: '' }
  }
  
  const trimmed = description.trim()
  
  if (trimmed.length > MAX_TASK_DESCRIPTION_LENGTH) {
    return { 
      value: trimmed.slice(0, MAX_TASK_DESCRIPTION_LENGTH), 
      error: `La descripción no puede exceder ${MAX_TASK_DESCRIPTION_LENGTH} caracteres` 
    }
  }
  
  return { value: trimmed }
}

/**
 * Sanitizes input to prevent XSS attacks
 * Removes or escapes potentially dangerous HTML/script content
 * @param input - The raw input string
 * @returns Sanitized string safe for display/storage
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  
  return input
    // Replace script tags (case insensitive)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Replace on* event handlers (onclick, onerror, etc.)
    .replace(/\bon\w+\s*=/gi, '')
    // Replace javascript: URLs
    .replace(/javascript:/gi, '')
    // Replace data: URLs (potential data exfiltration)
    .replace(/data:/gi, '')
    // Basic HTML entity encoding for display safety
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;')
}

/**
 * Combined validation for task input
 * @param name - Task name
 * @param description - Task description (optional)
 * @returns Object with sanitized values and any validation errors
 */
export function validateTaskInput(
  name: string, 
  description?: string
): { 
  valid: boolean; 
  name: string; 
  description?: string; 
  nameError?: string; 
  descriptionError?: string 
} {
  const nameResult = validateTaskName(name)
  const descResult = validateTaskDescription(description || '')
  
  return {
    valid: !nameResult.error && !descResult.error,
    name: nameResult.value,
    description: descResult.value || undefined,
    nameError: nameResult.error,
    descriptionError: descResult.error
  }
}
