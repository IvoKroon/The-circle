import React from 'react';
import { injectGlobal } from 'emotion';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// HEADER
import Header from './components/general/Header';
import Footer from './components/general/Footer';

// PAGES
import Home from './components/pages/Home';
import Account from './components/pages/Account';
import Circles from './components/pages/Circles';
import CircleDetail from './components/pages/CircleDetail';
import CreateCircle from './components/pages/CreateCircle';

injectGlobal(`
  *, body {
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
const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account" component={Account} />
        <Route path="/createcircle" component={CreateCircle} />
        <Route path="/circle/:id" component={CircleDetail} />
        <Route path="/circles" component={Circles} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
