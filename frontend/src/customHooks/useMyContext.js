import { useContext } from "react"
import { AuthContext } from "../contex/authContext"
import { PostContext } from "../contex/postContext"
import { NewuserContext } from "../contex/newSignupContext"

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error("useAuthContext must be used inside of a AuthContextProvider")
    }

    return context
}

export const usePostContext = () => {
    const context = useContext(PostContext)

    if(!context) {
        throw Error("usePostContext must be used inside of a PostContextProvider")
    }

    return context
}

export const useNewUserContext = () => {
    const context = useContext(NewuserContext)

    if(!context) {
        throw Error("useAuthContext must be used inside of a AuthContextProvider")
    }

    return context
}