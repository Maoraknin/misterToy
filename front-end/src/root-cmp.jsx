import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutUs } from "./pages/about-us.jsx";
import { HomePage } from './pages/home-page.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { AppHeader } from './cmps/app-header.jsx';
import { AppFooter } from './cmps/app-footer.jsx';
import { ToyIndex } from './pages/toy-index';
import { ToyDetails } from "./pages/toy-details.jsx"

export function App() {

  return (
      <Provider store={store}>
          <Router>
              <section className="main-layout app">
                  <AppHeader />
                      <Routes>
                          <Route element={<HomePage />} path="/" />
                          <Route element={<AboutUs />} path="/about" />
                          <Route element={<ToyIndex />} path="/toy" />
                          <Route element={<ToyDetails />} path="/toy/:toyId" />

                      </Routes>
                  <AppFooter />
              </section>
          </Router>
       </Provider>
  )
}
