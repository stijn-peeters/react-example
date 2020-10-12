import React, { useCallback, useEffect, useState } from "react";

const App = () => {
  const api_key = "?api_key=3c55e7b0323dc576e528420b10e3a736";
  const poster_path = "http://image.tmdb.org/t/p/w500/";
  const [movie, setMovie] = useState("Ant-Man");
  const [apiData, setApiData] = useState([]);

  const onSearch = useCallback((event) => {
    setMovie(event.target.value);
  }, []);

  const formSubmitted = useCallback(
    (event) => {
      event.preventDefault();

      fetch(
        `https://api.themoviedb.org/3/search/movie${api_key}&query=${
          movie ? movie : "ant"
        }`
      )
        .then((data) => data.json())
        .then((data) => {
          setApiData([
            ...apiData,
            {
              apicall: data.results,
            },
          ]);
          setMovie("");
        });
    },
    [movie, apiData]
  );

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newSearch">What movie are you looking for? </label>
        <input
          id="newSearch"
          name="newSearch"
          onChange={onSearch}
          value={movie}
        />
        <button>Search</button>
      </form>
      <ul>
        {apiData.map((apiSearch) =>
          apiSearch.apicall.map((movies) => (
            <li key={movies.id}>
              <div className="card">
                <div className="card-image">
                  {movies.poster_path == null ? (
                    <img
                      alt="image not found"
                      src="https://i.imgur.com/eYard5G.png"
                    ></img>
                  ) : (
                    <img
                      alt="http://clipart-library.com/images/ziX5n9MjT.png"
                      src={poster_path + movies.poster_path}
                    ></img>
                  )}
                </div>
                <div className="container">
                  <h1>{movies.title}</h1>
                  <p>{movies.overview}</p>
                  <br></br>
                  {movies.release_date == "" ? (
                    <p>Not yet released</p>
                  ) : (
                    <p>Released on: {movies.release_date}</p>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="icons">
        Icons made by
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default App;
