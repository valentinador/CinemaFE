
export interface ILogin{
    email:string,
    password:string
}

export interface IUserLoggedIn{
    name:string,
    surname:string,
    email: string,
    role:'user'| 'publisher'| '',
    password?: string,
    createdAt:Date | null
}