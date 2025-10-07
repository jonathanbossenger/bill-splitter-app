import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

export default function App() {
  const [image, setImage] = useState(null);
  const [billItems, setBillItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert('Permission Required', 'Camera and media library permissions are required to use this app.');
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      await processImage(imageUri);
    }
  };

  const pickImage = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      await processImage(imageUri);
    }
  };

  const processImage = async (imageUri) => {
    setIsProcessing(true);
    try {
      // Use ML Kit for text recognition
      const result = await TextRecognition.recognize(imageUri);
      
      // Extract the recognized text
      const recognizedText = result.text;
      
      // Parse the recognized text to extract bill items
      const extractedItems = parseReceiptText(recognizedText);
      
      setBillItems(extractedItems);
      
      // Log the recognized text for debugging
      console.log('Recognized text:', recognizedText);
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process the image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const parseReceiptText = (text) => {
    const lines = text.split('\n');
    const items = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.length > 0) {
        // Match prices in formats like: 12.99, 12,99, $12.99, etc.
        const priceMatch = trimmedLine.match(/(\$?\d+[.,]\d{2})/);
        
        if (priceMatch) {
          const price = priceMatch[0];
          const itemName = trimmedLine.replace(price, '').trim();
          
          if (itemName.length > 0) {
            items.push({
              id: `${index}-${Date.now()}`,
              name: itemName,
              price: price,
              fullText: trimmedLine,
            });
          }
        } else if (trimmedLine.length > 3 && !trimmedLine.match(/^[\d\s\-\+\*\/\=]+$/)) {
          // Include lines that seem like item names (not just numbers)
          items.push({
            id: `${index}-${Date.now()}`,
            name: trimmedLine,
            price: 'N/A',
            fullText: trimmedLine,
          });
        }
      }
    });
    
    return items;
  };

  const resetApp = () => {
    setImage(null);
    setBillItems([]);
    setIsProcessing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Bill Splitter</Text>
        <Text style={styles.subtitle}>Scan your restaurant bill</Text>
      </View>

      {!image ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>📷 Take Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={pickImage}>
            <Text style={styles.buttonText}>🖼️ Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.resultContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          
          {isProcessing ? (
            <View style={styles.processingContainer}>
              <Text style={styles.processingText}>Processing image...</Text>
              <Text style={styles.processingSubtext}>This may take a moment</Text>
            </View>
          ) : (
            <>
              <Text style={styles.itemsHeader}>Bill Items ({billItems.length})</Text>
              
              {billItems.length > 0 ? (
                <FlatList
                  data={billItems}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  style={styles.itemsList}
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.noItemsText}>No items detected. Try another image.</Text>
              )}
              
              <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetApp}>
                <Text style={styles.buttonText}>Scan Another Bill</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: {
    backgroundColor: '#5856D6',
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  processingContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  processingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  processingSubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
  },
  itemsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  itemsList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  noItemsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
});
