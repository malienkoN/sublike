'use strict'

import 'normalize.css';
import '../scss/main.scss';

// const form = document.querySelector('form');
// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   sendMessage(form);
// });

// async function sendMessage(form) {
//   const formData = new FormData(form);

//   if (formData) {
//     const url = 'sendmessage.php';
//     const response = await fetch(url, {
//       method: "POST",
//       body: formData
//     });

//     if (response.ok) {
//       form.reset();
//       alert('Form sent!');
//     } else {
//       alert('Error');
//     }
//   }
// }

class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnSubmit();
    this.validateOnEntry();
  }

  validateOnSubmit() {
    this.form.addEventListener('submit', (function (e) {
      e.preventDefault();

      this.fields.forEach(field => {
        const input = document.querySelector(`#${field}`);
        this.validateField(input);
      });
    }).bind(this));
  }

  validateOnEntry() {
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`);
      input.addEventListener('input', (function (e) {
        this.validateField(input);
      }).bind(this));
    });
  }

  validateField(field) {
    if (field.value.trim() === '') {
      this.setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, 'error');
    } else {
      this.setStatus(field, null, 'success');
    }

    if (field.type === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (re.test(field.value)) {
        this.setStatus(field, null, 'success');
      } else {
        this.setStatus(field, 'Please enter a valid email address', 'error');
      }
    }

    if (field.id === 'password_confirmation') {
      const passwordField = this.form.querySelector('#password');

      if (field.value.trim() === '') {
        this.setStatus(field, 'Password confirmation required', 'error');
      } else if (field.value !== passwordField.value) {
        this.setStatus(field, 'Password does not match', 'error');
      } else {
        this.setStatus(field, null, 'success');
      }
    }
  }

  setStatus(field, message, status) {
    const successIcon = field.parentElement.querySelector('.icon-success');
    const errorIcon = field.parentElement.querySelector('.icon-error');
    const errorMessage = field.parentElement.querySelector('.error-message');

    if (status === 'success') {
      if (errorIcon) errorIcon.classList.add('hidden')
      if (errorMessage) errorMessage.innerText = ''
      successIcon.classList.remove('hidden')
      field.classList.remove('input-error')
    }

    if (status === 'error') {
      if (successIcon) successIcon.classList.add('hidden')
      errorMessage.innerText = message
      errorIcon.classList.remove('hidden')
      field.classList.add('input-error')
    }
  }
}


const form = document.querySelector('.form');
const fields = ["username", 'email', "password", "password_confirmation", "message"];

const validator = new FormValidator(form, fields);

validator.initialize();