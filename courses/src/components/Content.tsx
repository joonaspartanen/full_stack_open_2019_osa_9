import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part, index) => (
        <Part key={index} part={part}></Part>
      ))}
    </>
  );
};

export default Content;
