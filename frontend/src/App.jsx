import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<div className="text-white text-center mt-20 text-2xl">Home Coming Soon...</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  );
};

export default App;