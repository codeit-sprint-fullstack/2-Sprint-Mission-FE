import React, { createContext, useContext, useEffect, useState } from "react";

interface IViewport {
	device: "PC" | "tablet" | "phone";
	size: number;
}

const defaultValue = { device: "PC", size: 16 } as IViewport;

const ViewportContext = createContext<IViewport>(defaultValue);

export function useViewport() {
	const value = useContext(ViewportContext);
	if (value === undefined) {
		throw new Error("useViewport should be used within ViewportProvider.");
	}
	return value;
}

interface Props {
	defValue?: IViewport;
	children: React.ReactNode;
}

function ViewportProvider({ defValue = defaultValue, children }: Props) {
	const [value, setValue] = useState<IViewport>(defValue);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setValue(
				window.innerWidth > 1200 ? { device: "PC", size : 16 } :
				window.innerWidth > 744 ? { device: "tablet", size: 14 } : { device: "phone", size: 12 }
			);
		});
		window.dispatchEvent(new Event("resize"));
	}, []);

	return (
		<ViewportContext value={value}>{children}</ViewportContext>
	);
}

export default ViewportProvider;
