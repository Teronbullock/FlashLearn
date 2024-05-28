import { Route, Routes } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import Index  from './routes/Index';
import Register from './routes/Register';
import Login from './routes/Login';
// import Dashboard from './routes/Dashboard';
// import Card from './routes/Card';
// import Cards from './routes/Cards';
// import CreateSet from './routes/CreateSet';
// import Set from './routes/Set';


import './App.scss';

export default function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/*<Route path='/dashboard' element={<Dashboard />} />
        <Route path='/card' element={<Card />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/create-set' element={<CreateSet />} />
        <Route path='/set' element={<Set />} /> */}
      </Routes>
      <Footer />
    </>
  )
}