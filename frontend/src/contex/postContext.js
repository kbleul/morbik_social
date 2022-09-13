import { createContext , useReducer  } from "react"

export const PostContext = createContext()

export const POST_ACTIONS = {
    "ADDPOST" : "ADDPOST",
    "DELETEPOST" : "DELETEPOST",
}

const postReducer = ( state , action ) => {
    
    switch(action.type) {
        case POST_ACTIONS.ADDPOST :
            return [ action.payload  , ...state ]
    }
}


const PostContextProvider = ({ children }) => {

    const [ feedposts , dispatch ] = useReducer(postReducer , [])

    return( <PostContext.Provider value = { { feedposts , dispatch } }>
            { children }
        </PostContext.Provider> )
}

export default PostContextProvider
