import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useRefreshToken = () => {
    const { setAuth  , logout} = useAuth();
    const navigate = useNavigate()

    const refresh = async () => {
        try{

            const response = await axios.get('http://localhost:5000/api/auth/refresh', {
                withCredentials: true
            });

            console.log(response);
            
            const token = response.data.data
            console.log(token);
            
            const userString = localStorage.getItem('user');
            if (userString) {
                const user = JSON.parse(userString);
                user.token = token;
                localStorage.setItem('user', JSON.stringify(user));
            }
            await setAuth((prevAuth) => ({ ...prevAuth, token: token }));
    
            return response.data.data;

        }catch(error:any){
            if (
            error.response.status === 403 ||
                error.response.status === 401 ||
                error.response.status === 400
              ) {
                navigate("/login");
                logout()
                return null; // Return null or handle the error accordingly
              }
        }
        
    }
    return refresh;
};

export default useRefreshToken;