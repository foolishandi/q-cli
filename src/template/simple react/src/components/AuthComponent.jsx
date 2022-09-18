import React from 'react';
import {useNavigate} from 'react-router-dom';
import Login from '../pages/login';

function AuthComponent({children}) {
  const isLogin = localStorage.getItem('token');
  const navigate = useNavigate();
  return isLogin ? children : <Login></Login>;
}

export default AuthComponent;
