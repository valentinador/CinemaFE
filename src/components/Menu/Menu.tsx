import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import MenuIcon from '@mui/icons-material/Menu';
import { ButtonBase, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MENU_ITEMS } from './constants';

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate(); // Hook per la navigazione

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (path: string) => {
    navigate(path); // Naviga alla pagina corrispondente
  };

  return (
    <div>
      <IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{p: 5}}>
        <MenuIcon />
      </IconButton>

  <Drawer variant="temporary" 
  ModalProps={{
    keepMounted: false,
  }} 
  open={open}
  onClose={handleDrawerToggle}>
        <List>
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.text}>
              <ButtonBase
                sx={{ width: '100%' }}
                onClick={() => handleMenuClick(item.path)} // Esegui la navigazione al percorso specifico
              >
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ textAlign: 'start' }} />
              </ButtonBase>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Menu;