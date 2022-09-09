import { createContext , useReducer , useEffect } from "react"

export const AuthContext = createContext()

export const AUTH_ACTIONS = {
    "LOGIN" : "LOGIN",
    "LOGOUT" : "LOGOUT",
    "UPDATE_INFO" : "UPDATE_INFO",
}

const authReducer = ( state , action ) => {

    switch(action.type) {
        case AUTH_ACTIONS.LOGIN : 
            return { user : action.payload}
        
        case AUTH_ACTIONS.LOGOUT :
            return { user : null }

        case AUTH_ACTIONS.UPDATE_INFO :
            return { user : action.payload }

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