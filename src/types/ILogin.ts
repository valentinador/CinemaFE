

export interface IUserLoggedIn{
    name:string,
    surname:string,
    email: string,
    role:'user'| 'publisher'| '',
    password?: string,
    createdAt:Date | null
}

export interface IToken{
    success: boolean,
    token:string
}

export interface IStateUserLoggedIn{
    data:IUserLoggedIn
}