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

const suggestedReducer = ( state , action ) => {

    switch(action.type) {
        case POST_ACTIONS.GETALL:
            return action.payload
    }
}

const userPostReducer = ( state , action ) => {
    switch(action.type) {
        case POST_ACTIONS.GETALL :
            return action.payload
    }
}


const PostContextProvider = ({ children }) => {

    const [ feedposts , dispatch ] = useReducer(postReducer , [])

    const [ feedposts_suggested , dispatch_suggested ] = useReducer(suggestedReducer , [])

    const [ userposts, dispatch_userposts ] = useReducer(userPostReducer , [])


    return( <PostContext.Provider value = { { feedposts , dispatch , feedposts_suggested , dispatch_suggested , userposts, dispatch_userposts } }>
            { children }
        </PostContext.Provider> )
}

export default PostContextProvider
