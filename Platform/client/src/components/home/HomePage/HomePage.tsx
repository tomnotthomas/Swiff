import './HomePage.css';
import List from '../list-component/List-component.tsx';
import TopBanner from '../top-banner-component/Top-banner-component.tsx';
import {useState, useEffect} from 'react';



function Home({games, steamGames}) {


  return (
      <div>
        <TopBanner games={games}/>
        <h1> My Steam Games</h1>
        <List games ={steamGames}/>
        <h1>Games to buy</h1>
        <List games ={games}/>
      </div>
  );
}

export default Home;
git