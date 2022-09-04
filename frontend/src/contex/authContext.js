import { createContext , useReducer , useEffect } from "react"

export const AuthContext = createContext()

export const AUTH_ACTIONS = {
    "LOGIN" : "LOGIN",
    "LOGOUT" : "LOGOUT",
    "SIGNUP" : "SIGNUP"
}

const authReducer = ( state , action ) => {

    switch(action.type) {
        case "LOGIN" : 
            return { user : action.payload}
        
        case "LOGOUT" :
            return { user : null }
    }
}

const AuthContextProvider = ( { children }) => {

    const [ state , dispatch ] = useReducer( authReducer , { user : null} )

    useEffect(() => {  
        const user = JSON.parse(localStorage.getItem("user"))

        if(user) {
            console.log("Welcome back" + user.username_or_email)

            dispatch({type : AUTH_ACTIONS.LOGIN ,  payload : user})
        }
    }, [] )

    return(
        <AuthContext.Provider value= { {...state , dispatch}}>
            { children }
        </AuthContext.Provider>
    )

}

export default AuthContextProvider