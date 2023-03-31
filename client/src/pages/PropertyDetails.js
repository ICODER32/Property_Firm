
import { GET_PROPERTY } from '../utils/mutations';
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Image } from '@chakra-ui/react';
import { Navbar } from '../components';
import { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { CREATE_CHECKOUT_SESSION } from '../utils/mutations';

const PropertyDetails = () => {


    const loggedIn = Auth.loggedIn()

    const [nights_number, setNightNumber] = useState(0)
    const { id } = useParams()
    const [bill, setBill] = useState(0)


    const { data } = useQuery(GET_PROPERTY, {
        variables: { propertyId: id },
    });


    const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);


    // console.log(data)
    const property = data?.property
    let date = new Date().toLocaleDateString()
    console.log(property?.night_cost)
    useEffect(() => {
        setBill(nights_number * property?.night_cost)
    }, [nights_number, property?.night_cost])


    const handleSubmit = async () => {
        try {
            const { data } = await createCheckoutSession({
                variables: { propertyId: id, nights: parseInt(nights_number) },
            });
            window.location = data.createCheckoutSession.url;
        } catch (error) {
            alert(error)
        }

    }
    return (
        <>
            <Navbar />
            <h1>{property?.name}</h1>
            <div className='property_main'>
                <Carousel showThumbs={false} width={500}>
                    {property?.images.map(item => (
                        <Image key={item} src={item} />
                    ))}
                </Carousel>
                <div>
                    <div className='property_main_details'>
                        <div>
                            <p>Check in Date</p>
                            <p>{date}</p>
                        </div>
                        <div>
                            <p>Check out Date</p>
                            <p>--</p>
                        </div>
                    </div>
                    <div className='night_input'>
                        <label htmlFor="night_input">How Many nights you want to reserve?</label>
                        <input id='night_input'
                            onChange={(e) => {
                                setNightNumber(e.target.value)
                            }}
                            value={nights_number} type="number" />
                    </div>
                    {
                        loggedIn ? (

                            <button onClick={handleSubmit} className='reserve_btn'>Reserve</button>
                        ) : (
                            <button disabled className='reserve_btn disabled'>Log in to reserve</button>

                        )
                    }
                    <div className='bill_card'>
                        <h3>Bill Details</h3>
                        <div className='bill_item'>
                            <p>One Night Charges </p>
                            <p>{property?.night_cost}</p>
                        </div>

                        <div className='bill_item total_bill'>
                            <p>Grand Total </p>
                            <p>{bill}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyDetails