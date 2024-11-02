import React, { useContext, useEffect, useState } from "react";

const defaultValue
	= window.innerWidth > 1200 ? "PC" :
	window.innerWidth > 744 ? "tablet" : "phone";

const ViewportContext = React.createContext(defaultValue);

export function useViewport() {
	const value = useContext(ViewportContext);
	if (value === undefined) {
		throw new Error("useViewport should be used within ViewportProvider.");
	}
	return value;
}

function ViewportProvider({ defValue = defaultValue, children }) {
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setValue(
				window.innerWidth > 1200 ? "PC" :
				window.innerWidth > 744 ? "tablet" : "phone"
			);
		});
		window.dispatchEvent(new Event("resize"));
	}, []);

	return (
		<ViewportContext.Provider value={value}>{children}</ViewportContext.Provider>
	);
}

export default ViewportProvider;
