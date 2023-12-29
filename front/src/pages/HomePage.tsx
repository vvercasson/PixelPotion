import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User } from '../model/User';
import { CustomAppBar } from '../components/AppBar/CustomAppBar';

const HomePage: React.FC = () => {
  const auth = useContext(AuthContext);

  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  useEffect(() => {
    setCurrentUser(auth?.user);
  }, [auth]);

  return (
    <div>
        <CustomAppBar />
        <h1>Hello {currentUser?.username}</h1> 
    </div>
  );
};

export default HomePage;
