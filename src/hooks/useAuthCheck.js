import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
      navigate('/clientPage'); // Redirigir a clientPage si el token existe
    } else {
      setIsAuthenticated(false);
      navigate('/'); // Redirigir a la página de inicio de sesión si el token no existe
    }
  }, [navigate]);

  return isAuthenticated;
};

export default useAuthCheck;
