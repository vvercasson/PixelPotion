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

    const handleOnRouteClicked = (route: AppBarRoute) => {
        route.onRouteClicked?.();
        navigate(route.path);
    }

    const routeList: AppBarRoute[] = [
        {
            path: '/',
            name: 'Home'
        },
        {
            path: '/search',
            name: 'Search Cocktails'
        },
        {
            path: '/favorites',
            name: 'Favorites'
        }, {
            path: '/creation',
            name: 'Create a Cocktail'
        },
        {
            path: '/login',
            name: 'Disconnect',
            onRouteClicked: () => {
                auth?.signOut(() => { });
            }
        }
    ];

    return (
        <div className="appbar_container">
            <div className="logoDisplay">
                <img src={Logo} alt="logo" className="logo" onClick={() => { navigate('/') }} />
            </div>
            <div className="routeDisplay">
                {routeList.map((route, index) => {
                    return (
                        <button key={index} className={`nav-btn ${route.name === 'Disconnect' ? 'stick-right' : ''}`} onClick={() => { handleOnRouteClicked(route) }}>{route.name}</button>
                    )
                }
                )}
            </div>
        </div>
    )
};