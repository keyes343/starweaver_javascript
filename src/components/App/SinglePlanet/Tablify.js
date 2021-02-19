import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
 
const Tablify = (props) => {
    const {planet,header,actions,planetPropertyName} = props;

    const style = React.useMemo(()=>{
        return {
            overflowing:{
                overflow:'auto'
            },
            planetName:{
                fontSize: '2rem',
                padding:'2rem',
                // border:'2px solid red'
            },
            grid_wrapper: {
                overflow: "hidden",
                // border:'2px solid red',
                display:'grid',
                gridTemplateColumns: `repeat(${planetPropertyName==='films'?8:11},auto)`,
                gridTemplateRows: 'auto',
                gridAutoColumns: 'auto',
                gridAutoRows: 'auto',
                height:'auto', width:'auto',
            },
            leftbox:{
                // border: '2px solid blue',
                padding: '2rem',
            },
            rightbox:{
                // border: '2px solid green',
                padding: '2rem',
            },

            headerCell:{
                // border: '1px solid orange',
                // maxWidth: '15rem',
                overflow: 'hidden',
                padding: '1rem',
                fontWeight: "bold",
                fontSize: '1rem',
                textTransform:'uppercase'
            },
            datacell:{
                borderBottom: '1px solid',
                padding: '0 1rem',
                overflow: 'hidden',
                fontSize: '1.1rem',
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
            }
        }
    },[planetPropertyName])

    const [planetProperty, setPlanetProperty] = useState(false); // films or residents


    const fetchProperty = React.useCallback(async()=>{
        if(!planetProperty){
            const urls = props.planet[props.planetPropertyName];

            const promises = [];
            urls.forEach(url=>{
                promises.push( axios.get(url) )
            })
            const results = await Promise.all([...promises]);
            if(results){
                const a = results.map((x,i)=>{
                    return x.data;
                });
                console.log({a,planetPropertyName})
                setPlanetProperty(a)
            }
        }
    },[planetProperty, planetPropertyName, props.planet, props.planetPropertyName])

    useEffect(() => {
        fetchProperty();
    }, [fetchProperty]);


    const datify = (obj,key) => {
        return(
            <div key={`${Math.random()}`} style={{...style.datacell }}  >
                {
                    `
                    ${new Date(obj[key]).getFullYear()}-${new Date(obj[key]).getMonth()}-${new Date(obj[key]).getDate()}                                          
                    ` 
                }
            </div>
        )
    }

    return ( 
        <div>
            <div style={style.planetName} >
                Planet - {props.planet.name}
            </div>


            <div style={style.overflowing} >
                <div style={style.grid_wrapper} >
                    {/* TABLE HEADING ROW */}
                    {
                        props.header.map((head,i)=>{
                            return(
                                <div key={i} style={style.headerCell} >
                                    {head}
                                </div>
                            )
                        })
                    }


                    {/* MAP DATA */}
                    {
                        planetProperty && planetProperty.map((film,i)=>{
                            return props.header.map((head,j)=>{
                                if(head === 'actions'){
                                    return(
                                        <div key={`${i}${j}`}  style={{...style.datacell,padding:'0 1rem', width:'10rem', display:'flex',flexWrap:'wrap'}}>
                                            {
                                                props.actions.map((action,k)=>{
                                                    return(
                                                        <div key={`${i}${j}${k}`} style={{margin:'0.3rem'}} >
                                                            <button >
                                                                {/* {i} {j} {k} */}
                                                                {action}
                                                            </button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }else {
                                    if(['created','edited'].includes(head)){
                                        return datify(film,head);
                                    }else return <div  key={`${i}${j}`}  style={style.datacell} >
                                        {/* {planetProperty} */}
                                        { film[head] }
                                    </div>
                                }
                            })
                        })
                    }
                </div>
            </div>
            
        </div>
     );
}
 
export default Tablify;