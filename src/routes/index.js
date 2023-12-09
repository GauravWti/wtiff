

// // routes
// import MainRoutes from './MainRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';

// // ==============================|| ROUTING RENDER ||============================== //

// export default function ThemeRoutes() {
//   return useRoutes([MainRoutes, AuthenticationRoutes]);
// }


import { useState, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Cookies from 'js-cookie';

export default function ThemeRoutes() {
  const [redirected, setRedirected] = useState(false);
  const isAuthenticated = !!Cookies.get('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!isAuthenticated && !redirected) {
      navigate('/login');
      setRedirected(true); 
    }
  }, [isAuthenticated, redirected, navigate]);


  const routes = isAuthenticated ? [MainRoutes] : [AuthenticationRoutes];

  
  return useRoutes(routes);
}

