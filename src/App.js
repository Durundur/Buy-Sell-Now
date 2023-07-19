import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar.js'
import CategoriesMainPage from './components/SelectCategory/CategoriesMainPage';
import PromotedAds from './components/PromotedAds'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Login';
import Register from './components/Register'
import Footer from './components/Footer';
import Ad from './pages/Ad';
import NewAd from './pages/NewAd';
import AdsList from './pages/AdsList';
import EditAd from './pages/EditAd';
import TestCom from './components/TestCom';
import { MyAccount, MyAds, MyRating, MySettings, MyShipments, ObservedAds, MyMessages } from './components/MyAccount';
import ProtectedRoute from './utils/ProtectedRoute'
import { AuthContextProvider } from './contexts';
import Chat from './components/MyAccount/Chat';
import ContainerBox from './components/ContainerBox';
import UserAds from './pages/UserAds'
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <NavBar />
              <Footer />
            </>}>
            <Route element={<SearchBar />}>
              <Route path='' element={
                <>
                  <CategoriesMainPage />
                  <PromotedAds />
                </>}></Route>
              <Route path='ogloszenie/:id' element={<Ad />}></Route>
              <Route path='ogloszenia' element={<AdsList />}></Route>
              <Route path='uzytkownik/:id' element={<UserAds />}></Route>
            </Route>
            <Route>
              <Route path='logowanie' element={<Login />}></Route>
              <Route path='rejestracja' element={<Register />}></Route>
              <Route path='nowe' element={<NewAd />}></Route>
              <Route path='edycja/:id' element={<EditAd />} />

              <Route path='moje-konto' element={
                <ProtectedRoute redirect="logowanie">
                  <MyAccount />
                </ProtectedRoute>}>
                <Route path='ogloszenia' element={<MyAds activeTab={0} />}></Route>
                <Route path='wiadomosci' element={<MyMessages activeTab={1} />}>
                  <Route path=":id" element={<Chat></Chat>}></Route>
                </Route>
                <Route path='oceny' element={<MyRating activeTab={2} />}></Route>
                <Route path='przesylki' element={<MyShipments activeTab={3} />}></Route>
                <Route path='ustawienia' element={<MySettings activeTab={4} />}></Route>
                <Route path='obserwowane' element={<ObservedAds activeTab={5} />}></Route>
              </Route>

            </Route>
            <Route path='test' element={<TestCom />}></Route>
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
