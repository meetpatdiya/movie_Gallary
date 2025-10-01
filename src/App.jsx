import { useEffect } from "react";
import { useState } from "react";
const App = () => {
  // b89efb5b777fa8c8801a7da3fef04d2f
  const API_KEY = "b89efb5b777fa8c8801a7da3fef04d2f";
  const BASE_URL = "https://api.themoviedb.org/3";
  const [search, setsearch] = useState("");
  const [movie, setmovie] = useState([]);
  const [movies, setmovies] = useState([]);
  const [genra, setgenra] = useState([]);
  const [bygenra, setbygenra] = useState([]);
  const [genraid, setgenraid] = useState("");
  const [normal, setnormal] = useState(true);
  const [sort, setsort] = useState("");
  async function getPopularMovies() {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    setmovies(data.results);
  }

  useEffect(() => {
    getmoviebyGenra();
  }, [genraid, sort]);

  async function searchMovie() {
    if(search != ""){
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
      );
      const data = await response.json();
      const mostPopuler = data.results.sort(
        (a, b) => b.vote_average - a.vote_average
      );
      console.log(mostPopuler);
      setmovie(mostPopuler);
      setnormal(false);
    }else{
      alert("Search Box is Empty...")
    }
  }
  async function moviesByGenre() {
    const genre = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const allGenre = await genre.json();
    setgenra(allGenre.genres);
    console.log(allGenre);
  }
  async function getmoviebyGenra() {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genraid}&sort_by=${sort}`
    );
    const data = await response.json();
    setbygenra(data.results);
    console.log(data);
  }
  const changeGenra = (e) => {
    if(normal == false){
      alert("cant change right now")
    }else if(normal == true){
      setgenraid(e.target.value);
      console.log(genraid);
    }
  };
  const sorting = [
    { name: "Most Populer", value: "popularity.desc" },
    { name: "Least Populer", value: "popularity.asc" },
    { name: "Newest Realsed", value: "release_date.desc" },
    { name: "Oldest Realsed", value: "release_date.asc" },
    { name: "Highest Rated", value: "vote_average.desc" },
    { name: "Lowest Rated", value: "vote_average.asc" },
    { name: "A - Z", value: "original_title.asc" },
    { name: "Z - A", value: "original_title.desc" },
  ];
  useEffect(() => {
    getPopularMovies();
    moviesByGenre();
    getmoviebyGenra();
  }, []);
  const valueChange = (e) => {
    const value = e.target.value;
    setsearch(value);

    if (value === "") {
      setnormal(true);
      getPopularMovies();
    }
  };
  const byrating = (e) => {
    if(normal == false){
      alert("can t do right now")
    }else if (normal == true){
      setsort(e.target.value);
      console.log(sort);
    }
  };
  return (
    <>
      <h1>Movie Gallary</h1>
      <div className="ser">
        <input type="text" value={search} onChange={(e) => valueChange(e)} />
        <button className="btn" onClick={() => searchMovie()}>search</button>
      </div>
      <div className="sele">
        Sort by: 
        <select id="" onChange={changeGenra}>
          {genra.map((item, index) => {
            return (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            );
          })}
        </select>
        Genre: 
        <select id="" onChange={byrating}>
          {sorting.map((item, index) => {
            return (
              <option value={item.value} key={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="content">
        {!normal &&
          movie &&
          movie.map((item, index) => {
            return (
              <div key={index} className="data">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  height={300}
                  width={225}
                />
                <h2>{item.title}</h2>
                <p style={{
    background:
      item.vote_average >= 7 ? "limegreen"
      : item.vote_average >= 5 ? "orange" : "crimson"
  }} className="vote">Rating : {item.vote_average}</p>
              </div>
            );
          })}
        {normal &&
          bygenra &&
          bygenra.map((item, index) => {
            return (
              <div key={index} className="data">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  height={300}
                  width={225}
                />
                <h2>{item.title}</h2>
                <p style={{
    background:
      item.vote_average >= 7 ? "limegreen"
      : item.vote_average >= 5 ? "orange" : "crimson"
  }} className="vote">Rating : {item.vote_average}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default App;
