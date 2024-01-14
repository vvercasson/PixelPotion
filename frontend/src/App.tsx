import './App.css'
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { CocktailDetailPage } from './pages/CocktailDetailPage';
import { FavoriteDisplayPage } from './pages/FavoriteDisplayPage';
import { CocktailCreationPage } from './pages/CocktailCreationPage';
import { UsersCocktails } from './pages/UsersCocktails';
import { CustomCocktailDetail } from './pages/CustomCocktailDetail';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<ProtectedRoute component={HomePage} />} />
            <Route path='/search' element={<ProtectedRoute component={SearchPage} />} />
            <Route path='/favorites' element={<ProtectedRoute component={FavoriteDisplayPage} />} />
            <Route path='/creation' element={<ProtectedRoute component={CocktailCreationPage} />} />
            <Route path='/cocktail/:cocktailId' element={<ProtectedRoute component={CocktailDetailPage} />} />
            <Route path='/usersCocktails' element={<ProtectedRoute component={UsersCocktails} />} />
            <Route path='/customCocktail/:cocktailId' element={<ProtectedRoute component={CustomCocktailDetail} />} />
            <Route path='*' element={<LoginPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
