import React, { useContext } from "react";

const ViewportContext = React.createContext({
	width: window.innerWidth,
	height: window.innerHeight
});

export function useViewport() {
	const value = useContext(ViewportContext);
	if (value === undefined) {
		throw new Error("useViewport should be used within ViewportContainer.");
	}
	return value;
}

function ViewportProvider({ children }) {
	return (
		<ViewportContext.Provider value={{
			width: window.innerWidth,
			height: window.innerHeight
		}}>{children}</ViewportContext.Provider>
	)
}

export default ViewportProvider;
