import React from 'react';
import { injectGlobal } from 'emotion';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// HEADER
import Header from './components/global/Header';
import Footer from './components/global/Footer';

// PAGES
import Home from './components/pages/Home';
import About from './components/pages/About';
import Topics from './components/pages/Topics';

injectGlobal(`
  body {
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
  }
`);
const App = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
      <Footer />
    </div>
  </Router>
);

export default App;
