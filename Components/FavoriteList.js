import { View, FlatList, StyleSheet } from 'react-native';
    
import MovieItem from "./MoveItem";
import SearchInput from './SearchInput';


function FavoriteMovieList({ navigation ,item }) {

    
    
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
          <FlatList
            data={item}
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
    export default FavoriteMovieList;

