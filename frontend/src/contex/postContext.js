import { createContext , useReducer  } from "react"

export const PostContext = createContext()

export const POST_ACTIONS = {
    "ADDPOST" : "ADDPOST",
    "DELETEPOST" : "DELETEPOST",
}


const PostContextProvider = ({ children }) => {

    const [ state , dispatch ] = useReducer(postReducer , [])

    return( <PostContext.Provider value = { { ... state , dispatch } }>
            { children }
        </PostContext.Provider> )
}

export default PostContextProvider
