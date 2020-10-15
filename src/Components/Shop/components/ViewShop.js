import React from 'react'
import {useParams} from 'react-router-dom';
export const ViewShop = () => {
    const {shop_id} = useParams();
    return (
        <div>
            <h1>hello {shop_id}</h1>
        </div>
    )
}
