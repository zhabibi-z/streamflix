import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => {
        setApiData(res.results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    cardsRef.current.addEventListener('wheel', handleWheel);
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {loading
          ? Array(6).fill(0).map((_, i) => (
              <div className="card skeleton-card" key={i}>
                <div className="skeleton-img" />
                <div className="skeleton-text" />
              </div>
            ))
          : apiData.map((card, index) => (
              <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
              </Link>
            ))
        }
      </div>
    </div>
  )
}

export default TitleCards
