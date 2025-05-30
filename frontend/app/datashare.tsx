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
        new Map([ // maps the BARCODE to the JSON OF THE DATA? IDFK
            ['0 09800 89220 4', '{ "food": {"brand_name": "Blue Diamond", "food_id": "5406437", "food_name": "Almond Breeze Original Unsweetened Almond Milk", "food_type": "Brand", "food_url": "https://www.fatsecret.com/calories-nutrition/blue-diamond/almond-breeze-original-unsweetened-almond-milk", "servings": {"serving": {"calcium": "35", "calories": "30", "carbohydrate": "1.00", "cholesterol": "0", "fat": "2.50", "fiber": "1.0", "iron": "4", "measurement_description": "serving", "metric_serving_amount": "240.000", "metric_serving_unit": "ml", "monounsaturated_fat": "1.500", "number_of_units": "1.000", "polyunsaturated_fat": "0.500", "potassium": "160", "protein": "1.00", "saturated_fat": "0", "serving_description": "1 cup", "serving_id": "5255197", "serving_url": "https://www.fatsecret.com/calories-nutrition/blue-diamond/almond-breeze-original-unsweetened-almond-milk", "sodium": "170", "sugar": "0", "trans_fat": "0", "vitamin_a": "17" } } }}'],
        ])
    );

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useFoodData = () => useContext(DataContext);