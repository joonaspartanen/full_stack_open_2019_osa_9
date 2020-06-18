import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { CoursePart } from './types';

const App: React.FC = () => {
  const courseName = 'Half Stack application development';

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
    {
      name: 'My course',
      exerciseCount: 20,
      description: 'Clear description',
      maxParticipants: 6,
    },
  ];

  return (
    <div>
      <Header name={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total
        exercisesSum={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
