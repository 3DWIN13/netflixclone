const API_KEY = '38c007f28d5b66f36b9c3cf8d8452a4b';
const API_BASE = 'https://api.themoviedb.org/3'

/*
-original de netflix
-recomendados(tredint)
-top rated
-action
-comedia
-terror
-romance
-documentarios 
 */

 const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
 }

export default{

    getHomeList: async () =>{
        return[
            {
                slug: 'original',
                title: 'Originales de netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=es-ES&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para ti',
                items: await basicFetch(`/trending/all/week?language=es-ES&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'TOP PELICULAS',
                items: await basicFetch(`/movie/top_rated?language=es-ES&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Accion',
                items: await basicFetch(`/discover/movie?with_genres=28&language=es-Es&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=es-Es&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=es-Es&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=es-Es&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentales',
                items: await basicFetch(`/discover/movie?with_genres=99&language=es-Es&api_key=${API_KEY}`)
            },
        ]
    },
    getMovieinfo: async(movieid, type)=>{
        let info={};

        if (movieid) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieid}?language=es-Es&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieid}?language=es-Es&api_key=${API_KEY}`);
                    break;
            
                default:
                   
                    break;
            }
        }
        return info
    }
}