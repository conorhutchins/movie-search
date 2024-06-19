import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleSearch = () => {
        if (searchTerm.trim()) {
            onSearch(searchTerm.trim());
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className={styles.searchBarContainer}>
            <input
                type="text"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for movies..."
                onKeyDown={handleKeyDown}
            />
            <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;