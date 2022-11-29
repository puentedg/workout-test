import React from 'react';
import { useQuery } from '@apollo/client';

import PositiveList from '../PositiveList';
import '../../styles/home.css';
// import PositiveForm from '../pages/Positive';

import { QUERY_POSITIVES } from '../../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSITIVES);
  const positives = data?.positives || [];


  return (
    <main className="main__page">
       <div>
      <h1 id="workout-header">WORKOUT BUDDY</h1>
      <p id="motivation-note">HERE FOR YOU ANYTIME!</p>
    </div>
      <div className="flex-row justify-center ">
        {/* <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <PositiveForm />
        </div> */}
        <div className="col-12 col-md-8 mb-3 positive__list">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="sub__title">
            <PositiveList
              positives={positives}
              title="Time to feel encouraged"
            />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
