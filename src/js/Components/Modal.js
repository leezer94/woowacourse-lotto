import { $ } from '../common/utils/DOM.js';
import { hideElements, showElements, setDisplay } from '../common/utils/utils.js';
import Component from '../Core/component.js';

export default class Modal extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
      <div class="modal-inner p-10">
          <div class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </div>

          <h2 class="text-center">🏆 당첨 통계 🏆</h2>
          <div class="d-flex justify-center">
            <table class="result-table border-collapse border border-black">
              <thead>
                <tr class="text-center">
                  <th class="p-3">일치 갯수</th>
                  <th class="p-3">당첨금</th>
                  <th class="p-3">당첨 갯수</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td class="p-3">3개</td>
                  <td class="p-3">5,000</td>
                  <td class="p-3">${this.props.store[3]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">4개</td>
                  <td class="p-3">50,000</td>
                  <td class="p-3">${this.props.store[4]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개</td>
                  <td class="p-3">1,500,000</td>
                  <td class="p-3">${this.props.store[5]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개 + 보너스볼</td>
                  <td class="p-3">30,000,000</td>
                  <td class="p-3">${this.props.store[5.5]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">6개</td>
                  <td class="p-3">2,000,000,000</td>
                  <td class="p-3">${this.props.store[6]}개</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-center font-bold">당신의 총 수익률은 %입니다.</p>
          <div class="d-flex justify-center mt-5">
            <button type="button" class="reset-btn btn-cyan">다시 시작하기</button>
          </div>
        </div>
  
  `;
  }

  componentDidMount() {
    const { updateModalStatus, lottoWinningNumbers, isModalPopedUp } = this.props;

    $('.open-result-modal-button').addEventListener('click', () => {
      if (isModalPopedUp) {
        this.compareLottoNumbers(lottoWinningNumbers);
      }
    });

    $('.reset-btn').addEventListener('click', () => {
      updateModalStatus(false);
      this.onClickResetBtn();
    });

    $('.close-x').addEventListener('click', () => {
      updateModalStatus(false);
      this.onClickCloseBtn();
    });
  }

  onClickResetBtn() {
    const { resetState } = this.props;

    resetState();
    setDisplay($('.modal'), 'none');
    hideElements($('.lotto-status-section'), $('.lotto-result-form'));
  }

  onClickCloseBtn() {
    setDisplay($('.modal'), 'none');
    showElements($('.lotto-status-section'), $('.lotto-result-form'));
  }

  compareLottoNumbers(lottoWinningNumbers) {
    const { lottos, updateStore } = this.props;

    const winning_numbers = lottoWinningNumbers.slice(0, 6);
    const bonus_number = lottoWinningNumbers.slice(6, 7);

    const store = { 6: 0, 5: 0, 5.5: 0, 4: 0, 3: 0 };

    // count 5 와 5.5 에 대한 검증

    [...lottos].map((lotto) => {
      let count = 0;

      lotto.map((number) => {
        if (winning_numbers.includes(number)) {
          count++;
        }
      });

      console.log(count);

      if (count >= 1) store[count] += 1;

      if (count === 5 && winning_numbers.includes(bonus_number)) {
        store[5.5] += 1;
      }
    });

    updateStore(store);
  }

  // TODOS

  // ALGORITHM FOR COMPARING LOTTO NUMBERS

  // [[1,2,4,5,6,7], [4,7,2,11,44,33],[44,22,33,12,43,11]]

  // [1,2,3,4,5,6,7]  winning numbers + bonus number
}
