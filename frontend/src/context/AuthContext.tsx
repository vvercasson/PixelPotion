import React, { useState, createContext, ReactNode } from 'react';
import { User } from '../model/User';
import { fetchUserFavorites } from '../services/api/usersAPI';

type AuthContextType = {
  user: User | null;
  signIn: (newUser: User, callback: () => void) => void;
  signOut: (callback: () => void) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => { },
  signOut: () => { }
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (newUser: User, callback: () => void) => {
    setUser(newUser);
    try {
      const favorites = await fetchUserFavorites(Number(newUser.id));
      newUser.cocktailFavoritesId = favorites.map(String);
      setUser(newUser);
      console.log(newUser);

    } catch (error) {

    }
    callback();
  };

  const signOut = (callback: () => void) => {
    setUser(null);
    callback();
  };

  const value = { user, signIn, signOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
