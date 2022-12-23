import React from 'react';
import Filters from '../components/Filters';
import Forms from '../components/Forms';
import Table from '../components/Table';
import st from '../images/st.png';
import a from '../images/a.png';
import r from '../images/r.png';
import w from '../images/w.png';
import rs from '../images/rs.png';
import '../style/home.css';

function Home() {
  return (
    <div className="main-container">
      <span className="letters">
        <img src={ st } alt="s t" />
        <img src={ a } alt="a" />
        <img src={ r } alt="r" />
      </span>
      <span className="letters">
        <img src={ w } alt="w" />
        <img src={ a } alt="a" />
        <img src={ rs } alt="r s" />
      </span>
      <Forms />
      <Filters />
      <Table />
    </div>
  );
}

export default Home;
