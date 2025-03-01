import React, { useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity , Alert} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productslice"; 
import axios from "axios";

interface RootState {
  products: {
    products: any[];
    isLoading: boolean;
    error: string | null;
  };
}

const Dairy = ({navigation}) => {
  const token = useSelector(state=>state.user.token)
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(
        "http://192.168.1.68:5000/api/cart/add",
        {
          productId: product._id,
          quantity: product.quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        Alert.alert("Item added to cart successfully!");
        console.log("okk");
        
      }
    } catch (error) {
      Alert.alert("Error adding item to cart: " + (error.response?.data?.message || error.message));
      console.log("e...",error);
      
    }
  };

  
  

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
<TouchableOpacity
  onPress={() => {
    console.log("Navigating with product:", item); 
    navigation.navigate("productDetails", { product: item });
  }}
>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
          {item.productName}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", gap: 10 }}>
          <Text style={styles.productPrice}>₹{item.price}</Text>
          <Text style={styles.productStock}>Stock: {item.availableStock}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
  
  

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={(props) => renderItem({ ...props, navigation })} // Ensure navigation is passed
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.flatListContent} 
      />
    </View>
  );
  
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  flatListContent: {
    paddingHorizontal: 8,  
    paddingTop: 16,
  },
  productContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 5,
    width: 150,  
    height: 270,
    alignItems: "center", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flexDirection: 'column', // Allow for column layout
    justifyContent: 'space-between', // Space between content
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: "cover", 
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",  
  },
  priceStockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', 
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  productStock: {
    fontSize: 12,
    color: "#e74c3c",
    fontWeight: "600",
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: "#2ecc71", // Green color for the button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff", // White text color
  },
});


export default Dairy;
