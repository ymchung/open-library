import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import appStore from './store';

import SearchContainer from './containers/search';
import BooksContainer from './containers/books';
import BookDetailsContainer from './containers/bookDetails';
import HeaderLogo from './components/HeaderLogo';
import AboutApp from './components/About';

const App = () => {
  return (
    <Provider store={appStore}>
      <div className="App">
        <header className="App-header container">
            <div className="row py-4">
              <div className="col">
                  <HeaderLogo />
              </div>
              <div className="col-sm-12 col-md-6">
                <SearchContainer />
              </div>
            </div>
        </header>
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<AboutApp />}/>
            <Route path="books" element={<BooksContainer />}/>
            <Route path="book/:bookId" element={<BookDetailsContainer />}/>
            <Route path ="*" element={<div>Parece que esta página no existe</div>} />
          </Routes>
        </main>
      </div>
    </Provider>
  );
}

export default App;
