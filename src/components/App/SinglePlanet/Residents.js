import * as React from 'react';
import { useState, useEffect } from 'react';
import { t,c } from '../../index';

import { useParams } from 'react-router-dom';
import Tablify from './Tablify';

const Residents = ({planet}) => {

    const params = useParams();
    const ctx = c.UseState();
    const dispatch = c.UseDispatch();

    const header = [

        "name",
        "height",
        "mass",
        "hair_color",
        "skin_color", 
        "eye_color",
        "birth_year",
        "gender",
        // "homeworld",

        "created",
        "edited",
        // "url",
        "actions"
    ]
    
    const actions = [
        "films",
        "species",
    
        "vehicles",
        "starships",
    ]
    
    
    return ( 
        <div >
            {/* HELLOOOOO */}
            <Tablify
                planet ={planet}
                header={header}
                actions={actions}
                planetPropertyName='residents'
            />
        </div>
     );
}
 
export default Residents;