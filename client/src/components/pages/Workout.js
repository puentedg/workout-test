import React, { useState } from 'react';
import "../../styles/WorkoutPage.css"; 
import { useQuery } from '@apollo/client';
import { QUERY_EXERCISES } from '../../utils/queries';

export default function Workout() {
  const { loading, data } = useQuery(QUERY_EXERCISES);
  const [exercises, setExercises] = useState([]);
  const exerciseData = data?.workout || [];
  const handleChange = (event) => {
    const muscle_group = event.target.value;
    var exerciseList;
    if (muscle_group === 'Legs') {
      exerciseList = exerciseData.find(
        (muscle) => muscle.muscle_group === 'Legs'
      );
      setExercises(exerciseList.exercises);
    } else if (muscle_group === 'Back') {
      exerciseList = exerciseData.find(
        (muscle) => muscle.muscle_group === 'Back'
      );
      setExercises(exerciseList.exercises);
    } else if (muscle_group === 'Shoulders') {
      exerciseList = exerciseData.find(
        (muscle) => muscle.muscle_group === 'Shoulders'
      );
      setExercises(exerciseList.exercises);
    } else if (muscle_group === 'Chest') {
      exerciseList = exerciseData.find(
        (muscle) => muscle.muscle_group === 'Chest'
      );
      setExercises(exerciseList.exercises);
    } else if (muscle_group === 'Arms') {
      exerciseList = exerciseData.find(
        (muscle) => muscle.muscle_group === 'Arms'
      );
      setExercises(exerciseList.exercises);
    } else {
      exerciseList = exerciseData.find(
        (muscle) => muscle.muscle_group === 'Abs'
      );
      setExercises(exerciseList.exercises);
    }
  };
  console.log(data);
  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          <h1 id="workout-header">WORKOUTS</h1>
          <div className="select-box">
            <label className="muscle-label">
              Which muscle group are you targeting?
            </label>
            <select
              className="muscle-select"
              name="exercise"
              onChange={handleChange}
            >
              {exerciseData.map((exercise) => {
                return (
                  <option
                  key={exercise.muscle_group}
                  value={exercise.muscle_group}
                >
                    {exercise.muscle_group}
                  </option>
                );
              })}
            </select>
          </div>
          <ul className="exercise-box">
            {exercises.map((exercise) => {
              return (
                <div key={exercise.exercise_name}>
                  <li className="exercise-list">{exercise.exercise_name}</li>
                  <iframe
                    width="560"
                    height="315"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    src={exercise.source}
                    title={exercise.exercise_name}
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
