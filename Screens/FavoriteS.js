import MovieList from "../Components/MovieList";
import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../store/context/Favorite-context";
import { Text, View } from "react-native";

function FavoriteS() {
  const favoriteMoviesCtx = useContext(FavoriteContext);
  const [movies, setMovies] = useState([]);

  const favoritemovies = movies.filter((movie) =>
    favoriteMoviesCtx.ids.includes(movie.id)

    );
    console.log(favoriteMoviesCtx.ids);
  if (favoritemovies.length === 0) {
    return (
      <View >
        <Text >You have no favorite movies yet.</Text>
      </View>
    );
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?page=1&api_key=afa1011726231b0cbda17f170b31cbed"
        );
        const json = await response.json();
        setMovies(json.results);
        setFilteredMovies(json.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);


  const {favouriteMovies,deleteFavourite } = useContext(MovieContext);  
 
  useEffect(() => {
    if (isFocused) {
      favouriteMovies
    }
  }, [isFocused]);

  return <MovieList item={favoritemovies} />;
}

export default FavoriteS;
