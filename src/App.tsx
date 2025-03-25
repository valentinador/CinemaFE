import { Outlet } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
export const BreakpointContext = createContext<boolean>(false);

function App() {
  const theme = useTheme();
  const [breakpointState, setBreakpointState] = useState<boolean>(false);
  // Controlla se siamo su dispositivo mobile o tablet
  const isMobileOrTablet:boolean = useMediaQuery(theme.breakpoints.down('md'));
  
  useEffect(()=>{
    setBreakpointState(isMobileOrTablet)
  },[isMobileOrTablet])

  return (
      <BreakpointContext.Provider value={breakpointState}>
      <Menu />
      <Outlet />
    </BreakpointContext.Provider>
    );
}

export default App;
