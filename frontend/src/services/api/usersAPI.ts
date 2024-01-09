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
export const postUser = async (user: User) => {
    console.log('createUser');
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) throw new Error('Error creating user');

    const data: ApiUserResponse = await response.json();

    if (data && data.users && data.users.length > 0) {
        const relevantData = mapUser(data);
        return relevantData;
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
