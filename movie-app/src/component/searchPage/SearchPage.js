import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchHistory from './SearchHistory';
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';
// SearchPage component
import popcornImage from './popcorn.png'

const SearchPage = ({searchResults,
                        setSearchResults,
                        searchHistory,
                        setSearchHistory,
                        fetchCartItems}) => {
    // State variables
    const [searchQuery, setSearchQuery] = useState('');
    const [genreOptions, setGenreOptions] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const PRICE = 3.99; // Price constant for movies
    // Desired genres for filtering options
    const desiredGenres = ["Animation", "Music", "Family"];

    // Fetch genre options from API when the component mounts
    useEffect(() => {
        // Fetch genre options from API
        fetchGenreOptions();
    },[]);
    // Function to fetch genre options from the API
    const fetchGenreOptions = async () => {
        try {
            const apiKey = 'f7147bf678f534a23a464e90c2246b43';
            const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

            const response = await axios.get(url);
            const genres = response.data.genres;

            // Filter genre options to include only desired genres
            const filteredGenres = genres.filter((genre) => desiredGenres.includes(genre.name));

            // Set genre options
            setGenreOptions(filteredGenres);
        } catch (error) {
            console.log(error);
        }
    };
    // Function to handle discovering movies based on selected genres, release year, and page number
    const handleDiscover = async () => {
        try {
            const apiKey = 'f7147bf678f534a23a464e90c2246b43';
            const baseUrl = 'https://api.themoviedb.org/3';
            const discoverEndpoint = '/discover/movie';

            const genreIds = selectedGenres.map((genre) => genre).join(',');
            const url = `${baseUrl}${discoverEndpoint}?api_key=${apiKey}`+
                `&with_genres=${genreIds}&primary_release_year=${releaseYear}&include_adult=false&page=${pageNumber}`;
            const response = await axios.get(url);
            const results = updateResponseData(response.data.results);

            setTotalPages(response.data.total_pages)

            // Update search results
            setSearchResults(results);
        } catch (error) {
            console.log(error);
        }
    };
    // Function to handle searching movies based on the search query
    const handleSearch = async (searchQuery) => {

        if (searchQuery.trim() !== "") {
            try {
                const apiKey = 'f7147bf678f534a23a464e90c2246b43';
                const baseUrl = 'https://api.themoviedb.org/3';
                const searchEndpoint = '/search/movie';

                const url = `${baseUrl}${searchEndpoint}?api_key=${apiKey}` +
                    `&query=${searchQuery}&include_adult=false&page=${pageNumber}`;

                const response = await axios.get(url);
                const results = updateResponseData(response.data.results);

                setTotalPages(response.data.total_pages)
                // Update search results
                setSearchResults(results);
                // Add search query to search history only if it's not a duplicate
                if (!searchHistory.includes(searchQuery)) {
                    setSearchHistory((prevHistory) => [...prevHistory, searchQuery]);
                }

            } catch (error) {
                console.log(error);
            }
        }
    };
    // Function to handle adding a movie to the cart
    const handleAddToCart = async (movieId) => {
        const cartUrl = `/api/cart/add?id=${movieId}`;

        // Fetch the movie details from the searchResults using the movieId
        const movie = searchResults.find((result) => result.id === movieId);

        // Send a POST request to the '/api/cart' endpoint with the movie data in the request body
        try {
            await axios.post(cartUrl, movie);
            fetchCartItems();

        } catch (error) {
            console.log(error);
        }

    };
    // Function to handle loading more search results
    const handleLoadMore = async () => {
        if(pageNumber < totalPages) {
            try {
                const apiKey = 'f7147bf678f534a23a464e90c2246b43';
                const baseUrl = 'https://api.themoviedb.org/3';
                const searchEndpoint = '/search/movie';
                const discoverEndpoint = '/discover/movie';

                const genreIds = selectedGenres.map((genre) => genre).join(',');
                const url = `${baseUrl}${searchQuery ? searchEndpoint : discoverEndpoint}?api_key=${apiKey}` +
                    `&query=${searchQuery}&with_genres=${genreIds}&primary_release_year=${releaseYear}&include_adult=false&page=${pageNumber + 1}`;

                const response = await axios.get(url);
                const results = updateResponseData(response.data.results);
                // Append the new results to the existing search results
                setSearchResults((prevResults) => [...prevResults, ...results]);

                setPageNumber(pageNumber + 1);
            } catch (error) {
                console.log(error);
            }
        }
    };
    // Function to handle genre selection change
    const handleGenreChange = (event) => {
        const selectedGenreIds = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedGenres(selectedGenreIds);
    };

    // Function to update the response data by adding additional properties
    const updateResponseData = (results) => {
        return results.map((result) => ({
            ...result,
            price: PRICE, // Add the price here or fetch it from an API
            poster_path: result.poster_path ? `https://image.tmdb.org/t/p/w200${result.poster_path}` : popcornImage,
            imageUrl: result.poster_path ? `https://image.tmdb.org/t/p/w200${result.poster_path}` : popcornImage,
            releaseDate: result.release_date,
        }));
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Search Page</h2>

            <SearchForm
                searchQuery={searchQuery}
                selectedGenres={selectedGenres}
                releaseYear={releaseYear}
                genreOptions={genreOptions}
                onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
                onGenreChange={handleGenreChange}
                onReleaseYearChange={(e) => setReleaseYear(e.target.value)}
                onSearch={handleSearch}
                onDiscover={handleDiscover}
            />

            <SearchHistory
                searchHistory={searchHistory}
                setSearchHistory={setSearchHistory}
                onSearchHistoryItemClick={handleSearch}
                setSearchQuery = {setSearchQuery}
            />

            <h3>Search Results</h3>
            <SearchResults
                searchResults={searchResults}
                onAddToCart={handleAddToCart}
            />

            <div className="mt-4">
                {totalPages > 0 && (
                    <button className="btn btn-primary" onClick={handleLoadMore}>
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
