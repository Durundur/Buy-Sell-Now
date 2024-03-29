import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/Searchbar/SearchBar'
import CategoriesMainPage from './components/Layout/CategoriesMainPage';
import PromotedAds from './components/Layout/PromotedAds'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import Footer from './components/Layout/Footer';
import Ad from './pages/Ad';
import NewAd from './pages/NewAd';
import AdsList from './pages/AdsList';
import EditAd from './pages/EditAd';
import { MyAccount, MyAds, MyRating, MySettings, MyShipments, ObservedAds, MyMessages, Chat } from './components/MyAccount';
import ProtectedRoute from './components/Layout/ProtectedRoute'
import { AuthContextProvider } from './contexts';
import User from './components/UserPage/User';
import UserAds from './components/UserPage/UserAds';
import UserContact from './components/UserPage/UserContact';
import UserInfo from './components/UserPage/UserInfo';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<><NavBar /><Footer /></>}>
            <Route element={<SearchBar />}>
              <Route path='' element={<><CategoriesMainPage /><PromotedAds /></>}></Route>
              <Route path='ogloszenie/:id' element={<Ad />}></Route>
              <Route path='ogloszenia' element={<AdsList />}>
                <Route path=':mainCatParam' element={<></>}></Route>
                <Route path=':mainCatParam/:subCatParam' element={<></>}></Route>
                <Route path=':mainCatParam/:subCatParam/:subSubCatParam' element={<></>}></Route>
              </Route>
            </Route>
            <Route path='uzytkownik/:id' element={<User />}>
              <Route path='' element={<UserAds activeTab={0} />}></Route>
              <Route path='informacje' element={<UserInfo activeTab={1} />}></Route>
              <Route path='kontakt' element={<UserContact activeTab={2} />}></Route>
              <Route path=':mainCatParam' element={<UserAds activeTab={0} />}></Route>
              <Route path=':mainCatParam/:subCatParam' element={<UserAds activeTab={0} />}></Route>
              <Route path=':mainCatParam/:subCatParam/:subSubCatParam' element={<UserAds activeTab={0} />}></Route>
            </Route>
            <Route>
              <Route path='logowanie' element={<Login />}></Route>
              <Route path='rejestracja' element={<Register />}></Route>
              <Route path='nowe' element={<ProtectedRoute><NewAd /></ProtectedRoute>}></Route>
              <Route path='edycja/:id' element={<ProtectedRoute><EditAd /></ProtectedRoute>} />

              <Route path='moje-konto' element={
                <ProtectedRoute>
                  <MyAccount />
                </ProtectedRoute>}>
                <Route path='ogloszenia' element={<MyAds activeTab={0} />}></Route>
                <Route path='wiadomosci' element={<MyMessages activeTab={1} />}>
                  <Route path=":id" element={<Chat />}></Route>
                </Route>
                <Route path='oceny' element={<MyRating activeTab={2} />}></Route>
                <Route path='przesylki' element={<MyShipments activeTab={3} />}></Route>
                <Route path='ustawienia' element={<MySettings activeTab={4} />}></Route>
                <Route path='obserwowane' element={<ObservedAds activeTab={5} />}></Route>
              </Route>

            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider >
  );
}

export default App;
