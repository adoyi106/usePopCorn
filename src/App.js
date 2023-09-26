import { useEffect,useRef, useState } from "react";
import StarRating from "./star";
import {useMovies} from "./useMovies"
import {useLocalStorageState} from './useLocalStorageState'
import {useKey} from './useKey'

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


  const KEY = "1d9afa8d";
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)
  const {movies, isLoading, error} = useMovies(query)
  const [watched, setWatched] = useLocalStorageState([], "watched")
  //initializing local localStorage
  // const [watched, setWatched] = useState([]);
  
  function handleSelectedMovie(id){
    setSelectedId(selectedId => selectedId === id ? null : id)
  }
  function handleCloseMovie(){
    setSelectedId(null)
  }

  function handleAddWatchedMovie(movie){
    setWatched(watched => [...watched, movie])
  }

  function handleDeletewatchedMovie(id){
    setWatched(watched.filter(movie=> movie.imdbID !== id))
  }


  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <Main>
        <Box>
         {/* { isLoading ? <Loader/> : <MoviesList movies={movies} />} */}
         {!isLoading && !error &&  <MoviesList movies={movies} onSelectMovie ={handleSelectedMovie}/>}
         {error && <ErrorMesseage message={error}/>}
         {isLoading && <Loader/>}
        </Box>
        <Box>
          { selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatchedMovie={handleAddWatchedMovie} watched={watched}/> : 
          <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched}  onDeleteMovie={handleDeletewatchedMovie}/>
          </>}
        </Box>
      </Main>
    </>
  );
}
function ErrorMesseage ({message}){
  return <p className="error">
    <span>📛</span> {message}
  </p>
}
function Loader (){
  return <p className="loader">Loading...</p>
}

function Nav({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Search({query, setQuery}) {
  const inputEl = useRef(null)

  //keydown function
  useKey("Enter",function(){
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus()
    setQuery("")
  } )
//   useEffect(function(){
//     function callback(e){
//       if(e.code === "Enter"){
//         if (document.activeElement === inputEl.current) return;
//         inputEl.current.focus()
//         setQuery("")
    
//   }
// }
//     document.addEventListener("keydown",callback)
//     return ()=> document.addEventListener("keydown", callback)
//   },[])


  
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
// function WatchedListBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />

//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
//}
function MoviesList({ movies, onSelectMovie }) {

 
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watched, onDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteMovie={onDeleteMovie} />
      ))}
    </ul>
  );
}
function MovieDetails({selectedId, onCloseMovie, onAddWatchedMovie, watched}){
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState("")

  const isWatched = watched.some(movie=> movie.imdbID === selectedId)
  const watchedUserRating = watched.find(movie=> movie.imdbID === selectedId)?.userRating

  const countRef = useRef(0)
  useEffect(function(){
    if(userRating) countRef.current++
  },[userRating])

const {
  Title: title,
  Year : year,
  Poster: poster,
  Runtime: runtime,
  imdbRating,
  Released: released,
  Plot : plot,
  Actors: actors, 
  Director: director,
  Genre: genre,

} = movie;



function handleAdd(){
  const newWatchedMovie = {
  imdbID: selectedId,
  title,
  imdbRating : Number(imdbRating),
  runtime : Number(runtime.split(" ").at(0)),
  poster,
  userRating,
  countRef,
  }

  onAddWatchedMovie(newWatchedMovie)
  onCloseMovie()
 
}

//callback

//listener for keydown
useKey("Escape", onCloseMovie)
// useEffect(function () {
//   function callback(e){
//     if(e.code === "Escape"){
//       onCloseMovie()
     
//     }
//    }
//   document.addEventListener("keydown", callback)

//   //cleanup function
//   return function(){

//     document.removeEventListener("keydown", callback)
//   } 
// },[onCloseMovie])

   



//fetching more details on movie
  useEffect(function(){
    
    async function getMovieDetails(){

      setIsLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`, )
      const data = await res.json()
      
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetails()
  }, [selectedId])

  useEffect(function(){
    if (!title) return
    document.title = `Movie | ${title}`

    //cleanup function
    return function(){
      document.title = `usePopCorn`
    }
  },[title])

  return <div className="details">
   {isLoading ? <Loader /> :
   <>
    <header>
    <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
      <img src={poster} alt={`Poster of ${movie} movie`}/>
      <div className="details-overview">
        <h2>{title}</h2>
        <p>
          {released} &bull; {runtime}
        </p>
        <p>
          {genre}
        </p>
        <p>
          <span>⭐</span>
          {imdbRating} IMDB rating
        </p>
      </div>
    </header>
    <section>
      <div className="rating">
  { !isWatched ? 
  <>
  <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
   { userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
   </>
    : <p>You rated this movie {watchedUserRating} <span>⭐</span></p>}
      </div>
      <p>

      <em>{plot}</em>
      </p>
      <p> Starring {actors}</p>
      <p>Directed by {director}</p>
    </section>
    </>
    }
    </div>
}
function WatchedMovie({ movie, onDeleteMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button className="btn-delete" onClick={()=>onDeleteMovie(movie.imdbID)}>X</button>
    </li>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
