import  React, { useState, useRef } from 'react';
import useImageIntersections from "../../hooks/useImageIntersection";

import "./MovieCard.css";

const  MovieCard = (props) => {
    const { posterPath, title } = props;
    const [isInViewPort, setIsInViewPort] = useState(false);
    const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
    const [fallBackimage, setFallBackImage] = useState("");

    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);

  
    useImageIntersections(imageContainerRef, () => {
        setIsInViewPort(true);
    });

    return (
        <div className="image-container" ref={imageContainerRef}>
             { isInViewPort &&
                 (
                     <>
                   <img src={fallBackimage ? fallBackimage : `${process.env.PUBLIC_URL}/assets/${posterPath}`} alt="not available" 
                   onError={() => setFallBackImage(`${process.env.PUBLIC_URL}/assets/placeholder_for_missing_posters.png`)}
                   ref={imageRef}
                   className={`image-high ${isMainImageLoaded && 'loaded'}`} onLoad={() => setIsMainImageLoaded(true)}/>
                    <span className="movieTitle">{title}</span>
                    </>
                 )}
        </div>
     )
};

export default MovieCard;

