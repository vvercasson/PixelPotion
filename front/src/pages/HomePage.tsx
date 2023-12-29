import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User } from '../model/User';

const HomePage: React.FC = () => {
  const auth = useContext(AuthContext);

  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  useEffect(() => {
    console.log(auth?.user?.username);
    setCurrentUser(auth?.user);
  }, [auth]);
  return (
    <div>
        <h1>Hello {currentUser?.username}</h1> 
    </div>
  );
};

export default HomePage;
