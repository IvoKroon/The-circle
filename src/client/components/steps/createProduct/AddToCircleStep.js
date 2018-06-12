import React from 'react';
import PropTypes from 'prop-types';

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
        <div key={0}>
          {this.props.circles[i].title}
          <input
            onChange={() => this.changeButton(i)}
            type="checkbox"
            checked={this.props.circles[i].state}
          />
        </div>
      );
      items.push(item);
    }
    return (
      <div>
        <h1>Title toevoegen</h1>
        <p>Wat voor instellingen moeten wij de Circle geven?</p>
        <div>
          check box all
          <div>
            Alles<input
              onChange={() => this.changeAll()}
              type="checkbox"
              checked={this.state.all}
            />
            {items}
          </div>
        </div>
      </div>
    );
  }
}

AddToCircleStep.propTypes = {
  update: PropTypes.func.isRequired,
  circles: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};

export default AddToCircleStep;
