import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [searchParams] = useSearchParams();

    const city = searchParams.get('city') || '';

    useEffect(() => {
        (async () => {
            try {
                let url = 'http://localhost:3001/search';
                if (city) {
                    url += `?city=${encodeURIComponent(city)}`;
                }
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                setHotels(data.results);
            } catch (error) {
                console.error('Помилка завантаження готелів:', error);
            }
        })();
    }, [city]);

    return (
        <div>
            <h2>Готелі {city ? `в місті "${city}"` : ''}</h2>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {hotels.map(hotel => (
                    <div key={hotel.id} style={{border: '1px solid #ccc', margin: 10, padding: 10}}>
                        <h3>{hotel.name}</h3>
                        <p>{hotel.address}, {hotel.city}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HotelList;
