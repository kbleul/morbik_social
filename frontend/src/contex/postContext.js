import { createContext , useReducer , useEffect  } from "react"
// import {useFetchPosts} from "../customHooks/useFetchPosts"

export const PostContext = createContext()

export const POST_ACTIONS = {
    "GETALL" : "GETALL",
    "CLEAR" : "CLEAR",
    "ADDPOST" : "ADDPOST",
    "DELETEPOST" : "DELETEPOST",
}

const postReducer = ( state , action ) => {
    
    switch(action.type) {
        case POST_ACTIONS.GETALL :
            return action.payload

        case POST_ACTIONS.ADDPOST :
            return [ action.payload  , ...state ]

        case POST_ACTIONS.CLEAR :
            return []
    }
}


const PostContextProvider = ({ children }) => {

    const [ feedposts , dispatch ] = useReducer(postReducer , [])


    return( <PostContext.Provider value = { { feedposts , dispatch } }>
            { children }
        </PostContext.Provider> )
}

export default PostContextProvider
