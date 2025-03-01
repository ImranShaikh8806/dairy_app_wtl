import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";


const ProductDetails = ({route}) => {
    const [quantity, setQuantity] = useState(1);
    const {product} = route.params
  console.log(product);
  
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
      if (quantity > 1) setQuantity(quantity - 1);
    };
    return (
        <ScrollView style={styles.container}>
        
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.images[0] }} style={styles.productImage} />
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}</Text>
            </View>
          </View>
    
         
          <View style={styles.detailsContainer}>
            <Text style={styles.productTitle}>{product.productName}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.productPrice}>₹{product.price}</Text>
              <Text style={styles.originalPrice}>₹{product.availableStock}</Text>
            </View>
    
           
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
    
          <View style={styles.deliveryBanner}>
            <Text style={styles.deliveryText}>
              Shop for ₹300 more to unlock <Text style={{ fontWeight: "bold" }}>FREE DELIVERY</Text>
            </Text>
          </View>
    
        
          <View style={styles.cartContainer}>
            <View>
              <Text style={styles.cartItems}>{quantity} Item | ₹{product.price * quantity}</Text>
              <Text style={styles.savedAmount}>₹{(product.originalPrice - product.price) * quantity} saved, more coming up!</Text>
            </View>
            <TouchableOpacity style={styles.cartButton}>
              <Text style={styles.cartButtonText}>Go to Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    };

    export default ProductDetails
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#ffffff",
      },
      imageContainer: {
        position: "relative",
        alignItems: "center",
        marginVertical: 10,
      },
      productImage: {
        width: 200,
        height: 250,
        resizeMode: "contain",
      },
      discountBadge: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "orange",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
      },
      discountText: {
        color: "#fff",
        fontWeight: "bold",
      },
      detailsContainer: {
        paddingHorizontal: 15,
      },
      productTitle: {
        fontSize: 18,
        fontWeight: "bold",
      },
      productWeight: {
        color: "gray",
        marginVertical: 5,
      },
      priceRow: {
        flexDirection: "row",
        alignItems: "center",
      },
      productPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#28a745",
      },
      originalPrice: {
        fontSize: 16,
        color: "gray",
        textDecorationLine: "line-through",
        marginLeft: 10,
      },
      quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      },
      quantityButton: {
        width: 35,
        height: 35,
        backgroundColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
      },
      quantityText: {
        fontSize: 20,
      },
      quantityValue: {
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 10,
      },
      deliveryBanner: {
        backgroundColor: "#f8f9fa",
        padding: 12,
        marginVertical: 10,
        alignItems: "center",
      },
      deliveryText: {
        fontSize: 14,
      },
      cartContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderColor: "#ddd",
      },
      cartItems: {
        fontSize: 16,
        fontWeight: "bold",
      },
      savedAmount: {
        fontSize: 12,
        color: "green",
      },
      cartButton: {
        backgroundColor: "#28a745",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      cartButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
    });
    