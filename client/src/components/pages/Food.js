import React, { useState } from 'react';
// import "../styles/FoodPage.css"; //change path
import { useQuery } from '@apollo/client';

import { QUERY_FOOD } from '../../utils/queries';

export default function Workout() {
  const { loading, data } = useQuery(QUERY_FOOD);
  const [foods, setFoods] = useState([]);

  const foodData = data?.food || [];

  const handleChange = (event) => {
    const cuisine_name = event.target.value;

    var foodList;

    if (cuisine_name === 'Asian') {
      foodList = foodData.find((meal) => meal.cuisine_name === 'Asian');
      setFoods(foodList.foods);
    } else if (cuisine_name === 'Mexican') {
      foodList = foodData.find((meal) => meal.cuisine_name === 'Mexican');
      setFoods(foodList.foods);
    } else if (cuisine_name === 'Carribean') {
      foodList = foodData.find((meal) => meal.cuisine_name === 'Carribean');
      setFoods(foodList.foods);
    } else if (cuisine_name === 'Italian') {
      foodList = foodData.find((meal) => meal.cuisine_name === 'Italian');
      setFoods(foodList.foods);
    } else if (cuisine_name === 'European') {
      foodList = foodData.find((meal) => meal.cuisine_name === 'European');
      setFoods(foodList.foods);
    }
    setFoods(foodList.foods);
  };
  console.log(foodData);
  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          <h1>Healthy Foods</h1>
          <label>Which cuisine would you like to eat?</label>
          <select name="food" onChange={handleChange}>
            {foodData.map((food) => {
              return (
                <option key={food.cuisine_name} value={food.cuisine_name}>
                  {food.cuisine_name}
                </option>
              );
            })}
          </select>
          <ul>
            {foods.map((food) => {
              return (
                <div key={food.food_name}>
                  <li>{food.food_name}</li>
                  <iframe
                    width="560"
                    height="315"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    src={food.source}
                    title={food.food_name}
                  ></iframe>
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
