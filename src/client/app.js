import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { injectGlobal } from 'emotion';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { TextColor } from './components/general/GlobalCss';
// HEADER
import Header from './components/general/Header';
import Footer from './components/general/Footer';

// PAGES
import Home from './components/pages/Home';
import Account from './components/pages/Account';
import Products from './components/pages/Products';
import ProductDetail from './components/pages/ProductDetail';
import CreateProduct from './components/pages/CreateProduct';
import CreateBuyRequest from './components/pages/CreateBuyRequest';
import PayBuyRequest from './components/pages/PayBuyRequest';

import Circles from './components/pages/Circles';
import CircleDetail from './components/pages/CircleDetail';
import CreateCircle from './components/pages/CreateCircle';

import CircleStore from './stores/CircleStore';
import UserStore from './stores/UserStore';

import firebase from './components/general/firebaseConfig';
import RequestProduct from './components/pages/RequestProduct';

injectGlobal(`
  *, body {
    margin:0;
    padding:0;
    box-sizing: inherit;
    @media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 812px) 
  and (orientation: portrait) { 
}

  }

  body{
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
    color:${TextColor};
    position:relative;
    padding-bottom: 6rem;
    min-height: 100%;
  }
  html{
    height: 100%;
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    &:active, :visited, :link, :active{
      text-decoration: none;
    }
  }

`);
const NoMatch = () => (
  <div>
    <h1>NOT FOUND</h1>
  </div>
);
const removeUser = () => {
  localStorage.removeItem('user');
};

const LoadUser = () => {
  const id = 2;
  const messagesRef = firebase.database().ref(`users/${id}`);
  messagesRef.once('value', (snapshot) => {
    const { firstname, lastname } = snapshot.val();
    const circles = snapshot.val().circles ? snapshot.val().circles : [];
    const circlesArray = Object.values(circles);
    localStorage.setItem(
      'user',
      JSON.stringify({
        id,
        firstname,
        lastname,
        circles: circlesArray,
        products: [],
      }),
    );
  });
};

const CreateRandomUser = () => {
  const ref = firebase.database().ref('users');
  const data = { firstname: 'test', lastname: 'test' };

  ref.push(data).then((result) => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: result.key,
        firstname: 'test',
        lastname: 'lastname',
      }),
    );
  });
};

@observer
class App extends Component {
  render() {
    // FOR RESETTING
    // removeUser();
    LoadUser();
    // we don't need to reload all the user data every refresh.
    // if (!localStorage.getItem('user')) {
    //   LoadUser();
    // } else {
    //   CreateRandomUser();
    // }

    return (
      <Provider circles={CircleStore} user={UserStore}>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/account" component={Account} />
              <Route path="/createbuyrequest/:id" component={CreateBuyRequest} />
              <Route path="/paybuyrequest/:circleid/:id" component={PayBuyRequest} />
              <Route path="/createcircle" component={CreateCircle} />
              <Route path="/circle/:id" component={CircleDetail} />
              <Route path="/circles" component={Circles} />
              <Route path="/products/:id" component={ProductDetail} />
              <Route path="/createproduct" component={CreateProduct} />
              <Route path="/products" component={Products} />
              <Route path="/notfound" component={NoMatch} />
              <Route path="/requestproduct/:id" component={RequestProduct} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
