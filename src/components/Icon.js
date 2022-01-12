import React from 'react';

const Icon = ({ svg, className }) => {
  return (
    <svg className={className}>
      <use href={`/icons.svg#${svg}`}></use>
    </svg>
  );
};

export default Icon;
