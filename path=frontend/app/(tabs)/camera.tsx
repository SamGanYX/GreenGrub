const handleSaveBarcode = async () => {
    setData(prev => new Map(prev).set(scannedGtin, foodDataJson));  // ADDS THE NEW BARCODE-FOOD PAIR TO OUR GLOBAL MAP THING
    const id = await AsyncStorage.getItem("userId");
    console.log(id);
    
    const barcodeToSave = {  
        userId: id, 
        barcode: scannedGtin,
        active: true, 
    };

    console.log(scannedGtin);

    try {
        // Fetch product details using the scanned barcode
        const productResponse = await fetch(`http://13.59.176.110:8080/openfood/barcode/${scannedGtin}`);
        if (!productResponse.ok) {
            throw new Error('Failed to fetch product details');
        }
        
        const productData = await productResponse.json();
        const product = productData.product;

        // Add additional product information to barcodeToSave
        barcodeToSave.ecoscoreGrade = product.ecoscore_grade;
        barcodeToSave.ecoscoreScore = product.ecoscore_score;
        barcodeToSave.nutriscoreGrade = product.nutriscore_grade;
        barcodeToSave.nutriscoreScore = product.nutriscore_score;
        barcodeToSave.energyKcal100g = product.nutriments.energy_kcal_100g;
        barcodeToSave.sugars100g = product.nutriments.sugars_100g;
        barcodeToSave.proteins100g = product.nutriments.proteins_100g;

        const response = await fetch('http://13.59.176.110:8080/barcodes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(barcodeToSave),
        });

        if (!response.ok) {
            throw new Error('Failed to save barcode');
        }

        const savedBarcode = await response.json();
        console.log('Barcode saved:', savedBarcode);
    } catch (error) {
        console.error('Error saving barcode:', error);
    }
}; 