import { PURCHASE } from './common/constants/constant.js';
import { $ } from './common/utils/DOM.js';
import Header from './Components/Header.js';
import LottoStatus from './Components/LottoStatus.js';
import Component from './Core/component.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  async initialState() {
    this.setState({
      ...this.props,
      purchasedAmount: 0,
      lottoNumbers: [],
    });
  }

  template() {
    return `
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <section class="lotto-purchase-section"></section>
          <section class="lotto-status-section mt-9" hidden></section>
          <form class="lotto-result-form mt-9"></form>
          <div class="modal"></div>
        </div>
      </div>
    `;
  }

  componentDidMount() {
    const { handlePurchasedAmount } = this;

    new Header($('.lotto-purchase-section'), {
      ...this.state,
      updatePurchasedAmount: handlePurchasedAmount.bind(this),
    });

    new LottoStatus($('.lotto-status-section'), { ...this.state });
  }

  handlePurchasedAmount(input) {
    let { purchasedAmount } = this.state;

    purchasedAmount = input.value / PURCHASE.THRESHOLD_NUMBER;

    this.setState({
      ...this.state,
      purchasedAmount,
    });
  }
}

// 자세하게 볼 내용은 template() 과 componentDidMount 를 보면 된다.
// template 을 각 컴포넌트를 root DOM 을 지정해줘야한다.
// 왜냐하면 하위 컴포넌트에서 해당 root DOM 사이에 해당(하위) 컴포넌트에 맞는 template 을 설정할 수 있기 때문이다.

// componentDidMount 메서드에는 해당 컴포넌트에 필요한 이벤트 또는 하위 컴포넌트를 생성해줘야한다.
