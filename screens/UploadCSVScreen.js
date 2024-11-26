// screens/UploadCSVScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";




export default function UploadCSVScreen() {
  // State management for file upload process
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);

console.log("test1") //this works, state is fine here.


        // Determine the base URL based on the platform
  const BASE_URL = Platform.select({
    web: 'http://localhost:5000',
    default: 'http://127.0.0.1:5000'
  });

        
        
console.log("test2") //this works, state is fine here.

        

        // Main document picking and upload function
  const pickDocument = async () => {
    try {
      // Start loading state
      setLoading(true);

      // Log the base URL for debugging
      console.log(`Attempting to upload to: ${BASE_URL}/UPLOAD_FOLDER`);
    
        if (setLoading(false)){
            console.log("no good state")
        }



      // Use Expo's DocumentPicker to select a CSV file
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/csv",  // Restrict to CSV files
        copyToCacheDirectory: true,  // Ensure file is cached locally
      });

      // Check if a file was successfully selected
      if (result.type === "success") {
        // Update state with selected file name
        setFileName(result.name);
        console.log(result.name);



        // Create FormData for file upload
        const formData = new FormData();
        formData.append("file", {
          uri: result.uri,
          name: result.name,
          type: "text/csv",
        });

        // Log file details for debugging
        console.log("File details:", {
          name: result.name,
          uri: result.uri,
          type: result.type
        });

        try {
          // Attempt to upload the file
          const response = await fetch(`${BASE_URL}/upload`, {
            method: "POST",
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // Log response details
          console.log("Response status:", response.status);

          // Handle the response
          if (response.ok) {
            const jsonResponse = await response.json();
            console.log("Upload success:", jsonResponse);
            alert("File uploaded successfully!");
          } else {
            // Detailed error logging
            console.error("Upload failed:", response.status);
            const errorText = await response.text();
            console.error("Error details:", errorText);
            alert("Failed to upload the file.");
          }
        } catch (fetchError) {
          console.error("Network error:", {
            message: fetchError.message,
            name: fetchError.name,
            stack: fetchError.stack
          });
          alert(`Network error: ${fetchError.message}`);
        }
      }
    } catch (err) {
      console.error("Document pick error:", err);
      alert(`Error: ${err.message}`);
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  // Render the upload screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Contact List</Text>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={pickDocument}
        disabled={loading}
      >
        <Text style={styles.uploadButtonText}>
          {loading ? "Selecting..." : "Select CSV File"}
        </Text>
      </TouchableOpacity>

      {/* Show loading indicator when processing */}
      {loading && (
        <ActivityIndicator 
          size="large" 
          color="#0000ff" 
          style={styles.loader} 
        />
      )}

      {/* Display selected file name */}
      {fileName && (
        <View style={styles.fileInfo}>
          <Text style={styles.fileInfoText}>Selected file: {fileName}</Text>
        </View>
      )}

      {/* CSV Format Guide */}
      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>CSV Format Guide:</Text>
        <Text style={styles.helpText}>
          Your CSV should include these columns:{"\n"}
          • name{"\n"}
          • phone{"\n"}
          • roof-type (optional){"\n"}
          • building address (optional)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 50,
  },
  uploadButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  loader: {
    marginTop: 20,
  },
  fileInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    width: "80%",
  },
  fileInfoText: {
    fontSize: 14,
    textAlign: "center",
  },
  helpSection: {
    marginTop: 40,
    width: "80%",
    padding: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  helpText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
