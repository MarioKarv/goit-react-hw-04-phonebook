import css from './Filter.module.css'

const Filter = ({ filter, onChange }) => {
  return (
    <input
      className={css.input}
      type="text"
      name="filter"
      value={filter}
      onChange={({ target }) => onChange(target.value)}
      placeholder="Enter name for search"
    />
  );
};

export default Filter;
