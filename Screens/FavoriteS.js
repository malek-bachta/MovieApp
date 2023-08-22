import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../store/context/Favorite-context";
import { StyleSheet, Text, View } from "react-native";
import FavoriteMovieList from "../Components/FavoriteList";

function FavoriteS({navigation}) {
  const favoriteMoviesCtx = useContext(FavoriteContext);
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?page=1&api_key=afa1011726231b0cbda17f170b31cbed"
        );
        const json = await response.json();
        setMovies(json.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);


  const favoritemovies = movies.filter((movie) =>
    favoriteMoviesCtx.ids.includes(movie.id)
    );
    console.log("favoriteMoviesCtx.ids:", favoriteMoviesCtx.ids);
    console.log("favoritemovies:", favoritemovies);

  if (favoritemovies.length === 0) {
    return (
      <View style={styles.container}>
      <Text style={styles.text}>You have no favorite movies yet.</Text>
      </View>
    );
  }


  return(
    <View style={styles.container}>
      <FavoriteMovieList item={favoritemovies} navigation={navigation}/>
      </View>
  ) 
};

export default FavoriteS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
 
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});
