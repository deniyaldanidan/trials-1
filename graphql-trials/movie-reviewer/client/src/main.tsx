import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './containers/Layout.tsx';
import MovieInfo from './pages/MovieInfo.tsx';
import AuthContextProvider from './context/AuthContext.tsx';
import AdminDashBoard from './containers/AdminDashBoard.tsx';
import ManageMovies from './pages/ManageMovies.tsx';
import ManageCelebs from './pages/ManageCelebs.tsx';
import CustApolloProvider from './containers/CustApolloProvider.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CustApolloProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/movie/:movieId' element={<MovieInfo />} />
              {/* Celeb Page Comes Here */}
              {/* User Pages Comes Here */}
              {/* Admin Pages Comes Here */}
              <Route path='/admin' element={<AdminDashBoard />}>
                <Route index element={<Navigate to="/admin/manage-movies" replace />} />
                <Route path='manage-movies' element={<ManageMovies />} />
                <Route path='manage-celebs' element={<ManageCelebs />} />
              </Route>

              <Route path='*' element={<h1 className="text-center text-4xl mt-7 font-serif font-normal text-red-600">404 Requested page not found</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CustApolloProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
