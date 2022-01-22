import { Link } from "react-router-dom";
import UIButton from "./components/Button";



const Home = () => {
    return (
        <div>
            <h2>Welcome!</h2>
            <Link to="/diary">
            <UIButton text="Diary Entry"/>
            </Link>
        </div>
    );
};

export default Home;
