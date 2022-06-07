import { observable, observe } from './observer.js';

export default class Component {
  state;
  props;
  $target;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
  }

  setup() {
    this.state = observable(this.initState());

    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }

  template() {
    return ``;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setEvent() {}

  mounted() {}
}
