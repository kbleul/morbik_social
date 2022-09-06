import { createContext, useState  } from "react"


export const NewuserContext = createContext()

const Newuser_ContextProvider = ( { children } ) => {
    const [ isnew , set_isnew ] = useState(false)

    return ( <NewuserContext.Provider value = { { isnew , set_isnew } }>
                { children }
        </NewuserContext.Provider>)
}

export default Newuser_ContextProvider