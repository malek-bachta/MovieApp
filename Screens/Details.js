import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FavoriteContext } from "../store/context/Favorite-context";
import FavoriteModal from "../Components/popupModal";

function Details({ route }) {
  const favoriteMoviesCtx = useContext(FavoriteContext);

  const {
    movieId,
    img,
    title,
    language,
    overview,
    popularity,
    release_date,
    vote_average,
    vote_count,
  } = route.params;

  const navigation = useNavigation();
  const movieIsFavorite = favoriteMoviesCtx.ids.includes(movieId);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

 
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const ChangeVavoriteHandler = () => {
    if (movieIsFavorite) {
      favoriteMoviesCtx.removeFavorite(movieId);
      setModalMessage('Movie removed from favorites');
    } else {
      favoriteMoviesCtx.addFavorite(movieId);
      setModalMessage('Movie added to favorites');
    }

    toggleModal();
  };

  


  return (
    <>
      <View style={styles.container}>
        {/* <SafeAreaView style={styles.container}> */}
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${img}`,
          }}
          style={styles.backgroundImage}
          resizeMode="stretch"
        >
          <TouchableOpacity style={styles.arrowBack} onPress={handleGoBack}>
            <Icon name="long-arrow-left" size={30} color="#EE9B37" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favorite}>
            <Icon
              name={movieIsFavorite ? "heart" : "heart-o"}
              size={40}
              color="#E04E1B"
              onPress={ChangeVavoriteHandler}
            />
          </TouchableOpacity>
          <FavoriteModal isVisible={isModalVisible} message={modalMessage} onClose={toggleModal} />
          <View style={styles.detailContainer}>
            <ScrollView>
              <View style={styles.rating}>
                <Icon name="star" size={20} color="#CCB802" />
                <Text style={styles.ratingText}>{vote_average}</Text>
                <Text style={styles.vote_count}> ( {vote_count} reviews )</Text>
              </View>
              <Text style={styles.title}>{title} </Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.release_date}>
                  <Text style={styles.other}>{release_date}</Text>
                </View>
                <View style={styles.release_date}>
                  <Text style={styles.other}>{popularity}</Text>
                </View>
                <View style={styles.release_date}>
                  <Text style={styles.other}>{movieId}</Text>
                </View>
              </View>
              <View style={{ flex: 7 }}>
                <Text style={styles.vote_count}>{overview}</Text>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
        {/* </SafeAreaView> */}
      </View>
    </>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
  backgroundImage: {
    flex: 1,
    // height: "80%",
  },
  detailContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    marginTop: 420,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  rating: {
    flexDirection: "row",
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 18,
    color: "#CCB802",
    textAlign: "center",
    fontWeight: "bold",
  },
  vote_count: {
    color: "#fff",
    fontSize: 18,
  },

  release_date: {
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 50,
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    height: 30,
    marginRight: 10,
    width: 90, // Adjust the width as needed
  },

  other: {
    color: "#fff",
    textAlign: "center",
  },

  arrowBack: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  favorite: {
    position: "absolute",
    top: 70,
    left: 340,
  },
});
