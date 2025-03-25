import { Login } from "@mui/icons-material";
import {
  ButtonBase,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface IMenuButton {
  handleMenuClick: (path: string) => void;
  label: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
}
}
const MenuButton = ({ handleMenuClick, label, icon: Icon }: IMenuButton) => {

  return (
    <ListItem>
      <ButtonBase
        sx={{ width: "100%" }}
        onClick={ ()=>handleMenuClick(label)} // Esegui la navigazione al percorso specifico
      >
        <ListItemIcon>
        {Icon ? <Icon fontSize="small" /> : <Login fontSize="small" />}
        </ListItemIcon>
        <ListItemText primary={label} sx={{ textAlign: "start" }} />
      </ButtonBase>
    </ListItem>
  );
};

export default MenuButton;
