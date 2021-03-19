import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import './StyleSheet.css';
import FetchS from './components/FetchS';

const Root = function() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/search/:searchTerm" component={App} />
        <Route path="/beer/:beerId/:beerSlug" component={FetchS} />
      </div>
    </BrowserRouter>
  );
};

render(<Root/>, document.querySelector('#root'));
