import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function RowProduct({ product }) {
  const chooseImage = () => {
    if (product.category.toLowerCase() === "shampoo") {
      //images-na.ssl-images-amazon.com/images/I/61drhb87iOL._SL1200_.jpg
      https: return "https://static.dribbble.com/users/2272349/screenshots/11207743/media/2b75c8253c5485936d05894abc9e4b4d.jpg";
    } else if (product.category.toLowerCase() === "conditioner") {
      return "https://3.bp.blogspot.com/-IdfbE8yIPO0/XVwTj9xtuJI/AAAAAAAGIA0/CkWQCaoKAXow4m2a1jaBbKURURT439HzwCLcBGAs/s1600/orea_1.jpg";
    } else if (product.category.toLowerCase() === "deep conditioner") {
      return "https://images.unsplash.com/photo-1597354984706-fac992d9306f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80";
    } else {
      // https://images.unsplash.com/photo-1519735777090-ec97162dc266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1415&q=80
      // https://designhooks.com/wp-content/uploads/2018/05/shampoo-bottle-packging-mockup.jpg
      // https://images.unsplash.com/photo-1597354984706-fac992d9306f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80
      // https://images.unsplash.com/photo-1585232351009-aa87416fca90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80
      // https://images.unsplash.com/photo-1584949514490-73fc1a2faa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60
      // https://cdn.pixabay.com/photo/2018/08/14/13/49/botanical-3605608__340.jpg
      return "https://images.unsplash.com/photo-1519735777090-ec97162dc266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1415&q=80";
    }
  };

  return (
    <View>
      <Image style={styles.scan} source={{ uri: chooseImage() }} />
      <Text style={styles.nameText}>{product.productName}</Text>
      <Text style={styles.categoryText}>{product.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scan: {
    width: 100,
    height: 130,
    borderRadius: 5,
    marginBottom: 15,
  },
  nameText: {
    fontSize: 13,
    marginVertical: 5,
    fontFamily: "montserrat-bold",
  },
  categoryText: {
    fontSize: 13,
    fontFamily: "montserrat-regular",
  },
});
