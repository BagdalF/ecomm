import Message from "../../components/Message";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Loader from "../../components/Loader";

const ProductCarousel = () => {
  const { data: products, isLoading, isError } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : isError ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="py-2 pr-1 xl:w-[40rem] lg:w-[40rem] md:w-[46rem] sm:w-[30rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[25rem]"
                />
                <div className="mt-3 flex justify-between ">
                  <div className="one ">
                    <h2>{name}</h2>
                    <p className="mb-2">${price}</p>
                    <p className="w-[20rem]">
                      {description.substring(0, 170)}
                      {description.length > 170 && "..."}
                    </p>
                  </div>
                  <div className="flex justify-between w-[20rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaClock className="mr-2" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2" /> Reviews: {numReviews}
                      </h1>
                    </div>
                    <div className="two">
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaShoppingCart className="mr-2" /> Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaBox className="mr-2" /> In Stock: {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
