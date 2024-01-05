import { User } from '../../model/User';

const API_URL = 'http://localhost:3001/api/users/';

interface ApiUserResponse {
    users: User[];
}

const mapUser = (data: ApiUserResponse) => {
    const relevantData = data.users.map(user => ({
        id: user.id,
        username: user.username
    }));

    return relevantData;
}

export const createUser = async (username: string,) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    if (!response.ok) throw new Error('Error creating user');

    const data: ApiUserResponse = await response.json();

    if (data && data.users && data.users.length > 0) {
        const relevantData = mapUser(data);
        return relevantData;
    }
}