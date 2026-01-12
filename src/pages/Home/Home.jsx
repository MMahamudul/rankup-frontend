import React from 'react';
import Banner from '../../components/Home/Banner';
import PopularContests from '../../components/Home/PopularContests';
import TopReviews from './../../components/TopReviews/TopReviews';
import WinnerAdSection from '../../components/Winners/WinnerAdSection';
import Highlights from '../../components/Highlights';
import Statistics from '../../components/Statistics';
import FAQ from '../../components/FAQ';
import Newsletter from '../../components/Newsletter';
import Blogs from '../../components/Blogs';
import Testimonials from '../../components/Testimonials';



const Home = () => {
    return (
        <div>
           <Banner />
           <PopularContests/>
           <WinnerAdSection/>
           <Highlights></Highlights>
           <Blogs></Blogs>
           <Statistics></Statistics>
           <Testimonials></Testimonials>
           <TopReviews/>
           
           <FAQ></FAQ>
           <Newsletter></Newsletter>
            
        </div>
    );
};

export default Home;