import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { BreakpointContext } from "../../App";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { useSelector } from "react-redux";
import { selectLogin } from "../../slices/logSlice";

const Menu = () => {
  const navigate = useNavigate(); // Hook per la navigazione
  const {data} = useSelector(selectLogin);



  const handleMenuClick = (path: string) => {
    navigate(path); // Naviga alla pagina corrispondente
  };

  const isMobileOrTablet = useContext(BreakpointContext);
  
  return (
    <div>
     {isMobileOrTablet ? <MobileMenu handleMenuClick={handleMenuClick} data={data}/> : <DesktopMenu handleMenuClick={handleMenuClick} data={data}/>}
    </div>
  );
};

export default Menu;
