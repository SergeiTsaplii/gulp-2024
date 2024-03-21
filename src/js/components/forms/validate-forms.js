/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
import JustValidate from 'just-validate';
import Inputmask from 'inputmask';

const validateForms = (url, selector, rules, successSend, errorSend) => {
  const form = document?.querySelector(selector);
  const telSelector = form?.querySelector('input[type="tel"]');

  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  if (telSelector) {
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    for (const item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: 'function',
          validator() {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: item.telError,
        });
      }
    }
  }

  const validation = new JustValidate(selector);

  for (const item of rules) {
    validation
      .addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess(async (ev) => {
    const formData = new FormData(ev.target);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    });

    if (response.ok) {
      // success dialog
      successSend();
      form.reset();
    } else {
      // error dialog
      errorSend();
    }
  });
};

export default validateForms;
