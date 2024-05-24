import { Link } from 'react-router-dom'
import './nav.scss'
import Btn from '../../components/Btn/Btn';

export default function nav() {
  let currentUser = false
  let userID = false

  return (
    <nav data-js='nav'>
      <div id='js-nav-mobile' className='nav-mobile'>
        <ul className='nav-mobile__list nav-mobile--flex'>
          { currentUser ? (
            <>
              <li className='nav-mobile__item'>
                <Link className='nav-mobile__link' to='/home'>Home</Link>
              </li>
              <li className='nav-mobile__item'>
                <Link className='nav-mobile__link' to='/create-set'>Create Set</Link>
              </li>
              <li className='nav-mobile__item'>
                <Link className='nav-mobile__link' to='/profile/'>Profile</Link>
              </li>
              <li className='nav-mobile__item'>
                <Link className='nav-mobile__link' to='/logout'>Log Out</Link>
              </li>
            </>
          ) : (
            <>
              <li className='nav-mobile__item'>
                <Link className='nav-mobile__link' to='/'>Home</Link>
              </li>
              <li className='nav-mobile__item'>
                <Link className='nav-mobile__link' to='/register'>Sign Up</Link>
              </li>
              <li className='nav-mobile__item'>
                <Link className='nav-mobile__link' to='/login'>Log In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className='nav-desktop'>
        <ul className='nav-desktop__list nav-desktop--flex'>
          { currentUser ? (
            <>
              <li className='nav-desktop__item'>
                <Link to='/'>Home</Link>
              </li>
              <li className='nav-desktop__item'>
                <Link to='/create-set'>Create Set</Link>
              </li>
              {userID && (
                <li className='nav-desktop__item'>
                  <Link to={`/profile/${userID}`}>Profile</Link>
                </li>
              )}
              <li className='nav-desktop__item mr-0'>
                <Link to='/logout'>Log Out</Link>
              </li>
            </>
          ) : (
            <>
              <li className='nav-desktop__item'>
              <Link className='nav__list-link' to='/register'>Sign Up</Link>
              </li>
              <li className='nav-desktop__item mr-0'>
                <Btn
                  btnURL='/login'
                  btnClass='btn--primary p-3'
                >Login</Btn>
              </li>
            </>
          )}
        </ul>   
      </div>
    </nav>
  )
}       