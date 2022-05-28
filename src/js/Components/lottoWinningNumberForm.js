import { $, $$ } from '../common/utils/DOM.js';
import { ableElement, checkForDuplicates, hideElements, showElements, setDisplay } from '../common/utils/utils.js';
import Component from '../Core/component.js';

export default class LottoWinningNumberForm extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
            <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
            <div class="d-flex">
              <div>
                <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                <div class="winner-number-container">
                  <input type="number" class="winning-number mx-1 text-center" />
                  <input type="number" class="winning-number mx-1 text-center" />
                  <input type="number" class="winning-number mx-1 text-center" />
                  <input type="number" class="winning-number mx-1 text-center" />
                  <input type="number" class="winning-number mx-1 text-center" />
                  <input type="number" class="winning-number mx-1 text-center" />
                </div>
              </div>
              <div class="bonus-number-container flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                  <input type="number" class="winning-number" id="bonus-number" text-center" />
                </div>
              </div>
            </div>
            <p id="number-error-message" hidden> 1 ~ 45 사이의 숫자만 입력이 가능합니다.</p>
            <p id="duplicate-error-message" hidden> 중복된 당첨번호가 존재합니다.</p>
            <button type="button" class="open-result-modal-button mt-5 btn btn-cyan w-100" disabled>결과 확인하기</button>
  `;
  }

  componentDidMount() {
    this.handleErrorMessage();

    [...$$('.winning-number')].map((input) => {
      input.addEventListener('change', () => {
        this.getWinningNumbers();
      });
    });

    $('#bonus-number').addEventListener('change', () => {
      this.activateResultBtn();
    });

    $('.open-result-modal-button').addEventListener('click', () => {
      this.onClickResultButton();

      showElements($('.lotto-status-section'), $('.lotto-result-form'));
      setDisplay($('.modal'), 'flex');
    });
  }

  handleErrorMessage() {
    [...$$('.winning-number')].map((winningNumberInput) => {
      winningNumberInput.addEventListener('change', () => {
        // winning number cannot be under 1 over 45 and each numbers can not be duplicated
        if ($('#number-error-message')) {
          hideElements($('#number-error-message'));
        }

        if (winningNumberInput.value < 1 || winningNumberInput.value > 45) {
          showElements($('#number-error-message'));
        }
      });
    });
  }

  activateResultBtn() {
    const winningNumberArray = this.getWinningNumbers();
    const resultButtonElement = $('.open-result-modal-button');

    if (checkForDuplicates(winningNumberArray) !== false) {
      showElements($('#duplicate-error-message'));
    } else {
      hideElements($('#duplicate-error-message'));
      ableElement(resultButtonElement);
    }
  }

  getWinningNumbers() {
    const winningNumbers = [];

    [...$$('.winning-number')].map((input) => {
      winningNumbers.push(Number(input.value));
    });

    return winningNumbers;
  }

  onClickResultButton() {
    const { updateWinningNumbers, updateModalStatus } = this.props;

    updateWinningNumbers(this.getWinningNumbers());
    updateModalStatus(true);
  }
}

// TODOS

// CANT GET WINNINGLOTTONUMBERS IN THIS COMPONENT

// RECHECK VALIDATION FOR WINNING NUBERS INPUT
