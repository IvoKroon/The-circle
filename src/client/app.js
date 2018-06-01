import React from 'react';
import { injectGlobal } from 'emotion';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// HEADER
import Header from './components/global/Header';
import Footer from './components/global/Footer';

// PAGES
import Home from './components/pages/Home';
import About from './components/pages/About';
import Topics from './components/pages/Topics';
import TopicDetail from './components/pages/TopicDetail';

injectGlobal(`
  *, body {
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
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
        <Route path="/about" component={About} />
        <Route path="/topics/" component={Topics} />
        <Route path="/topics/:id" component={TopicDetail} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
