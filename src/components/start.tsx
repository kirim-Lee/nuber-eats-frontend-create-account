import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IStar {
  rating: number;
}
export const Stars: React.FC<IStar> = ({ rating }) => {
  return (
    <>
      {Array(Math.floor(rating))
        .fill(0)
        .map((v, index) => {
          return (
            <FontAwesomeIcon
              icon={faStar}
              key={index}
              className={`text-pink-${index + 2}00 text-sm`}
            />
          );
        })}
      {Math.floor(rating) < rating && (
        <FontAwesomeIcon
          icon={faStarHalf}
          className={`text-pink-${Math.floor(rating) + 2}00 text-sm`}
        />
      )}
    </>
  );
};
