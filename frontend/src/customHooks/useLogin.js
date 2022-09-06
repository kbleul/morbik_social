import { useState } from 'react'

import { AUTH_ACTIONS } from "../contex/authContext"
import { useAuthContext } from "./useContext"

export const useLogin = () => {
    const [error , seterror] = useState(null)
    const [isloading , setisloading] = useState(null)
    
    const { dispatch } = useAuthContext()

    const login = async ( username_or_email , password ) => {
        seterror(null)
        setisloading(true)

        const options = {
            method : "POST",
            headers : { "content-Type" : "application/json" },
            body : JSON.stringify({username_or_email , password})
        }


        const response = await fetch("/api/auth/login" , options )
        const json = await response.json()


        if(!response.ok) {
            setisloading(false)
            seterror(json.error)
            return null
        }

        else { console.log("ola")
            //save user to local storage
            localStorage.setItem("user" , JSON.stringify(json))

            // update auth context
            dispatch({ type : AUTH_ACTIONS.LOGIN , payload : json })

          
            setisloading(false)
            return json

        }
    }

    return { login , isloading , error }

}