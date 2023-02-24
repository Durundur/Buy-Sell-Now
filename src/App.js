import React from 'react';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar.js'
import Categories from './components/Categories/Categories';
import PromotedAds from './components/PromotedAds/PromotedAds'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import Footer from './components/Footer';
function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={[<NavBar/>, <Footer/>]}>
            <Route path='' element={[<SearchBar/>,<Categories/>,<PromotedAds/>]}></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path='register' element={<Register/>}></Route>
          </Route>
      </Routes>
    </Router>
  );
}
 
export default App;
