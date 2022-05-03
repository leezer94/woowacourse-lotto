import { $, $$ } from '../common/utils/DOM.js';
import { getLottoNumbers, hideElements, showElements, toggleClassList } from '../common/utils/utils.js';
import Component from '../Core/component.js';

export default class LottoStatus extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { purchasedAmount } = this.props;

    return `
      <div class="d-flex">
          <label class="flex-auto my-0">총 ${purchasedAmount}개를 구매하였습니다.</label>
          <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
              <input type="checkbox" class="lotto-numbers-toggle-button" />
              <span class="text-base font-normal">번호보기</span>
            </label>
          </div>
      </div>
      <div class="lotto-status-box d-flex flex-wrap">
      ${[...new Array(purchasedAmount)]
        .map(() => {
          return `<span class="mx-1 text-3xl">🎟️ <span class="lotto-numbers hidden">${getLottoNumbers()}</span></span>`;
        })
        .join('')}
      </div>
  `;
  }

  componentDidMount() {
    $('.lotto-numbers-toggle-button').addEventListener('change', () => {
      toggleClassList($$('.lotto-numbers'), 'hidden');
    });
  }
}
