export interface User {
    id: string;
    username: string;
}

export const createTestUser = () => {
    const user: User = {
        id: '1',
        username: 'test'
    }

    return user;
} 

export const createUser = (id: string, username: string) => {
    const user: User = {
        id: id,
        username: username
    }
    return user;
}