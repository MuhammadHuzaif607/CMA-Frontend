import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Register from './pages/register';
import Login from './pages/login';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/authstate';
import Notfound from './pages/not_found';
import Protectedroutes from './components/features/protectedroutes/index';

function App() {
  return (
    <ContactState>
      <AuthState>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/home"
            element={
              <Protectedroutes>
                <Home />
              </Protectedroutes>
            }
          ></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </AuthState>
    </ContactState>
  );
}

export default App;
