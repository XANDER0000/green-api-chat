export function normalizePhone(input: string): string {
  let digits = input.replace(/\D/g, '')

  if (!digits) return ''

  if (digits.length === 11 && digits.startsWith('8')) {
    digits = '7' + digits.slice(1)
  }

  if (digits.length === 10) {
    digits = '7' + digits
  }

  return `${digits}@c.us`
}

export function isValidPhone(input: string): boolean {
  const digits = input.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}