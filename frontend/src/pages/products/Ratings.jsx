import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text }) => {
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars > 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`ml-1`} />
      ))}

      {halfStar === 1 && <FaStarHalfAlt className={`ml-1`} />}

      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className={`ml-1`} />
      ))}
      <span className={`rating-text ml-3`}>{text && text}</span>
    </div>
  );
};

export default Ratings;
