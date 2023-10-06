import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './containers/Layout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import url from './helpers/urldata';
import Login from './pages/Login';
import Register from './pages/Register';
import Protected from './containers/Protected';
import { AuthContextProvider } from './context/AuthContext';
import { DarkLightThemeProvider } from './context/DarkLightContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DarkLightThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path={url.home.value} element={<Layout />}>
                <Route index element={<Home />} />

                {/* Guest only routes */}
                <Route element={<Protected role="unauth" />}>
                  <Route path={url.login.value} element={<Login />} />
                  <Route path={url.register.value} element={<Register />} />
                </Route>

                <Route element={<Protected role='auth' />}>
                  <Route path='/authed' element={<div>You are authenticated</div>} />
                </Route>

                {/* Below is a 404 Catcher */}
                <Route path='*' element={<Page404 />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DarkLightThemeProvider>
        <ReactQueryDevtools />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
