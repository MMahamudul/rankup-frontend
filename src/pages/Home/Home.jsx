import React from 'react';
import Banner from '../../components/Home/Banner';
import PopularContests from '../../components/Home/PopularContests';
import TopReviews from './../../components/TopReviews/TopReviews';
import WinnerAdSection from '../../components/Winners/WinnerAdSection';



const Home = () => {
    return (
        <div>
           <Banner />
           <PopularContests/>
           <WinnerAdSection/>
           
           <TopReviews/>
            
        </div>
    );
};

export default Home;