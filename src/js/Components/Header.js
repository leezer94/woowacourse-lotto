import { $, $$ } from '../common/utils/DOM.js';
import { disableChildElements, disableChildNodes, showElements } from '../common/utils/utils.js';
import { alertErrorMessage, isValidPurchaseInputValue } from '../common/utils/validators.js';
import Component from '../Core/component.js';

export default class Header extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
      <h1 class="text-center">🎱 행운의 로또</h1>
      <form class="lotto-purchase-form mt-5">
        <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요. </label>
        <div class="lotto-purchase-container d-flex">
          <input id="lotto-purchase-input" type="number" class="w-100 mr-2 pl-2" placeholder="구입 금액" />
          <button id="lotto-purchase-button" type="button" class="btn btn-cyan">확인</button>
        </div>
      </form>
`;
  }

  componentDidMount() {
    $('form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this.$target.addEventListener('click', ({ target }) => {
      if (target.id !== 'lotto-purchase-button') return;

      if (alertErrorMessage(isValidPurchaseInputValue($('#lotto-purchase-input')))) {
        this.updateAmount($('#lotto-purchase-input'));
        this.updateLottos();

        disableChildElements($('.lotto-purchase-container'));

        showElements($('.lotto-status-section'), $('.lotto-result-form'));
      }
    });
  }

  updateAmount(input) {
    const { updatePurchasedAmount } = this.props;

    updatePurchasedAmount(input);
  }

  updateLottos() {
    const { updateLottoNumbers } = this.props;
    const lottoNumbers = $$('.lotto-numbers');
    const numberArray = [];

    [...lottoNumbers].map((lotto) => {
      let numbers = lotto.textContent.split(', ');

      numbers = [...numbers].map((number) => Number(number));

      numberArray.push(numbers);
    });

    updateLottoNumbers(numberArray);
  }
}
