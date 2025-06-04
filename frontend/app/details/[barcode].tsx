import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

export default function DetailsPage() {
  const { barcode } = useLocalSearchParams();
  const [productDetails, setProductDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProductDetails() {
      if (!barcode || typeof barcode !== 'string') {
        setError("No barcode provided or invalid barcode format.");
        setLoading(false);
        return;
      }

      try {
        const productResponse = await fetch(`http://13.59.176.110:8080/openfood/barcode/${barcode}`);
        if (!productResponse.ok) {
          throw new Error('Failed to fetch product details');
        }

        const productData = await productResponse.json();
        if (productData && productData.product) {
          setProductDetails(productData.product);
        } else {
          setError("Product details not found for this barcode.");
        }
      } catch (err: any) {
        console.error('Error fetching product details:', err);
        setError(`Error fetching product details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [barcode]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading product details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!productDetails) {
    return (
      <View style={styles.container}>
        <Text>No product details available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <Text style={styles.detailText}>Barcode: {barcode}</Text>
      <Text style={styles.detailText}>Product Name: {productDetails.product_name || 'N/A'}</Text>
      <Text style={styles.detailText}>Eco-score Grade: {productDetails.ecoscore_grade || 'N/A'}</Text>
      <Text style={styles.detailText}>Eco-score Score: {productDetails.ecoscore_score || 'N/A'}</Text>
      <Text style={styles.detailText}>Nutri-score Grade: {productDetails.nutriscore_grade || 'N/A'}</Text>
      <Text style={styles.detailText}>Nutri-score Score: {productDetails.nutriscore_score || 'N/A'}</Text>
      <Text style={styles.detailText}>Energy (kcal/100g): {productDetails.nutriments?.['energy-kcal_100g'] || 'N/A'}</Text>
      <Text style={styles.detailText}>Sugars (100g): {productDetails.nutriments?.sugars_100g || 'N/A'}</Text>
      <Text style={styles.detailText}>Proteins (100g): {productDetails.nutriments?.proteins_100g || 'N/A'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
