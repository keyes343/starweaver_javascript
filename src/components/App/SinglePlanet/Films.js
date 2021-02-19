import * as React from 'react';
import { useState, useEffect } from 'react';
import { t,c,d } from '../../index';
import axios from 'axios';
import Tablify from './Tablify';

import { useParams } from 'react-router-dom';
 
const Films = ({planet}) => {

    const ctx = c.UseState();
    const dispatch = c.UseDispatch();

    const header = [ // text for display + button or not

        "title",
        "episode_id",
        
        "director",
        "producer",
        "release_date",

        "created",
        "edited",
        // "url",
        "actions"
    ]
    
    const actions = [
        "planets",
        "species",
        "opening_crawl",
        "starships",
        "vehicles",
        "characters"
    ]

    const [films, setFilms] = useState(false);


    const fetchFilms = React.useCallback(async()=>{
        if(!films){
            const urls = planet.films;

            const promises = [];
            urls.forEach(url=>{
                promises.push( axios.get(url) )
            })
            const results = await Promise.all([...promises]);
            if(results){
                const a = results.map((x,i)=>{
                    return x.data;
                });
                console.log({a})
                setFilms(a)
            }
        }
    },[films, planet.films])

    useEffect(() => {
        fetchFilms();
    }, [fetchFilms]);

    return ( 
        <div >
            <Tablify
                planet ={planet}
                header={header}
                actions={actions}
                planetPropertyName='films'
            />
        </div>
     );
}
 
export default Films;