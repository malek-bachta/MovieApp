import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FavoriteContext } from "../store/context/Favorite-context";

function MovieItem({ poster, title, onPress, rating, id }) {
  const favoriteMoviesCtx = useContext(FavoriteContext);
  const movieIsFavorite = favoriteMoviesCtx.ids.includes(id);

  return (
    <View style={styles.gridItemContainer}>
      <View style={styles.gridItem}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${poster}`,
              }}
              style={styles.Image}
            />
            <View style={styles.rating}>
              <Icon name="star" size={20} color="#CCB802" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItemContainer: {
    width: "50%",
    paddingHorizontal: 5,
    marginBottom: 20,
    marginTop: 20,
    height: 280,
  },

  gridItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },

  imageContainer: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },

  Image: {
    flex: 1,
    resizeMode: "contain",
    width: 180,
    height: 190,
    margin: 10,
    borderColor: "#EE9B37",
    borderWidth: 1,
    borderRadius: 20,
  },

  title: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    height: 40, // Adjust the height as needed
    overflow: "hidden",
  },

  rating: {
    position: "absolute",
    top: 20,
    left: 134,
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 18,
    color: "#CCB802",
    textAlign: "center",
    fontWeight: "bold",
  },

  iconContainer: {
    position: "absolute",
    top: 245,
    right: 80,
    backgroundColor: "#2E271E",
    borderRadius: 50,
    padding: 5,
    borderColor: "#EE9B37",
    borderWidth: 1,
    elevation: 3,
  },
});

export default MovieItem;
