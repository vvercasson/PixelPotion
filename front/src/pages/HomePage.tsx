import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User } from '../model/User';
import { CustomAppBar } from '../components/AppBarComponents/CustomAppBar';
import { fetchRandomCocktails } from '../services/api/cocktailAPI';
import { Cocktail } from '../model/Cocktail';
const WELCOME_TEXT:string = 'Welcome to Pixel Potion!';

const HomePage: React.FC = () => {
  const auth = useContext(AuthContext);

  const [welcomeText, setWelcomeText] = useState<string>(WELCOME_TEXT);
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
        <h1 className='welcome-text'>{welcomeText}</h1> 
        <div className='random-cocktail-list'>
          {cocktails.map((cocktail, index) => (
            <div className='random-cocktail' key={index}>
              <p>{cocktail.strDrink}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default HomePage;
