// src/routes/PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/user'); // Laravel responde com usuário autenticado
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-center p-4">Carregando...</div>;

  return authenticated ? element : <Navigate to="/login" replace />;
};
