import React from 'react';
import TextField from '../form/TextField';
import { MainContainer } from '../general/Global';

class CreateCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.title = '';
  }

  render() {
    return (
      <MainContainer>
        <h1>Create circle</h1>
        <TextField
          onChange={e => this.setState({ title: e.target.value })}
          placeHolder="Title"
        />
        <button onClick={() => console.log(this.state.title)}>test</button>
      </MainContainer>
    );
  }
}

export default CreateCircle;
