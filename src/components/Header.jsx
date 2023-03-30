import Container from "./Container"
import { NavLink as RouterLink} from "react-router-dom";

const Header = () => {

    const getClassName = props => {
        return `${props.isActive ? 'font-bold' : ''} hover:underline hover:text-gray-600 transition duration-300`
    }

    return <Container className="bg-info">
        <nav className="navbar navbar-expand-md">
            <RouterLink className="p-3" to="/">24/7 "Coinversions"</RouterLink>
            <RouterLink className="p-3" to="/currentconversionrates">Current Conversion Rates</RouterLink>
            <RouterLink className="p-3" to="/conversions">Conversions</RouterLink>
        </nav>
    </Container>
}

export default Header;