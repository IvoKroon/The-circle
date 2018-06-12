import React from 'react';
import PropTypes from 'prop-types';

export default class MultipleStepFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  previousStep() {
    if (this.state.step - 1 >= 0) {
      const step = this.state.step - 1;
      this.setState({ step });
    }
  }

  nextStep() {
    if (
      this.state.step + 1 < this.props.components.length &&
      this.props.nextStep(this.state.step)
    ) {
      const step = this.state.step + 1;
      this.setState({ step });
    }
  }

  render() {
    const current = this.props.components[this.state.step];
    return (
      <div>
        {current}
        <button onClick={() => this.previousStep()}>Previos</button>
        <button
          onClick={
            this.state.step === this.props.components.length - 1
              ? () => this.props.finalAction()
              : () => this.nextStep()
          }
        >
          {this.state.step === this.props.components.length - 1 ? 'Finale' : 'Next'}
        </button>
      </div>
    );
  }
}
MultipleStepFrom.propTypes = {
  components: PropTypes.arrayOf(PropTypes.any).isRequired,
  nextStep: PropTypes.func.isRequired,
  finalAction: PropTypes.func.isRequired,
};
