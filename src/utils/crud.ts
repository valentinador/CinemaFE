import { IFilm } from "../types/IFilm";
import { IUser } from "../types/IUser";

export const getItems = async(url:string, params?: RequestInit)=>{
        try {
          const response = await fetch(url, {
            ...params,
          }); 
          if (!response.ok) {
            throw new Error(`Errore nella fetch: ${response.status}`);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Errore:', error);
          return null;
        }
      
}


export const postItem = async (url:string, data:IFilm | Partial<IUser>) => {
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
      });

      if (!response.ok) {
          throw new Error(`Errore nella richiesta POST: ${response.status}`);
      }

      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Errore:', error);
      return null;
  }
};

