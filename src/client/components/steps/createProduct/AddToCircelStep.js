import React from 'react';
import PropTypes from 'prop-types';

class ImageStep extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     all: true,
  //     circles: [{ title: 'EEN', state: true }, { title: 'twee', state: true }],
  //   };
  //   this.changeButton = this.changeButton.bind(this);
  // }
  // changeButton(key) {
  //   const { circles } = this.state;
  //   circles[key].state = !circles[key].state;
  //   this.setState({ all: false, circles });
  // }
  // changeAll() {
  //   const { circles } = this.state;
  //   const all = !this.state.all;
  //   for (let i = 0; i < circles.length; i += 1) {
  //     circles[i].state = all;
  //   }
  //   this.setState({ all, circles });
  // }
  render() {
    // const circles = ['een', 'twee', 'drie'];
    // const items = [];
    // for (let i = 0; i < circles.length; i += 1) {
    //   const item = (
    //     <div>
    //       {circles[i]} <button onClick={this.changeButton(i)}>active</button>
    //     </div>
    //   );
    //   items.push(item);
    // }
    return (
      <div>
        <h1>Title toevoegen</h1>
        <p>Wat voor instellingen moeten wij de Circle geven?</p>
        <div>
          check box all<button>{this.state.all ? 'Alles' : 'Niet alles'}</button>

        </div>
      </div>
    );
  }
}

ImageStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeToggle: PropTypes.func.isRequired,
  toggleState: PropTypes.bool.isRequired,
  titleValue: PropTypes.string.isRequired,
};

export default ImageStep;
