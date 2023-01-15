// import './assets/style/main.css'
import './assets/styles/styles.scss'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutUs } from "./pages/about-us.jsx";
import { Dashboard } from "./pages/dashboard.jsx";
import { Login } from "./pages/login.jsx";
import { HomePage } from './pages/home-page.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { AppHeader } from './cmps/app-header.jsx';
import { ReviewApp } from './pages/review-app.jsx'
import { AppFooter } from './cmps/app-footer.jsx';
import { ToyIndex } from './pages/toy-index';
import { ToyDetails } from "./pages/toy-details.jsx"
import { UserDetails } from "./pages/user-details.jsx"
import { ToyEdit } from "./cmps/toy-edit.jsx"


export function App() {

  return (
      <Provider store={store}>
          <Router>
              <section className="app">
                  <AppHeader />
                  <main className='app-main-container full main-layout'>
                      <Routes>
                          <Route element={<HomePage />} path="/" />
                          <Route element={<AboutUs />} path="/about" />
                          <Route element={<Login />} path="/login" />
                          <Route element={<Dashboard />} path="/dashboard" />
                          <Route element={<ReviewApp />} path="/review" />
                          <Route element={<ToyIndex />} path="/toy" >
                             <Route element={<ToyEdit />} path="/toy/edit" />
                             <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                          </Route>
                          <Route element={<ToyDetails />} path="/toy/:toyId" />
                          <Route element={<UserDetails />} path="/user" />

                      </Routes>
                      </main>
                  <AppFooter />
              </section>
          </Router>
       </Provider>
  )
}
