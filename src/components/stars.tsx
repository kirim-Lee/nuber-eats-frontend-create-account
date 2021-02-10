import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarLine } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IStar {
  rating: number;
  small?: boolean;
}
export const Stars: React.FC<IStar> = ({ rating, small }) => {
  const textSize = small ? 'text-xs' : 'text-sm';
  return (
    <>
      {Array(Math.floor(rating))
        .fill(0)
        .map((v, index) => {
          return (
            <FontAwesomeIcon
              icon={faStar}
              key={index}
              className={`text-pink-${index + 2}00 ${textSize}`}
            />
          );
        })}
      {Math.floor(rating) < rating && (
        <FontAwesomeIcon
          icon={faStarHalf}
          className={`text-pink-${Math.floor(rating) + 2}00 ${textSize}`}
        />
      )}
      {Array(Math.floor(5 - rating))
        .fill(0)
        .map((v, index) => {
          return (
            <FontAwesomeIcon
              icon={faStarLine}
              key={index}
              className={`text-violet-300 ${textSize}`}
            />
          );
        })}
    </>
  );
};
