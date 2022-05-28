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
    this.initialState();
  }

  async initialState() {
    this.setState({
      purchasedAmount: 0,
      lottos: [],
      lottoWinningNumbers: [],
      isModalPopedUp: false,
      store: { 6: 0, 5: 0, 5.5: 0, 4: 0, 3: 0 },
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

    // Rendering needs to be done when it is actually needed
    // As well as only limited(essential) states are updating as needed
    // reRendering is happening when elements are called on different ( not appropriate ) component ??

    const { handlePurchasedAmount, handleLottos, handleResultButton, handleStates, handleModalState, handleStore } = this;

    // In the header component lotto and purchasedAmount states need to be updated on click submit event

    new Header($('.lotto-purchase-section'), {
      ...this.state,
      updatePurchasedAmount: handlePurchasedAmount.bind(this),
      updateLottos: handleLottos.bind(this),
    });

    new LottoStatus($('.lotto-status-section'), {
      ...this.state,
    });

    new LottoWinningNumberForm($('.lotto-result-form'), {
      ...this.state,
      updateWinningNumbers: handleResultButton.bind(this),
      updateModalStatus: handleModalState.bind(this),
    });

    new Modal($('.modal'), {
      ...this.state,
      updateModalStatus: handleModalState.bind(this),
      updateStore: handleStore.bind(this),
      resetState: handleStates.bind(this),
    });
  }

  handlePurchasedAmount(inputNumber) {
    this.setState({
      ...this.state,
      purchasedAmount: inputNumber.value / PURCHASE.THRESHOLD_NUMBER,
    });
  }

  handleLottos(numbers) {
    this.setState({
      ...this.state,
      lottos: numbers,
    });
  }

  handleResultButton(numbers) {
    this.setState({
      ...this.state,
      lottoWinningNumbers: numbers,
    });
  }

  handleStore(newStore) {
    this.setState({
      ...this.state,
      store: newStore,
    });
  }

  handleModalState(boolean) {
    this.setState({
      ...this.state,
      isModalPopedUp: boolean,
    });
  }

  handleStates() {
    this.setState({
      purchasedAmount: 0,
      lottos: [],
      lottoWinningNumbers: [],
      isModalPopedUp: false,
      store: { 6: 0, 5: 0, 5.5: 0, 4: 0, 3: 0 },
    });
  }
}

// 자세하게 볼 내용은 template() 과 componentDidMount 를 보면 된다.
// template 을 각 컴포넌트를 root DOM 을 지정해줘야한다.
// 왜냐하면 하위 컴포넌트에서 해당 root DOM 사이에 해당(하위) 컴포넌트에 맞는 template 을 설정할 수 있기 때문이다.

// componentDidMount 메서드에는 해당 컴포넌트에 필요한 이벤트 또는 하위 컴포넌트를 생성해줘야한다.
