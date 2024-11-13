import { createContext, useContext } from "react";

const intialState = {
  syncState: false,
};

const OpenSeadragonContext = createContext(intialState);

const OpenSeaDragonProvider = ({ children }) => {
  const [syncState, setSyncState] = useState(false);
  return (
    <OpenSeadragonContext.Provider
      value={{
        syncState,
        setSyncState,
      }}
    >
      {children}
    </OpenSeadragonContext.Provider>
  );
};

export const useOpenSeaDragonContext = () => {
  const context = useContext(OpenSeadragonContext);
  if (!context) {
    throw new Error(
      "useOpenSeaDragonContext hook can't be used outside OpenSeaDragonProvider "
    );
  }
  return context;
};
