import { useEffect, useState } from "react";
import { getItems } from "../../utils/crud";
import { IFilm } from "../../types/IFilm";
import BasicCard from "../../components/BasicCard/BasicCard";

const FilmsList = ()=>{
    const [films, setFilms] = useState<IFilm[]>([]);
    
    useEffect(() => {
        const fetchFilms = async () => {
          await getItems(`${process.env.REACT_APP_API_URL}/film`).then(result => {
            if(result) setFilms(result.data);
        }).catch(error => {
            console.error(error);
        });
        };
    
        fetchFilms();
      },[]);
    return(
        <>
        {films && films.map((film)=><div key={film.title}><BasicCard title={film.title} description={film.description} /></div>)}
        </>
    )
}


export default FilmsList;