import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';

const VIEWPORT = Object.freeze({
  DESKTOP: 1200,
  TABLET: 744
});

interface PageSize {
  bestPost: number;
  bestProduct: number;
  defaultProduct: number;
}

interface ResizeContextType {
  bestPost: number;
  bestProduct: number;
  defaultProduct: number;
}

const ResizeContext = createContext<ResizeContextType | undefined>(undefined);

const DESKTOP_SIZE_BEST_POST_LIST = 3;
const TABLET_SIZE_BEST_POST_LIST = 2;
const MOBILE_SIZE_BEST_POST_LIST = 1;

const DESKTOP_SIZE_BEST_PRODUCT_LIST = 4;
const TABLET_SIZE_BEST_PRODUCT_LIST = 2;
const MOBILE_SIZE_BEST_PRODUCT_LIST = 1;

const DESKTOP_SIZE_DEFAULT_PRODUCT_LIST = 10;
const TABLET_SIZE_DEFAULT_PRODUCT_LIST = 6;
const MOBILE_SIZE_DEFAULT_PRODUCT_LIST = 4;

interface ResizeProviderProps {
  children: ReactNode;
}

export const ResizeProvider = ({ children }: ResizeProviderProps) => {
  const [pageSize, setPageSize] = useState<PageSize>({
    bestPost: DESKTOP_SIZE_BEST_POST_LIST,
    bestProduct: DESKTOP_SIZE_BEST_PRODUCT_LIST,
    defaultProduct: DESKTOP_SIZE_DEFAULT_PRODUCT_LIST
  });

  const handleResize = () => {
    const width = window.innerWidth;

    setPageSize((prevState) => ({
      ...prevState,
      bestPost:
        width >= VIEWPORT.DESKTOP
          ? DESKTOP_SIZE_BEST_POST_LIST
          : width >= VIEWPORT.TABLET
          ? TABLET_SIZE_BEST_POST_LIST
          : MOBILE_SIZE_BEST_POST_LIST
    }));

    setPageSize((prevState) => ({
      ...prevState,
      bestProduct:
        width >= VIEWPORT.DESKTOP
          ? DESKTOP_SIZE_BEST_PRODUCT_LIST
          : width >= VIEWPORT.TABLET
          ? TABLET_SIZE_BEST_PRODUCT_LIST
          : MOBILE_SIZE_BEST_PRODUCT_LIST,
      defaultProduct:
        width >= VIEWPORT.DESKTOP
          ? DESKTOP_SIZE_DEFAULT_PRODUCT_LIST
          : width >= VIEWPORT.TABLET
          ? TABLET_SIZE_DEFAULT_PRODUCT_LIST
          : MOBILE_SIZE_DEFAULT_PRODUCT_LIST
    }));
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResizeContext.Provider value={pageSize}>{children}</ResizeContext.Provider>
  );
};

export const useResize = () => useContext(ResizeContext);
