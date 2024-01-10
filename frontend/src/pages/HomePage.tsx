import React, { useEffect, useState } from 'react';
import { CustomAppBar } from '../components/AppBarComponents/CustomAppBar';
import { fetchRandomCocktails } from '../services/api/cocktailAPI';
import { Cocktail } from '../model/Cocktail';
import { CocktailThumbnail } from '../components/CocktailComponents/CocktailThumbnail';
import './HomePage.css';
import { ColorHintsComp } from '../components/HomePageComponents/ColorHintsComp';

const HomePage: React.FC = () => {

  const WELCOME_TEXT: string = 'Welcome to Pixel Potion!';

  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  const loadRandomCocktails = async (amount: number) => {
    try {
      const randomCocktails = await fetchRandomCocktails(amount);
      setCocktails(randomCocktails);
    } catch (error) {
      console.error("Failed to fetch cocktails:", error);
    }
  };

  useEffect(() => {
    loadRandomCocktails(3);
  }, []);

  return (
    <div className='homepage-main-container'>
      <CustomAppBar />
      <h1 className='welcome-text'>{WELCOME_TEXT}</h1>
      <ColorHintsComp />
      <div className="random-reco-container">
        <h3 className="random-cocktail-text">Random recommandations</h3>
        <div className='random-cocktail-list'>
          {cocktails.map((cocktail, index) => (
            <CocktailThumbnail key={index} cocktail={cocktail} />
          ))}
        </div>
        <button className="refresh-btn" onClick={() => {
          loadRandomCocktails(3);
        }}>Refresh</button>
      </div>
    </div>
  );
};

export default HomePage;
