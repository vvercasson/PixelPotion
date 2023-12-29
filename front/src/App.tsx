import './App.css'
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedPage';
import { LoginPage } from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<ProtectedRoute component={HomePage} />}/>
            <Route path='/search' element={<ProtectedRoute component={SearchPage} />}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='*' element={<LoginPage/>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
