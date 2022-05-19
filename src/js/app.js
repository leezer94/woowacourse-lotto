import { PURCHASE } from './common/constants/constant.js';
import { $ } from './common/utils/DOM.js';
import Header from './Components/Header.js';
import LottoStatus from './Components/LottoStatus.js';
import LottoWinningNumberForm from './Components/lottoWinningNumberForm.js';
import Modal from './Components/Modal.js';
import Component from './Core/component.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  async initialState() {
    this.setState({
      purchasedAmount: 0,
      lottoNumbers: [],
      winningNumbers: [],
    });
  }

  template() {
    return `
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <section class="lotto-purchase-section"></section>
          <section class="lotto-status-section mt-9" hidden></section>
          <form class="lotto-result-form mt-9" hidden></form>
          <div class="modal"></div>
        </div>
      </div>
    `;
  }

  componentDidMount() {
    // bind(this) 로 this 를 넘겨줌

    const { handlePurchasedAmount, handleLottoNumbers, handleResultButton, handleStates } = this;

    new Header($('.lotto-purchase-section'), {
      ...this.state,
      updatePurchasedAmount: handlePurchasedAmount.bind(this),
      // updateLottoNumbers: handleLottoNumbers.bind(this),
    });

    new LottoStatus($('.lotto-status-section'), {
      ...this.state,
      updateLottoNumbers: handleLottoNumbers.bind(this),
    });

    new LottoWinningNumberForm($('.lotto-result-form'), {
      ...this.state,
      updateWinningNumbers: handleResultButton.bind(this),
    });

    new Modal($('.modal'), {
      ...this.state,
      resetState: handleStates.bind(this),
    });
  }

  handlePurchasedAmount(inputNumber) {
    let { purchasedAmount } = this.state;

    purchasedAmount = inputNumber.value / PURCHASE.THRESHOLD_NUMBER;

    this.setState({
      ...this.state,
      purchasedAmount,
    });
  }

  handleLottoNumbers(numbers) {
    let { lottoNumbers } = this.state;

    lottoNumbers = numbers;

    this.setState({
      ...this.state,
      lottoNumbers,
    });
  }

  handleResultButton(numbers) {
    let { winningNumbers } = this.state;

    winningNumbers = numbers;

    this.setState({
      ...this.state,
      winningNumbers,
    });
  }

  handleStates() {
    let { purchasedAmount, lottoNumbers, winningNumbers } = this.state;
    purchasedAmount = 0;
    lottoNumbers = [];
    winningNumbers = [];

    this.setState({
      purchasedAmount,
      lottoNumbers,
      winningNumbers,
    });
  }
}

// 자세하게 볼 내용은 template() 과 componentDidMount 를 보면 된다.
// template 을 각 컴포넌트를 root DOM 을 지정해줘야한다.
// 왜냐하면 하위 컴포넌트에서 해당 root DOM 사이에 해당(하위) 컴포넌트에 맞는 template 을 설정할 수 있기 때문이다.

// componentDidMount 메서드에는 해당 컴포넌트에 필요한 이벤트 또는 하위 컴포넌트를 생성해줘야한다.
