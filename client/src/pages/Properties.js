import React, { useEffect, useState } from 'react'
import { GET_PROPERTIES } from '../utils/mutations';
import { useQuery } from '@apollo/client'
import { PropertyCard } from '../components';



const Properties = () => {
    const [properties, setProperties] = useState([])



    const { data } = useQuery(GET_PROPERTIES);
    useEffect(() => {
        setProperties(data?.properties)
        console.log(data)
    }, [data])
    return (
        <div className='card_container'>
            {
                properties?.map(item => {
                    return (
                        <>
                            <PropertyCard key={item._id} available={item.isAvailable} id={item._id} description={item.description} name={item.name} price={item.night_cost} images={item.images} />
                        </>
                    )
                })
            }
        </div>
    )
}

export default Properties