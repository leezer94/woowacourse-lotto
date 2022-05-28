import { createStore } from './core/Store.js';

const initState = {
  purchasedAmount: 0,
  lottos: [],
  lottoWinningNumbers: [],
  isModalPopedUp: false,
  store: { 6: 0, 5: 0, 5.5: 0, 4: 0, 3: 0 },
};

export const PURCHASE_AMOUNT = 'purchasedAmount';
export const LOTTOS = 'lottos';
export const LOTTO_WINNING_NUMBERS = 'lottoWinningNumbers';
export const IS_MODAL_POPEDUP = 'isModalPopedUp';
export const STORE = 'store';

export const updatePurchasedAmount = (payload) => ({ type: PURCHASE_AMOUNT, payload });
export const updateLottos = (payload) => ({ type: LOTTOS, payload });
export const updateWinningNumbers = (payload) => ({ type: LOTTO_WINNING_NUMBERS, payload });
export const updateModalStatus = (payload) => ({ type: IS_MODAL_POPEDUP, payload });
export const updateStore = (payload) => ({ type: STORE, payload });

export const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case PURCHASE_AMOUNT:
      return { ...state, updatePurchasedAmount: action.payload };
    case LOTTOS:
      return { ...state, updateLottos: action.payload };
    case LOTTO_WINNING_NUMBERS:
      return { ...state, updateWinningNumbers: action.payload };
    case IS_MODAL_POPEDUP:
      return { ...state, updateModalStatus: action.payload };
    case STORE:
      return { ...state, updateStore: action.payload };
    default:
      return state;
  }
});
