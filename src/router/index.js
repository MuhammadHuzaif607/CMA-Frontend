import React from 'react';
import defaultRoutes from './routes';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/ui/layout';

const AppRouter = () => {
  const { publicRoutes, protectedRoutes } = defaultRoutes;
  const publicPagesRoutes = publicRoutes.map((data) => {
    <Route key={data.path} path={data.path} element={data.component} />;
  });

  const protectedPagesRoutes = protectedRoutes.map((data) => {
    <Route key={data.path} path={data.path} element={data.component} />;
  });
  return (
    <Routes>
      <Route path="/" element={<Layout/>}></Route>
    </Routes>
  );
};

export default AppRouter;
