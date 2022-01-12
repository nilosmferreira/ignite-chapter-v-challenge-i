import { memo } from 'react';
import { Header } from './Header';
import { MovieCard } from './MovieCard';
import { ListRowRenderer } from 'react-virtualized';

interface ContentProps {
  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
  selectedGenre: {
    title: string;
  };
}

function ContentComponent({ movies, selectedGenre }: ContentProps) {
  const rowRenderer: ListRowRenderer = ({ index, style, key }) => {
    const movie = movies[index];
    console.log(movie);
    return (
      <div style={style} key={key}>
        <MovieCard
          key={movie.imdbID}
          title={movie.Title}
          poster={movie.Poster}
          runtime={movie.Runtime}
          rating={movie.Ratings[0].Value}
        />
      </div>
    );
  };
  return (
    <div className="container">
      <Header selectedGenre={selectedGenre} />
      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
