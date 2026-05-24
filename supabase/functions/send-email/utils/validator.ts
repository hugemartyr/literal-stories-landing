interface ValidationInput {
  email: string;
  name: string;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateEmailInput(input: ValidationInput): ValidationResult {
  const errors: string[] = [];

  if (!input.email || typeof input.email !== 'string') {
    errors.push('email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      errors.push('invalid email format');
    }
  }

  if (!input.name || typeof input.name !== 'string' || input.name.trim().length === 0) {
    errors.push('name is required for personalization');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
