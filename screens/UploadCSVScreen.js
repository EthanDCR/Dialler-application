// screens/UploadCSVScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadCSVScreen() {
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
        copyToCacheDirectory: true
      });

      if (result.type === 'success') {
        setFileName(result.name);
        // TODO: add the upload logic here later
        console.log('Selected file:', result);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Contact List</Text>
      
      <TouchableOpacity 
        style={styles.uploadButton} 
        onPress={pickDocument}
        disabled={loading}
      >
        <Text style={styles.uploadButtonText}>
          {loading ? 'Selecting...' : 'Select CSV File'}
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {fileName && (
        <View style={styles.fileInfo}>
          <Text style={styles.fileInfoText}>
            Selected file: {fileName}
          </Text>
        </View>
      )}

      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>CSV Format Guide:</Text>
        <Text style={styles.helpText}>
          Your CSV should include these columns:{'\n'}
          • name{'\n'}
          • phone{'\n'}
          • roof-type (optional){'\n'}
          • building adress (optional)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 50,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  loader: {
    marginTop: 20,
  },
  fileInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '80%',
  },
  fileInfoText: {
    fontSize: 14,
    textAlign: 'center',
  },
  helpSection: {
    marginTop: 40,
    width: '80%',
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  helpText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
