import React, { ReactNode, createContext, useContext, useState } from 'react';

interface DataShareType {
    data: Map<string, string>;
    setData: React.Dispatch<React.SetStateAction<Map<string, string>>>;
}

const DataContext = createContext<DataShareType>({
    data: new Map(),
    setData: () => {}
});

export const DataShare = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<Map<string, string>>(
        new Map([ // maps the BARCODE to the NAME
            ['420420420420', 'skdibidi'],
            ['123123123123', 'skdibidi2']
        ])
    );

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useFoodData = () => useContext(DataContext);