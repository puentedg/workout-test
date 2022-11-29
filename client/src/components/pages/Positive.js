import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import '../../styles/positive.css'

import { ADD_POSITIVE } from '../../utils/mutations';
import { QUERY_POSITIVES } from '../../utils/queries';

import Auth from '../../utils/auth';

const PositiveForm = () => {
  const [positiveText, setPositiveText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPositive, { error }] = useMutation(ADD_POSITIVE, {
    update(cache, { data: { addPositive } }) {
      try {
        const { positives } = cache.readQuery({ 
          query: QUERY_POSITIVES,
         
         });

        cache.writeQuery({
          query: QUERY_POSITIVES,
          data: { positives: [addPositive, ...positives] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPositive({
        variables: {
          positiveText,
          positiveAuthor: Auth.getProfile().data.username,
        },
      });

      setPositiveText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'positiveText' && value.length <= 150) {
      setPositiveText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className='positive__container'>
      <h3>Share some positivity</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 150 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/150
          </p>
          <div className='form__container'>
          <form
            className="form"
            onSubmit={handleFormSubmit}
          >
            <div className="text-container">
              <textarea
                name="positiveText"
                placeholder="Time to share your good energy..."
                value={positiveText}
                className="text-input"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn__submit" type="submit">
                Add your words of encouragement 
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
          </div>
        </>
      ) : (
        <p className="p__login">
          You need to be logged in to share your words of encouragement. Please{' '}
          <Link to="/login" className='btn'>login</Link> or <Link to="/signup" className='btn'>signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PositiveForm;