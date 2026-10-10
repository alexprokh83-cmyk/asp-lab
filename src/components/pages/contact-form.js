import { normalizeContactPayload, validateContactValue } from './contact-form-validation.js';

(() => {
  'use strict';

  const form = document.querySelector('[data-contact-form]');
  if (!(form instanceof HTMLFormElement)) return;

  const CONTACT_API_URL = '/api/asp-contact';
  const COOLDOWN_MS = 60_000;
  const STORAGE_KEY = 'asp_contact_last_submit';
  const copy = JSON.parse(form.dataset.copy || '{}');
  const fields = {
    name: form.elements.namedItem('name'),
    email: form.elements.namedItem('email'),
    phone: form.elements.namedItem('phone'),
    message: form.elements.namedItem('message'),
  };
  const honeypot = form.elements.namedItem('website');
  const submitButton = form.querySelector('[data-contact-submit]');
  const status = form.querySelector('[data-contact-status]');
  const cooldownMessage = form.querySelector('[data-contact-cooldown]');
  let submitting = false;
  let cooldownUntil = 0;
  let cooldownTimer = 0;

  const errorCopy = { name: copy.nameError, email: copy.emailError, phone: copy.phoneError, message: copy.messageError };

  function setError(key, message) {
    const field = fields[key];
    const error = form.querySelector(`#${field.id}-error`);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    error.hidden = !message;
  }

  function validateField(key, normalizedValue) {
    const message = validateContactValue(key, normalizedValue) ? '' : errorCopy[key];
    setError(key, message);
    return !message;
  }

  function validateAll() {
    const normalized = normalizeContactPayload(Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value])));
    const values = normalized.payload;
    for (const key of Object.keys(fields)) fields[key].value = values[key];

    let valid = normalized.valid;
    for (const key of Object.keys(fields)) valid = validateField(key, values[key]) && valid;

    // Keep native required/type/minlength/maxlength/pattern constraints as a second check.
    if (!form.checkValidity()) valid = false;
    return { valid, values };
  }

  function setFieldsDisabled(disabled) {
    for (const field of Object.values(fields)) field.disabled = disabled;
    honeypot.disabled = disabled;
    form.classList.toggle('is-locked', disabled);
  }

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.hidden = !message;
    status.classList.toggle('is-error', isError);
  }

  function safelyRemoveStoredTime() {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be disabled. */ }
  }

  function finishCooldown() {
    window.clearInterval(cooldownTimer);
    cooldownTimer = 0;
    cooldownUntil = 0;
    setFieldsDisabled(false);
    submitButton.disabled = false;
    cooldownMessage.hidden = true;
    cooldownMessage.textContent = '';
    safelyRemoveStoredTime();
  }

  function startCooldown(submittedAt) {
    cooldownUntil = submittedAt + COOLDOWN_MS;
    setFieldsDisabled(true);
    submitButton.disabled = true;
    cooldownMessage.hidden = false;

    const update = () => {
      const remainingMs = cooldownUntil - Date.now();
      if (remainingMs <= 0) {
        finishCooldown();
        return;
      }
      const seconds = Math.ceil(remainingMs / 1000);
      cooldownMessage.textContent = copy.cooldown.replace('{seconds}', String(seconds));
    };

    window.clearInterval(cooldownTimer);
    update();
    cooldownTimer = window.setInterval(update, 1000);
  }

  function restoreCooldown() {
    let submittedAt = 0;
    try { submittedAt = Number(localStorage.getItem(STORAGE_KEY)); } catch { return; }
    if (!Number.isFinite(submittedAt) || submittedAt <= 0 || submittedAt > Date.now()) {
      safelyRemoveStoredTime();
      return;
    }
    if (Date.now() - submittedAt < COOLDOWN_MS) {
      setStatus(copy.success);
      startCooldown(submittedAt);
    } else safelyRemoveStoredTime();
  }

  form.addEventListener('input', event => {
    const field = event.target;
    const key = field?.name;
    if (!Object.hasOwn(fields, key) || field.getAttribute('aria-invalid') !== 'true') return;
    validateField(key, field.value.trim());
  });

  form.addEventListener('blur', event => {
    const field = event.target;
    const key = field?.name;
    if (Object.hasOwn(fields, key)) validateField(key, field.value.trim());
  }, true);

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || Date.now() < cooldownUntil) return;

    setStatus('');
    cooldownMessage.hidden = true;
    const { valid, values } = validateAll();
    if (!valid) return;

    // Silently discard bot submissions; the honeypot is never part of the JSON payload.
    if (honeypot.value.trim()) return;

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
    };
    const submitLabel = submitButton.textContent;
    submitting = true;
    form.setAttribute('aria-busy', 'true');
    submitButton.disabled = true;
    submitButton.textContent = copy.loading;
    setStatus(copy.loading);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30_000);
    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      let result = null;
      try { result = await response.json(); } catch { /* Empty or non-JSON reply is not success. */ }
      if (!response.ok || !result || typeof result !== 'object' || result.status !== 'ok' || Object.prototype.hasOwnProperty.call(result, 'error')) {
        throw new Error('Contact webhook rejected the request');
      }

      const submittedAt = Date.now();
      try { localStorage.setItem(STORAGE_KEY, String(submittedAt)); } catch { /* Keep cooldown for this page session. */ }
      setStatus(copy.success);
      startCooldown(submittedAt);
    } catch {
      setStatus(copy.sendError, true);
      submitButton.disabled = false;
    } finally {
      window.clearTimeout(timeout);
      submitting = false;
      form.setAttribute('aria-busy', 'false');
      submitButton.textContent = submitLabel;
      if (Date.now() >= cooldownUntil) submitButton.disabled = false;
    }
  });

  restoreCooldown();
})();
