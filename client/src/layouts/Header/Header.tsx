import { Link } from 'react-router-dom';
import './Header.scss';
import Nav from '../Nav/Nav'; 
import MobileMenuBtn from '../../components/MobileMenuBtn/MobileMenuBtn';

export default function Header() {
  let currentUser = false;

  return (
    <header className='header fixed top-0 left-0 w-full z-[500] h-[70px] bg-white'>
      <div className='header__container container mx-auto h-full flex justify-center items-center relative md:justify-between'>
        <h1 className='header__site-title m-0 md:w-[180px]'>
          { currentUser ? (
            <Link className='header_site-title-link text-dark-shade' to='/'>FlashCard</Link>
          ) : (
            <Link className='header_site-title-link text-dark-shade' to='/home'>FlashCard</Link>
          )}
        </h1>
        <MobileMenuBtn />
        <Nav />
      </div>
    </header>
  )
}