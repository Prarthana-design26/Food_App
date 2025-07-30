
import { useState } from 'react'
// import './App.css';
import NavBar  from './components/navbar/NavBar';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import  Cart  from './pages/Cart/Cart';
import { Placeorder } from './pages/Placeorder/Placeorder';
import Footer from './components/Footer/Footer';
import AppDownload from './components/AppDownload/AppDownload';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import Verify from './pages/Verify/verify';
import MyOrders from './pages/MyOrders/MyOrders';

function App() {
 
  const [showLogin ,setshowLogin] =useState(false);

  return (
    <>
    {showLogin?<LoginPopUp setshowLogin={setshowLogin} />:<></>}
    <NavBar setshowLogin={setshowLogin} />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/order' element={<Placeorder />}></Route>
      <Route path='/verify' element={<Verify />}></Route>
      <Route path='/myorders' element={<MyOrders />}></Route>
    </Routes>
    <AppDownload/>  
    <Footer />
    </>
  )
}

export default App
