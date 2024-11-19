import { Button } from '@chakra-ui/react';
import React from 'react';
import { RiSearchLine } from "react-icons/ri";

type SearchButtonProps = {
  onSearch: () => void;
};

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  return (
    <Button variant='ghost' size='2xs' onClick={onSearch}><RiSearchLine style={{color:'#5e5ef3'}} /></Button>
  );
};

export default SearchButton;
