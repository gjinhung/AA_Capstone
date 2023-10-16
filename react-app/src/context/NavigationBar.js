import React, { useContext, useState } from "react";

const NavContext = React.createContext()

export function useNav() {
    return useContext(NavContext)
}

export function NavProvider({ children }) {
    const [isLoaded, setIsLoaded] = useState(false);

    function toggleNav(tf) {
        setIsLoaded(tf)
    }


    return (
        <NavContext.Provider value={{ isLoaded, toggleNav }}>
            {children}
        </NavContext.Provider>
    )
}