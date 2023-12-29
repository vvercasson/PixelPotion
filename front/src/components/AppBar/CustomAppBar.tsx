import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './CustomAppBar.css';
import Logo from '../../assets/pixel-potion-logo.png'

interface AppBarRoute {
    path: string;
    name: string;
    onRouteClicked?: () => void;
}

export const CustomAppBar: React.FC = () => {

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const routeList : AppBarRoute[] = [
        {
            path: '/',
            name: 'Home'
        },
        {
            path: '/login',
            name: 'Disconnect',
            onRouteClicked: () => {
                auth?.signOut(() => {});
            }
        }
    ];

    return (
        <div className="appbar_container">
            <div className="logoDisplay">
                <img src={Logo} alt="logo" className="logo" onClick={() => {navigate('/')}}/>
            </div>
            <div className="routeDisplay">
                {routeList.map((route, index) => {
                    return (
                        <button key={index} className="nav-btn" onClick={() => {navigate(route.path)}}>{route.name}</button>
                    )
                }
                )}
            </div>
        </div>
    )
};