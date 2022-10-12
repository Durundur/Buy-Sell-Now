import React from 'react';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar.js'
import Categories from './components/Categories/Categories';
import PromotedAds from './components/PromotedAds/PromotedAds'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={[<NavBar/>]}>
            <Route path='' element={[<SearchBar/>,<Categories/>,<PromotedAds/>]}></Route>
            <Route path='aa' element={<Categories/>}></Route>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
