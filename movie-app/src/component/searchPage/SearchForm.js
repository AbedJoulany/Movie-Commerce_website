import React, {useState} from 'react';

const SearchForm = ({
                        searchQuery,
                        selectedGenres,
                        releaseYear,
                        genreOptions,
                        onSearchQueryChange,
                        onGenreChange,
                        onReleaseYearChange,
                        onSearch,
                        onDiscover,
                    }) => {

    const [error, setError] = useState('');
    // Handle search button click
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setError('Please enter a search term.');
        } else {
            setError('');
            onSearch(searchQuery);
        }
    };
    // Handle discover button click
    const handleDiscover = () => {
        if (selectedGenres.length === 0 || releaseYear.trim() === '') {
            setError('Please select a genre and enter a release year.');
        } else {
            setError('');
            onDiscover();
        }
    };
    return (
        <div className="row mb-3">
            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search movies"
                    value={searchQuery}
                    onChange={onSearchQueryChange}
                />
            </div>
            <div className="col-md-4">
                <select
                    className="form-control"
                    value={selectedGenres[0]}
                    onChange={onGenreChange}
                >
                    <option value="">Select Genre</option>
                    {genreOptions.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-md-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Release year"
                    value={releaseYear}
                    onChange={onReleaseYearChange}
                />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="mt-3">
                <button className="btn btn-primary mr-2" onClick={handleSearch}>
                    Search
                </button>
                <button className="btn btn-primary" onClick={handleDiscover}>
                    Discover
                </button>
            </div>
        </div>
    );
};

export default SearchForm;
