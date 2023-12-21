import { getCurrentUser } from '@/lib/appwrite/api';
import { IUser } from '@/types';
import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
};

//To check if we have a logged in user
const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

type IContextType = {
    user: IUser;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
  }

const AuthContext = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({ children } : { children : React.ReactNode}) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            const currentAccout = await getCurrentUser();

            if(currentAccout) {
                setUser({
                    id: currentAccout.$id,
                    name: currentAccout.name,
                    username: currentAccout.username,
                    email: currentAccout.email,
                    imageUrl: currentAccout.imageUrl,
                    bio: currentAccout.bio
                })

                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (errorMsg) {
            console.log(errorMsg);
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if(
            localStorage.getItem('cookieFallBack') === '[]' ||
            localStorage.getItem('cookieFallBack') === null
        )
         navigate('/sign-in')
         checkAuthUser();
    }, []);


    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export const useUserContext = () => useContext(AuthContext);
