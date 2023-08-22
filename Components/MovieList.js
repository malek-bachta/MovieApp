import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MovieItem from "./MoveItem";
import SearchInput from "./SearchInput";

function MovieList({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

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

  const handleSearch = (searchText) => {
    const filtered = movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const RenderMovieItem = ({ item }) => {
    const handlePress = () => {
      navigation.navigate("Details", {
        movieId: item.id,
        img: item.poster_path,
        language: item.original_language,
        title: item.original_title,
        overview: item.overview,
        popularity: item.popularity,
        release_date: item.release_date,
        vote_average: item.vote_average,
        vote_count: item.vote_count,
      });
    };

    return (
      <MovieItem
        poster={item.poster_path}
        title={item.original_title}
        onPress={handlePress}
        rating={item.vote_average}
        id={item.id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchInput onSearch={handleSearch} />
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={RenderMovieItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Image: {
    width: 180,
    height: 190,
    margin: 10,
  },
});

export default MovieList;
