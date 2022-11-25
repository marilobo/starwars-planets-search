import React from 'react';
import Filters from '../components/Filters';
import Forms from '../components/Forms';
import Table from '../components/Table';

function Home() {
  return (
    <div>
      <Forms />
      <Filters />
      <Table />
    </div>
  );
}

export default Home;
