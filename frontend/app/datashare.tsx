import React, { ReactNode, createContext, useContext, useState } from 'react';

interface DataShareType {
    data: string[];
    setData: React.Dispatch<React.SetStateAction<string[]>>;
  }
  
const DataContext = createContext<DataShareType>({
    data: [],
    setData: () => {}
});

export const DataShare = ({ children } : {children : ReactNode }) => {
  const [data, setData] = useState<string[]>(['skdibidi', 'skdibidi2']);
  
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useFoodData = () => useContext(DataContext);