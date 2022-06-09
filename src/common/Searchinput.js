export default function SearchInput({ onChange }) {
  return (
    <div>
      <input
        className='searchBox'
        placeholder='지역명을 입력하세요.'
        onChange={onChange}
      />
    </div>
  );
}
