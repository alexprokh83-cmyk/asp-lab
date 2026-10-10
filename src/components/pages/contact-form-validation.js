const NAME_PATTERN = /^[A-Za-zА-Яа-яІіЇїЄєҐґЁё'’ -]{2,100}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARACTERS = /^[0-9+() -]*$/;

export function validateContactValue(field, value) {
  if (field === 'name') return NAME_PATTERN.test(value);
  if (field === 'email') return value.length <= 254 && EMAIL_PATTERN.test(value);
  if (field === 'phone') {
    if (!value) return true;
    if (!PHONE_CHARACTERS.test(value)) return false;
    return /^\d{7,20}$/.test(value.replace(/[+() -]/g, ''));
  }
  if (field === 'message') return value.length >= 10 && value.length <= 2000;
  return false;
}

export function normalizeContactPayload(source) {
  const payload = {
    name: String(source?.name ?? '').trim(),
    email: String(source?.email ?? '').trim(),
    phone: String(source?.phone ?? '').trim(),
    message: String(source?.message ?? '').trim(),
  };
  const errors = Object.fromEntries(
    Object.entries(payload).filter(([field, value]) => !validateContactValue(field, value)).map(([field]) => [field, true]),
  );
  return { payload, errors, valid: Object.keys(errors).length === 0 };
}
