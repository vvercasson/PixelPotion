import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User } from '../model/User';
import { CustomAppBar } from '../components/AppBarComponents/CustomAppBar';
import { fetchRandomCocktails } from '../services/api/cocktailAPI';
import { Cocktail } from '../model/Cocktail';
import { CocktailThumbnail } from '../components/CocktailComponents/CocktailThumbnail';
import './HomePage.css';

const HomePage: React.FC = () => {
  const WELCOME_TEXT: string = 'Welcome to Pixel Potion!';
  const auth = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    setCurrentUser(auth?.user);
  }, [auth]);

  useEffect(() => {
    const loadRandomCocktails = async () => {
      try {
        const randomCocktails = await fetchRandomCocktails(2);
        setCocktails(randomCocktails);
      } catch (error) {
        console.error("Failed to fetch cocktails:", error);
      }
    };
    loadRandomCocktails();
  }, []);

  return (
    <div>
      <CustomAppBar />
      <h1 className='welcome-text'>{WELCOME_TEXT}</h1>
      <div className='random-cocktail-list'>
        {cocktails.map((cocktail, index) => (
          <CocktailThumbnail key={index} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
