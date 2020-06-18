import React from 'react';

const Total: React.FC<{ exercisesSum: number }> = ({ exercisesSum }) => {
  return <p>Number of exercises: {exercisesSum}</p>;
};

export default Total;
