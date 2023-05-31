import React from 'react';
import { BiSearch, BiTrash } from 'react-icons/bi';
const SearchHistory = ({
                           searchHistory,
                           setSearchHistory,
                           onSearchHistoryItemClick,
                           setSearchQuery,
                       }) => {

    // Function to handle clearing the search history
    const handleClearSearchHistory = () => {
        // Clear the search history
        setSearchHistory([]);
    };
    // Function to handle deleting a search history item
    const handleDeleteSearchHistoryItem = (item) => {
        // Remove the selected item from search history
        setSearchHistory((prevHistory) =>
            prevHistory.filter((historyItem) => historyItem !== item)
        );
    };
    // Function to handle clicking on a search history item
    const handleSearchHistoryItemClick = (item) => {
        setSearchQuery(item);
        onSearchHistoryItemClick(item);
    };

    return (
        <div className="search-history">
            <h3 className="mb-3">Search History</h3>
            <button
                className="btn btn-secondary mb-3"
                onClick={handleClearSearchHistory}
            >
                Clear History
            </button>
            <ul className="list-group">
                {searchHistory.map((item, index) => (
                    <li
                        key={`${item}-${index}`}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span className="history-item">{item}</span>
                        <button
                            className="btn btn-secondary history-item me-2 ms-auto"
                            onClick={() => handleSearchHistoryItemClick(item)}
                        >
                            <BiSearch />
                        </button>
                        <button
                            className="btn btn-danger ml-2"
                            onClick={() => handleDeleteSearchHistoryItem(item)}
                        >
                            <BiTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHistory;
