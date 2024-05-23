import { Route, Routes } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import Home  from './routes/Home/Home';
import './App.scss';

export default function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route />
      </Routes>
      <Footer />
    </>
  )
}