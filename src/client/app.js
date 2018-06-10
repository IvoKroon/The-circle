import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

import Circles from './components/pages/Circles';
import CircleDetail from './components/pages/CircleDetail';
import CreateCircle from './components/pages/CreateCircle';

import CircleStore from './stores/CircleStore';

injectGlobal(`
  *, body {
    color:${TextColor};
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
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

@observer
class App extends Component {
  render() {
    // this.props.store.addCircle(1, 'title', 'desc', 'img');
    console.log(this.props.store.circles);

    // // // this.props.store.todos.map(todo => (
    // // this.props.store.addTodo("Get Coffee");
    // // this.props.store.addTodo("Write simpler code");
    // // console.log(this.props.store.tasks);
    // this.props.store.tasks.map(data => {
    //   console.log(data);
    // });
    return (
      <Provider store={CircleStore}>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/account" component={Account} />
              <Route path="/createcircle" component={CreateCircle} />
              <Route path="/circle/:id" component={CircleDetail} />
              <Route path="/circles" component={Circles} />
              <Route path="/products/:id" component={ProductDetail} />
              <Route path="/createproduct" component={CreateProduct} />
              <Route path="/products" component={Products} />
              <Route path="/notfound" component={NoMatch} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({
    circles: PropTypes.object.isRequired,
    addCircle: PropTypes.func.isRequired,
  }).isRequired,
};
//   //   circles: PropTypes.array.isRequired,
//   //   addCircle: PropTypes.func.isRequired
//   // }).isRequired
//   //     id: PropTypes.string.isRequired,
//   //   }).isRequired,
//   // }).isRequired,
//   // history: PropTypes.shape({
//   //   push: PropTypes.func.isRequired,
//   // }).isRequired,
// };

// App.propTypes = {
//   circles: PropTypes.observableArray.isRequired,
//   store: PropTypes.any
// };

export default App;
