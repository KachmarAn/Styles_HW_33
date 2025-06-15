import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/destinations')
            .then(res => res.json())
            .then(data => setDestinations(data));
    }, []);

    const handleSearch = (city) => {
        navigate(`/hotels?city=${encodeURIComponent(city)}`);
    };

    return (
        <div>
            <h1>Обери місто</h1>
            <ul>
                {destinations.map(dest => (
                    <li key={dest.id}>
                        <button onClick={() => handleSearch(dest.label)}>{dest.label}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Home;