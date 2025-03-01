import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { resetCache } from "../../metro.config";

const UserCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => { 
    try {
      const response = await axios.get("http://192.168.1.68:5000/api/cart/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      setCart(response.data);
    } catch (err) {
      setError("Failed to fetch cart data");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async (item) => {
    try {
      await axios.post(
        "http://192.168.1.68:5000/api/orders/",
        {
          productId: item.productId,
          quantity: item.quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", "Order placed successfully!");
    } catch (err) {
      Alert.alert("Error", "Failed to place order.");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
        const response = await axios.post("http://192.168.1.68:5000/api/cart/remove",{productId}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
     
     
      });
      console.log("...",response.data);
      Alert.alert("Removed", "Item removed from cart");
      fetchCart(); 
    } catch (err) {
      Alert.alert("Error", "Failed to remove item.");
    }
    console.log("...e",error);
    
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart Details</Text>
      <Text style={styles.userName}>User: {cart.userName}</Text>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>Product ID: {item.productId}</Text>
            <Text style={styles.text}>Quantity: {item.quantity}</Text>

            
            <View style={styles.buttonContainer}>
            
              <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyNow(item)}>
                <Text style={styles.buyButtonText}>Buy Now</Text>
              </TouchableOpacity>

            
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.productId)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 10,
  },
  buyButton: {
    flex: 1, 
    backgroundColor: "#28A745", 
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  removeButton: {
    flex: 1,
    backgroundColor: "#DC3545", 
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5, // Space between buttons
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default UserCart;
