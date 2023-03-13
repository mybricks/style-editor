import React, { useContext } from "react";

const PanelContext = React.createContext(undefined);

interface Props {
  value: any;
  children: React.ReactNode;
}

const PanelProvider = ({ children, value }: any) => {
  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
};

const usePanelContext = () => {
  const context = useContext(PanelContext);

  if (context === undefined) {
    throw new Error("usePanelContext must be used within a CounterProvider");
  }

  return context;
};

export { PanelProvider, usePanelContext };
