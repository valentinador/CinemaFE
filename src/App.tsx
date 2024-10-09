import { Outlet } from 'react-router-dom';
import Menu from './components/Menu/Menu';


function App() {

  return (
      <>
      <Menu />
      <Outlet />
    </>
    );
}

export default App;
