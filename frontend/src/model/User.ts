export interface User {
    id: string;
    username: string;
    cocktailFavoritesId: string[];
}

export const createTestUser = () => {
    const user: User = {
        id: '1',
        username: 'test',
        cocktailFavoritesId: [],
    }

    return user;
}

export const createUser = (id: string, username: string) => {
    const user: User = {
        id: id,
        username: username,
        cocktailFavoritesId: [],
    }
    return user;
}