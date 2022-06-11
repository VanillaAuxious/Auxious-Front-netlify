export default function SearchInput({ onChange }) {
  return (
    <input
      className='searchBox'
      placeholder='지역명을 입력하세요.'
      onChange={onChange}
    />
  );
}
