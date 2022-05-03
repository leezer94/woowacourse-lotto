import { PURCHASE } from '../constants/constant.js';

export const isValidPurchaseInputValue = (input) => {
  if (input.value <= 0) return `0 이하의 숫자는 입력이 불가능 합니다.`;

  if (input.value % PURCHASE.THRESHOLD_NUMBER !== 0) {
    return `1000으로 나누어 떨어지는 숫자만 입력이 가능합니다.`;
  }
};

export const alertErrorMessage = (errorMessage) => {
  let isValid = false;

  if (!errorMessage) {
    isValid = true;
  } else {
    isValid;

    window.alert(errorMessage);
  }

  return isValid;
};
