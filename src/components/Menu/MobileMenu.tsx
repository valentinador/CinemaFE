import {
  Drawer,
  IconButton,
  List
} from "@mui/material";
import { MENU_ITEMS } from "./constants";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IUserLoggedIn } from "../../types/ILogin";
import MenuButton from "./MenuButton";

interface IMobileMenu {
  handleMenuClick: (path: string) => void;
      data: IUserLoggedIn;
}

const MobileMenu = ({ handleMenuClick, data }: IMobileMenu) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      <IconButton
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ p: 5 }}
      >
        <MenuIcon />
      </IconButton>
      {}
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: false,
        }}
        open={open}
        onClose={handleDrawerToggle}
      >
        <List>
          {MENU_ITEMS.map((item) => (
             <MenuButton key={item.id} handleMenuClick={()=>handleMenuClick(item.path)} label={item.text} icon={item.icon} /> 
          ))}
            {data.name.length>0 ?  <MenuButton handleMenuClick={()=>handleMenuClick('')} label='Logout' /> :  <MenuButton handleMenuClick={()=>handleMenuClick('/login')} label='Login' />}

        </List>
      </Drawer>
    </>
  );
};


export default MobileMenu;