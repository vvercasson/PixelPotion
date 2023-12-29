import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User } from '../model/User';
import { CustomAppBar } from '../components/AppBarComponents/CustomAppBar';

const WELCOME_TEXT:string = 'Welcome to Pixel Potion!';

const HomePage: React.FC = () => {
  const auth = useContext(AuthContext);

  const [welcomeText, setWelcomeText] = React.useState<string>(WELCOME_TEXT);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  useEffect(() => {
    setCurrentUser(auth?.user);
  }, [auth]);

  return (
    <div>
        <CustomAppBar />
        <h1 className='welcome-text'>{welcomeText}</h1> 
        <div className='random-cocktail-list'>
          <h2>Random Cocktail List</h2>
        </div>
    </div>
  );
};

export default HomePage;
