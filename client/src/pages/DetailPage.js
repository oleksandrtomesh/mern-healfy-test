import { useContext } from "react"
import { AuthContext } from '../context/auth.context';

export const DetailPage = () => {
    const auth = useContext(AuthContext)
    return(
        <div className="text-center">
            <h1>Logged</h1>
            <button 
                className="waves-effect waves-light btn"
                onClick={auth.logout}>Logout</button>
        </div>
    )
}