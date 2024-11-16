import React from 'react';

type SearchButtonProps = {
  onSearch: () => void;
};

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  return (
    <button onClick={onSearch}>Search</button>
  );
};

export default SearchButton;
