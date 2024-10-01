import React from 'react';
import './home.css'
import Cookies from 'universal-cookie';
import { Toaster } from 'react-hot-toast';

const Home = () => {
    const cookies = new Cookies();

    console.log(cookies.get('token'))
    ////////////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - My Home`;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    return (
        <>
            <Toaster />
            <div className='home'>



                {/* <div className='ourCategorysTitle'>
                Our Categorys
            </div>
            <div className='ourCategorys'>
                <CategorysCard
                    image={NaturalFlowers}
                    name="NaturalFlowers" />
                <CategorysCard
                    image={ArtificialFlowers}
                    name="Artificial flowers" />
                <CategorysCard
                    image={Perfumes}
                    name="Perfumes" />
                <CategorysCard
                    image={ArtificialFlowers}
                    name="Mugs" />
                <CategorysCard
                    image={Accessories}
                    name="Accessories" />
                <CategorysCard
                    image={Candles}
                    name="Candles" />
                <CategorysCard
                    image={Cake}
                    name="Cake" />
                <CategorysCard
                    image={GiftBox}
                    name="Gift Box" />

            </div> */}

            </div >
        </>
    );
}

export default Home;
