import React, {useState, createContext} from "react";


export const ItemListContext = createContext();

export const ItemListContextProvider = props => {
    const [items,setItems] = useState([]);
    return(
        <ItemListContext.Provider value={{items,setItems}}>
            {props.children}
        </ItemListContext.Provider>
    );
};
