import './App.scss';
import ContactPage from './pages/contact-page/contact-page.component';
import FoodOrderPage from './pages/food-order-page/food-order-page.component';
import GalleryPage from './pages/gallery-page/gallery-page.component';
import LoginPage from './pages/login-page/login-page.component';
import MainPage from './pages/main-page/main-page.component';
import Navbar from './components/navbar/navbar'

import { auth } from './firebase/firebase.utils';
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from 'firebase/firestore';
import { createUserProfileDocument } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import setCurrentUser from './redux/user/user.action'

import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    //auth.onAuthStateChanged returns firebase.Unsubscribe method when completed and assigns it to unsubscribeFromAuth
    //listening to auth object changes - logging in or out

    //onAuthStateChanged is a firebase subscription method, which accepts the auth object (imported from firebase utils, which handles authenticating),
    //and a callback function which takes the user from the auth object, wheter there is user or not (has a value or has null as value)
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      //check if the userAuth is not null, so the user logged in
      if (userAuth) {
        //creating an user profile in the database, or selecting an existing one, and returning the reference object
        const userRef = await createUserProfileDocument(userAuth);

        //returns the snapshot object(the actual data from the database), and subscribing for changes
        onSnapshot(userRef, snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()           
          })
        })
      } else {
        setCurrentUser(null);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/menu" element={<FoodOrderPage />}/>
          <Route path="/gallery" element={<GalleryPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route 
            exact path='/login' 
            element = {this.props.currentUser ? <Navigate to='/'/> : <LoginPage />} 
            />
        </Routes>
      </div>
    );
  }
}

const dispatchStateToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, dispatchStateToProps)(App);