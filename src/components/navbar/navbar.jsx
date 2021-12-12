import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './logo.svg';
import { connect } from 'react-redux';
import { toggleNavbarLinksHidden } from '../../redux/navbar/navbar.actions';
import { auth } from '../../firebase/firebase.utils'
import './navbar.styles.scss';

function useWindowSize() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
        setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const Navbar = ({ hidden, toggleNavBarLinks, user }) => {
    const width = useWindowSize();
    return (
        <nav className="navbar">
            <Link className="home" to="/">
                <Logo />
            </Link>
            <div className="toggle-button" onClick={()=> { 
                toggleNavBarLinks();
            } }>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            { width > 630 || width <= 630 && !hidden ?
                <ul className="link-container" >
                    <Link className="menu link" to="/menu">
                        <li>Étlap</li>
                    </Link>
                    <Link className="gallery link" to="/gallery">
                        <li>Galéria</li>
                    </Link>
                    <Link className="contact link" to="/contact">
                        <li>Kapcsolat</li>
                    </Link>
                    {
                        user ?
                        <div className='login link' onClick={()=> auth.signOut()}>Kijelentkezés</div>
                        :
                        <Link className='login link' to='/login'><li>Bejelentkezés</li></Link>
                    }
                </ul>
                :null
            }
 

        </nav>
    )
}




const mapStateToProps = (state) => ({
    hidden: state.navbar.hidden,
    user: state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    toggleNavBarLinks: ()=> dispatch(toggleNavbarLinksHidden()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);