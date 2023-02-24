import React from 'react';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar.js'
import Categories from './components/Categories';
import PromotedAds from './components/PromotedAds'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Login';
import Register from './components/Register'
import Footer from './components/Footer';
import Ad from './pages/Ad';
function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={[<NavBar/>, <SearchBar/>, <Footer/>]}>
            <Route path='' element={[<Categories/>,<PromotedAds/>]}></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path='register' element={<Register/>}></Route>
            <Route path='ogloszenie/:id' element={<Ad/>}></Route>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
