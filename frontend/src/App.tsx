import './App.css'
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedPage';
import { LoginPage } from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { CocktailDetailPage } from './pages/CocktailDetailPage';
import { FavoriteDisplayPage } from './pages/FavoriteDisplayPage';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<ProtectedRoute component={HomePage} />} />
            <Route path='/search' element={<ProtectedRoute component={SearchPage} />} />
            <Route path='/favorites' element={<ProtectedRoute component={FavoriteDisplayPage} />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/cocktail/:cocktailId' element={<ProtectedRoute component={CocktailDetailPage} />} />
            <Route path='*' element={<LoginPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
