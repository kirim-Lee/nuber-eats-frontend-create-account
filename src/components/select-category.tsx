import { Category } from '../__generated__/globalTypes';

export const SelectCategory = ({ register }) => {
  return (
    <select ref={register} name="category" className="input-text">
      {Object.keys(Category).map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
