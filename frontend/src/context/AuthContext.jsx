import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['x-auth-token'] = token;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get('/api/users/profile');
      setUser(res.data);
    } catch (err) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['x-auth-token'];
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    const { token } = res.data;
    localStorage.setItem('token', token);
    api.defaults.headers.common['x-auth-token'] = token;
    await fetchUser();
  };

  const register = async (name, email, password, role, studentClass) => {
    const res = await api.post('/api/auth/register', { name, email, password, role, class: role === 'student' ? studentClass : undefined });
    const { token } = res.data;
    localStorage.setItem('token', token);
    api.defaults.headers.common['x-auth-token'] = token;
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};