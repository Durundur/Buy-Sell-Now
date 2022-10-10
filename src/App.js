import React from 'react';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar.js'
import Categories from './components/Categories/Categories';
import PromotedAds from './components/PromotedAds/PromotedAds'
function App() {
  return (
    <>
        <NavBar/>
        <SearchBar/>
        <Categories/>
        <PromotedAds></PromotedAds>
    </>

  );
}

export default App;
