/**
 * Authentication validation utilities
 * Feature 1.4: Basic Authentication
 */

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  // For testing, we'll use simple validation
  // In production, you might want stronger requirements
  return password.length >= 6
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0
}

export function validatePhone(phone: string): boolean {
  // Simple phone validation for Brazilian format
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/
  return phoneRegex.test(phone)
}

export function validateTelegramUsername(username: string): boolean {
  // Telegram username validation (alphanumeric + underscore, 5-32 chars)
  const telegramRegex = /^[a-zA-Z0-9_]{5,32}$/
  return telegramRegex.test(username)
}