import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { MENU_ITEMS } from "./constants";
import { ButtonBase } from '@mui/material';
import { IUserLoggedIn } from '../../types/ILogin';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import MenuButton from './MenuButton';
import { getItems } from '../../utils/crud';
import { getUserInfoByStorage } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { logout } from '../../slices/logSlice';

interface IDesktopMenu {
    handleMenuClick: (path: string) => void;
    data: IUserLoggedIn;
  }


const DesktopMenu =({ handleMenuClick }: IDesktopMenu) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async ()=>{
      try {
          await getItems(`${process.env.REACT_APP_API_URL}/auth/logout`)
            .then(()=>{
                dispatch(logout())
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
  }



  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {MENU_ITEMS.map(({id, text, path})=> <ButtonBase key={id} sx={{ minWidth: 100 }} onClick={() => handleMenuClick(path)} // Esegui la navigazione al percorso specifico
        >{text}</ButtonBase>)}
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {getUserInfoByStorage().name.length>0 ? <Avatar sx={{ width: 36, height: 36 }}>{getUserInfoByStorage().name.charAt(0)}{getUserInfoByStorage().surname.charAt(0)}</Avatar> : <Avatar sx={{ width: 32, height: 32 }}> 
                              <TagFacesIcon />
                            </Avatar>}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {getUserInfoByStorage().name.length>0 ? <MenuButton handleMenuClick={()=>handleLogout()} label='Logout' /> :  <MenuButton handleMenuClick={()=>handleMenuClick('/login')} label='Login' />}
      </Menu>
    </>
  );
}


export default DesktopMenu;