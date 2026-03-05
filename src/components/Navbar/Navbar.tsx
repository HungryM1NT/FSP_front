import { useNavigate  } from "react-router-dom";
import logo from '../../assets/home.svg';
import './Navbar.css';
import Button from '../Button/Button';



function Navbar() {
    const navigate = useNavigate();
    return (
    <nav className='navbar'>
        <div className='navbar_left'>
            <div className='navbar_home' onClick={() => {navigate("/")}}>
                <img src={logo} className="logo" alt="logo" />
            </div>
            <Button
                name={"Upload"} onclick={() => {console.log(typeof(NaN))}}
            />
            <Button
                name={"Files"} onclick={() => {navigate("/explorer")}}
            />
        </div>
        <div className='navbar_right'>
            <span className='username'>Ilya Ablyazov</span>
            <Button
                name={"Log out"} onclick={() => {navigate("/Auth")}}
            />
        </div>
    </nav>
  );
};

export default Navbar;