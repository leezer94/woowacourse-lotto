export const disableChildNodes = (...target) => {
  target.forEach(({ childNodes }) => {
    childNodes.forEach((child) => {
      child.disabled = true;
    });
  });
};

export const ableChildNodes = (...target) => {
  target.forEach(({ childNodes }) => {
    childNodes.forEach((child) => {
      child.disabled = false;
    });
  });
};

export const disableChildElements = (target) => {
  [...target.children].map((childElement) => (childElement.disabled = true));
};

export const ableChildElements = (target) => {
  [...target.children].map((childElement) => (childElement.disabled = false));
};

export const showElements = (...targets) => {
  targets.forEach((target) => (target.hidden = false));
};

export const hideElements = (...targets) => {
  targets.forEach((target) => (target.hidden = true));
};

export const clearInputValue = (inputs) => {
  [...inputs].map((input) => (input.value = ''));
};

export const toggleClassList = (target, classList) => {
  [...target].map((container) => container.classList.toggle(classList));
};

export const getLottoNumbers = () => {
  const lottoNumbers = [];

  while (lottoNumbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;

    if (lottoNumbers.indexOf(randomNumber) === -1) lottoNumbers.push(randomNumber);

    let add = true;

    for (let number = 0; number < 45; number++) {
      if (lottoNumbers[number] == lottoNumbers) {
        add = false;
      }
    }
  }

  return lottoNumbers.sort((a, b) => a - b).join(', ');
};
