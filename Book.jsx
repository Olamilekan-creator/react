import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Price from "./Price";

const Book = ({ book }) => {
  const [img, setImg] = useState();

  const mountedRef = useRef(true);

  useEffect(() => {
    const image = new Image();
    image.src =book.url;
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
        }
      }, 300)
    };
    return () => {
      mountedRef.current = false;
    }
  });

  return (
    <div className="book">
      {img ? (
        <>
          <Link to="/books/1">
            <figure className="book__img--wrapper">
              <img
                src={img.src}
                alt=""
                className="book__img"
               
              />
            </figure>
          </Link>
          <div className="book__title">
            <Link to="/books/1" className="book__title--link">
              {book.title}
            </Link>
          </div>
          <Rating rating={book.rating} />
          <Price
            salePrice={book.salePrice}
            originalPrice={book.originalPrice}
          />
        </>
      ) : (
        <>
          <div className="book__img--selection"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      )}
    </div>
  );
};

export default Book;
