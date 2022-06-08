import { SearchButton } from '../common/Button';
import { useNavigate } from 'react-router-dom';

import SearchInput from '../common/Searchinput';
import useInput from '../hooks/useInput';

function Search() {
  const [place, onChange] = useInput('');
  const navigate = useNavigate();

  function onClick(event) {
    navigate(`/search/${place}`);
  }
  return (
    <div>
      <SearchInput onChange={onChange}></SearchInput>
      <SearchButton onClick={onClick}></SearchButton>
    </div>
  );
}

export default Search;
