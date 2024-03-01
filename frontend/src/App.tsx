import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './ProjectManagement/Components/Forms/Signup';
import HomePage from './ProjectManagement/Components/HomePage';
import Login from './ProjectManagement/Components/Forms/Login';
import User from './ProjectManagement/Components/User';
import Reviewer from './ProjectManagement/Components/Reiewer';
import Profile from './ProjectManagement/Components/Forms/Profile';
import { AuthProvider } from './ProjectManagement/Context/authContext';
import { Welcome } from './ProjectManagement/Components/Welcome';
import { About } from './ProjectManagement/Components/About';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/user" element={<User />} />
          <Route path="/reviewer" element={<Reviewer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<>Error Page</>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
