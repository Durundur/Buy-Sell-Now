import React from 'react';
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
import UploadGrid from './components/Uploader/UploadGrid';
import AdsList from './pages/AdsList';
function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={[<NavBar/>, <SearchBar/>, <Footer/>]}>
            <Route path='' element={[<CategoriesMainPage/>,<PromotedAds/>]}></Route>
            <Route path='logowanie' element={<Login/>}></Route>
            <Route path='rejestracja' element={<Register/>}></Route>
            <Route path='ogloszenie/:id' element={<Ad/>}></Route>
            <Route path='nowe' element={<NewAd/>}></Route>
            <Route path='ogloszenia' element={<AdsList/>}></Route>
          </Route>
          <Route path='test' element={<UploadGrid/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
