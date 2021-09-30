import React,{useEffect, useState} from 'react';
import './App.css'
import MovieRow from './componetes/MovieRow';
import Tmdb from './Tmdb'
import FeaturedMovie from './componetes/FeaturedMovie'
import Header from './componetes/Header';

export default ()=>{

  const [movieList, setMovieList]=useState([])
  const [featuredData, setFeaturedata]=useState(null)
  const [blackHeader, setBlackHeader]=useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      //pegar la lista de todo
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      //pegar el destacado
      let original = list.filter(i=>i.slug=== 'original');
      let randonsfilm = Math.floor(Math.random() * (original[0].items.results.length -1));
      let elegido = original[0].items.results[randonsfilm];

      let elegidoinfo = await Tmdb.getMovieinfo(elegido.id, 'tv');
      setFeaturedata(elegidoinfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () =>{
      if (window.scrollY>10) {
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }

    }
    window.addEventListener('scroll', scrollListener);
    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);
  return(
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData &&
      <FeaturedMovie item={featuredData}/>
      }
        <section className="lists">
          {movieList.map((item, key)=>(
            
              <MovieRow key={key} title={item.title} items={item.items}/>
            
          ))}
        </section>
        <footer>
          EDWIN
        </footer>
        {movieList<=0 &&
        <div className="loading">
          <img src="https://c.tenor.com/DQyztbEmqnYAAAAM/netflix-loading.gif" alt="cri dame amore"></img>
        </div>
        }
    </div>
  );
}