import { createContext, useContext, useState } from 'react';

const DropdownContext = createContext();

export default function DropdownProvider({ children }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [item, setItem] = useState();

  return <DropdownContext.Provider value={{ dropdownOpen, setDropdownOpen, item, setItem }}>{children}</DropdownContext.Provider>;
}

export function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error(`Don't use useDropdown() out of DropdownProvider`);
  const { dropdownOpen, setDropdownOpen } = context;

  return { dropdownOpen, setDropdownOpen };
}

export function useDropdownItem() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error(`Don't use useDropdownItem() out of DropdownProvider`);
  const { item, setItem } = context;

  return { item, setItem };
}
