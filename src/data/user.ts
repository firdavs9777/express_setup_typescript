import bcrypt from 'bcryptjs';

export interface UserType {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    user?: string 
  }
  export const users: UserType[] = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password:bcrypt.hashSync('admin123', 10),
        isAdmin:true
    },
    {
        name: 'Test User',
        email: 'test@gmail.com',
        password:bcrypt.hashSync('test123', 10),
        isAdmin:true
    },
    {
        name: 'Test User2',
        email: 'test2@gmail.com',
        password:bcrypt.hashSync('test123',10),
        isAdmin:false
    },
    {
        name: 'Test User3',
        email: 'test3@gmail.com',
        password:bcrypt.hashSync('test123',10),
        isAdmin:false
    },
    {
        name: 'Test User4',
        email: 'test4@gmail.com',
        password:bcrypt.hashSync('test123'),
        isAdmin:false
    },
  ];
  