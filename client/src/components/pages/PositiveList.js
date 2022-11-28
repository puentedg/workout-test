import React from 'react';

const PositiveList = ({ positives, title }) => {
  if (!positives.length) {
    return <h3>Let's encourage someone today</h3>;
  }

  return (
    <div className='positive__container'>
      <h3>{title}</h3>
      {positives &&
        positives.map((positive) => (
          <div key={positive._id} className="positive__item">
            <h4 className="positive__header">
              {positive.positiveAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                posted on {positive.createdAt}
              </span>
            </h4>
            <div className="positive__text">
              <p>{positive.positiveText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PositiveList;