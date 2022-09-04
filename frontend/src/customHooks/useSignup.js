import { useState } from 'react'

import { AUTH_ACTIONS } from "../contex/authContext"
import { useAuthContext } from "../customHooks/useAuthContext"

export const useSignup = () => {
    const [error , seterror] = useState(null)
    const [isloading , setisloading] = useState(null)
    
    const { dispatch } = useAuthContext()

    const signup = async ( email , username , password ) => {
        seterror(null)
        setisloading(true)

        const options = {
            method : "POST",
            headers : { "content-Type" : "application/json" },
            body : JSON.stringify({email , username , password})
        }


        const response = await fetch("/api/auth/signup" , options )
        const json = await response.json()

        console.log(json)


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

    return { signup , isloading , error }

}