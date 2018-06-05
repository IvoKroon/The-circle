import React from 'react';
import TextField from '../form/TextField';
import ToggleButton from '../form/ToggleButton';
import { MainContainer } from '../general/GlobalCss';
import firebase from '../general/firebaseConfig';

class CreateCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: 'test',
      status: false,
      img: 'https://picsum.photos/200/200/?random',
    };
    this.title = '';
    this.database = firebase.database();
  }

  createCircle() {
    if (this.state.title.length > 0) {
      const {
        title, desc, status, img,
      } = this.state;
      const ref = this.database.ref('circles');
      ref.push({
        title,
        desc,
        status,
        img,
      });
    } else {
      console.log('error');
    }
    // const ref = new Firebase('circles/');
    // this new, empty ref only exists locally
    // const newChildRef = ref.push();
    // // we can get its id using key()
    // console.log('my new shiny id is ' + newChildRef.key());
    // // now it is appended at the end of data at the server
    // newChildRef.set({ foo: 'bar' });
  }

  render() {
    return (
      <MainContainer>
        <h1>Create circle</h1>
        <TextField onChange={e => this.setState({ title: e.target.value })} placeHolder="Title" />
        <ToggleButton
          onChange={value => this.setState({ status: value })}
          trueValue="Privé"
          falseValue="Open"
          checked={this.state.status}
        />
        <button onClick={() => this.createCircle()}>Create</button>
      </MainContainer>
    );
  }
}

export default CreateCircle;
