import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeContactPayload, validateContactValue } from '../src/components/pages/contact-form-validation.js';

test('accepts the requested Latin and Cyrillic name forms after trimming', () => {
  for (const name of ['Alex', 'Олександр', 'Саша', 'Jean-Pierre', "O'Connor", 'D’Arcy']) {
    assert.equal(validateContactValue('name', name), true, name);
  }
  assert.equal(normalizeContactPayload({ name: '  Alex  ' }).payload.name, 'Alex');
});

test('rejects blank, short, overlong and technical names', () => {
  for (const name of ['', '   ', 'A', '123456', 'Alex123', '@@@!!!', 'A'.repeat(101)]) {
    assert.equal(validateContactValue('name', name.trim()), false, name);
  }
});

test('validates email examples and the 254-character limit', () => {
  for (const email of ['user@example.com', 'name.surname@gmail.com', 'test+asp@example.co.uk']) {
    assert.equal(validateContactValue('email', email), true, email);
  }
  for (const email of ['user@', '@example.com', 'user@example', 'user example@gmail.com']) {
    assert.equal(validateContactValue('email', email), false, email);
  }
  assert.equal(validateContactValue('email', `${'a'.repeat(242)}@example.com`), true);
  assert.equal(validateContactValue('email', `${'a'.repeat(243)}@example.com`), false);
});

test('validates optional phone characters and digit counts', () => {
  for (const phone of ['', '+380 67 123 45 67', '+380671234567', '(067) 123-45-67']) {
    assert.equal(validateContactValue('phone', phone), true, phone);
  }
  for (const phone of ['123456', '123456789012345678901', '123-ABC-7890']) {
    assert.equal(validateContactValue('phone', phone), false, phone);
  }
});

test('checks trimmed message lengths at 9, 10, 2000 and 2001 characters', () => {
  assert.equal(validateContactValue('message', 'a'.repeat(9)), false);
  assert.equal(validateContactValue('message', 'a'.repeat(10)), true);
  assert.equal(validateContactValue('message', 'a'.repeat(2000)), true);
  assert.equal(validateContactValue('message', 'a'.repeat(2001)), false);
  assert.equal(normalizeContactPayload({ message: `  ${'a'.repeat(9)}  ` }).valid, false);
});

test('normalizes to exactly the four webhook fields', () => {
  const { payload, errors, valid } = normalizeContactPayload({
    name: ' John Doe ', email: ' john@example.com ', phone: ' +380671234567 ', message: ' A long enough message ', website: 'bot', timestamp: 'ignored',
  });
  assert.equal(valid, true);
  assert.deepEqual(errors, {});
  assert.deepEqual(payload, { name: 'John Doe', email: 'john@example.com', phone: '+380671234567', message: 'A long enough message' });
  assert.deepEqual(Object.keys(payload), ['name', 'email', 'phone', 'message']);
});
