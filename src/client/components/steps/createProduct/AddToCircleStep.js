import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Holder = styled.div`
  width: 250px;
`;

const Desc = styled.div`
  margin-top: 10px;
`;

const CheckboxHolder = styled.div`
  margin-top: 20px;
`;

const Header = styled.h1`
  text-align: center;
`;
const CheckBox = styled.input`
  background: red;
`;
class AddToCircleStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all: true,
    };
  }

  changeButton(key) {
    const { circles } = this.props;
    circles[key].state = !circles[key].state;
    this.props.update(circles);
  }

  changeAll() {
    const { circles } = this.props;
    const all = !this.state.all;
    for (let i = 0; i < circles.length; i += 1) {
      circles[i].state = all;
    }
    this.setState({ all });
    this.props.update(circles);
  }

  render() {
    console.log(this.props.circles);
    const items = [];
    for (let i = 0; i < this.props.circles.length; i += 1) {
      const item = (
        <div key={i}>
          <CheckBox
            onChange={() => this.changeButton(i)}
            type="checkbox"
            checked={this.props.circles[i].state}
          />
          {this.props.circles[i].title}
        </div>
      );
      items.push(item);
    }
    return (
      <Holder>
        <Header>Create product</Header>
        <Desc>To what groups would you like to add this product?</Desc>
        <CheckboxHolder>
          <div>
            <input onChange={() => this.changeAll()} type="checkbox" checked={this.state.all} />All
            {items}
          </div>
        </CheckboxHolder>
      </Holder>
    );
  }
}

AddToCircleStep.propTypes = {
  update: PropTypes.func.isRequired,
  circles: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};

export default AddToCircleStep;
