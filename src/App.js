import './App.css';
import ContactPage from './pages/contact-page/contact-page.component';
import FoodOrderPage from './pages/food-order-page/food-order-page.component';
import GalleryPage from './pages/gallery-page/gallery-page.component';
import LoginPage from './pages/login-page/login-page.component';
import MainPage from './pages/main-page/main-page.component';
import Header from './components/header.component'

import { Route, Routes, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/menu" component={FoodOrderPage}/>
        <Route exact path="/gallery" component={GalleryPage}/>
        <Route exact path="/contact" component={ContactPage}/>
        <Route exact path="/login" component={LoginPage}/>
      </Routes>
    </div>
  );
}

export default App;
