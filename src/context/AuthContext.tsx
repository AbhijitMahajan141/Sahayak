import React,{ createContext, useState, useContext, useMemo,useEffect } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

type UserType = "Consumer" | "Provider";

type User={
    uid:string | null;
}

type AuthContextType = {
    userType: UserType | undefined;
    setUserType: (userType: UserType) => Promise<void>;
    user: User | null
    setUser: (userType: User | null) => Promise<void> ;
    loading: boolean;
    setLoading: (loading:boolean)=> void
}

export const AuthContext = createContext<AuthContextType>({
    userType : undefined,
    setUserType: async () => {},
    user: null,
    setUser: async ()=>{},
    loading: false,
    setLoading: ()=>{}
})

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider:React.FC<AuthProviderProps> = ({ children }) => {

    const [userType, setUserType] = useState<UserType | undefined>(undefined);
    const [user, setUser] = useState<User | null>(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        // const checkPreviousLogin = async ()=>{
        //     const currentUser = auth().currentUser;
        //     if(currentUser){
        //         setUser({uid: currentUser.uid})
        //     }
        // }
        // checkPreviousLogin();
        const unsubscribe = auth().onAuthStateChanged((user)=>{
            if(user){
                setUser({uid: user.uid})
            }else{
                setUser(null);
            }
        })

        // cleaning lister when component unmounts
        return ()=>unsubscribe();
    },[])

    //Memoized the context value to prevent unnecessary re-renders
    const authContextValue:AuthContextType = useMemo(() => ({
        userType,
        
        setUserType: async (newUserType: UserType)=>{
            try {
                // await AsyncStorage.setItem('userType',newUserType);
                setUserType(newUserType);
            } catch (error) {
                console.error("Error storing user type:",error);           
            }
        },
        user,
        setUser: async (newUser: User | null)=>{
            try {
                setUser(newUser);
            } catch (error) {
                console.error("Error storing user:",error);
            }
        },
        loading,
        setLoading: (loading: boolean,callback?:()=> void) => {
            try {
                setLoading(loading);
                if(typeof callback === 'function'){
                    callback()
                }
            } catch (error) {
                console.error("Error storing loading state:",error);
            }
        }
    }),[userType,user,loading])  

  return (
    <AuthContext.Provider value={authContextValue}>
        {children}
    </AuthContext.Provider>
  )
}

// export default AuthProvider
