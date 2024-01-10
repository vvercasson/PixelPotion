import { User } from '../../model/User';

const API_URL = 'http://localhost:3001/api/users/';

interface ApiUserResponse {
    users: User[];
}

// Map the API response to the application state
const mapUser = (data: ApiUserResponse) => {
    const relevantData = data.users.map(user => ({
        id: user.id,
        username: user.username,
        password: user.password,
        cocktailFavoritesId: []
    }));

    return relevantData;;
}

// Post an user in the DB
export const postUser = async (username: string, password: string): Promise<User | null> => {
    console.log('createUser');
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error('Error creating user');

    const data = await response.json();

    if (data && data.user && data.user.id) {
        console.log('User created successfully');
        return data.user;
    } else {
        console.log('User creation unsuccessful');
        return null;
    }
}

// Get an user from the DB
export const fetchUser = async (username: string, password: string): Promise<User | null> => {
    try {
        const response = await fetch(API_URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        if (data && data.user) {
            console.log('User found');
            return data.user;
        } else {
            console.log('No user found');
            return null
        }
    } catch (error) {
        console.error('Error during login:', error);
        return null;
    }
};

// Get an user's favorites from the DB
export const fetchUserFavorites = async (userId: number): Promise<number[]> => {
    try {
        const response = await fetch(API_URL + 'favorites?userId=' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch favorites');
        }

        const data = await response.json();
        if (data && data.favorites) {
            // only return ids
            const favorites = data.favorites.map((favorite: any) => favorite.cocktailId);
            return favorites
        } else {
            console.log('No favorites found');
            return [];
        }
    } catch (error) {
        console.error('Error during fetching favorites:', error);
        return [];
    }
};


// Add a favorite to an user
export const addFavorite = async (userId: number, cocktailId: number): Promise<boolean> => {
    try {

        const response = await fetch(API_URL + 'favorites/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, cocktailId }),
        });

        if (!response.ok) {
            throw new Error('Error adding favorite');
        }

        const data = await response.json();
        if (data) {
            console.log(data)
            console.log('Favorite added');
            return true;
        } else {
            console.log('Favorite not added');
            return false;
        }
    } catch (error) {
        console.error('Error during adding favorite:', error);
        return false;
    }
};

// Remove a favorite from an user
export const removeFavorite = async (userId: number, cocktailId: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}favorites/remove?userId=${userId}&cocktailId=${cocktailId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
            // No body for DELETE request
        });

        if (!response.ok) {
            throw new Error('Error removing favorite');
        }

        const data = await response.json();
        if (data && data.message === 'Favorite deleted successfully') {
            console.log('Favorite removed');
            return true;
        } else {
            console.log('Favorite not removed');
            return false;
        }
    } catch (error) {
        console.error('Error during removing favorite:', error);
        return false;
    }
};
