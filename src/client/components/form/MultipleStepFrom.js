import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Button from './Button';
import { MainColor } from '../general/GlobalCss';

const StepPointerHolder = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const ButtonHolder = styled.div`
  margin-top: 40px;
`;

const Step = styled.div`
  margin-left: 1px;
  border-radius: 50%;
  height: 6px;
  width: 6px;
  border: 1px solid ${MainColor};
  background: ${props => (props.active ? 'white' : MainColor)};
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

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
    const steps = [];
    for (let i = 0; i < this.props.components.length; i += 1) {
      if (this.state.step === i) {
        steps.push(<Step key={i} active />);
      } else {
        steps.push(<Step key={i} />);
      }
    }
    return (
      <Holder>
        {current}
        <ButtonHolder>
          {this.state.step === 0 ? null : (
            <Button onClick={() => this.previousStep()}>Previous</Button>
          )}
          <Button
            onClick={
              this.state.step === this.props.components.length - 1
                ? () => this.props.finalAction()
                : () => this.nextStep()
            }
          >
            {this.state.step === this.props.components.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </ButtonHolder>
        <StepPointerHolder>{steps}</StepPointerHolder>
      </Holder>
    );
  }
}
MultipleStepFrom.propTypes = {
  components: PropTypes.arrayOf(PropTypes.any).isRequired,
  nextStep: PropTypes.func.isRequired,
  finalAction: PropTypes.func.isRequired,
};
