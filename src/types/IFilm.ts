export interface IFilm{
    title: string,
    year: number,
    directorName:string,
    directorSurname:string,
    slug: string, 
    description?: string,
    averageRating?: number,
    photo?: string
}