import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout/ Layout.jsx';
import AboutPage from './page/About/About.jsx';
import Home from './page/Home/Home.jsx';
import HotelList from './page/HotelList/HotelList.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/hotels/*" element={<HotelList/>}/>
                <Route path="about" element={<AboutPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;