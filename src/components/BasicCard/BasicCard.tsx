import { Card, CardContent, Typography, CardActions, Button } from "@mui/material"
import { IFilm } from "../../types/IFilm";

type TBasicCard = Partial<IFilm>;
const BasicCard = ({title, description}: TBasicCard)=>{
    return(
    <>
    <Card sx={{ maxWidth: 345, margin: '20px auto' }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description || "---"}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={()=>alert('coming soon')}>Personaggi</Button>
      <Button size="small" onClick={()=>alert('coming soon')}>Informazioni</Button>
    </CardActions>
  </Card>
  </>
    )
}

export default BasicCard;