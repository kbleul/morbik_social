import { useContext } from "react"
import { AuthContext } from "../contex/authContext"

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error("useAuthContext must be used inside of a AuthContextProvider")
    }

    return context
}