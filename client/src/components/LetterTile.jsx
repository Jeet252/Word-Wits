import React from 'react';

export default function LetterTile({ letter, status, animDelayIndex }) {
  let tileClass = "tile";
  let style = {};

  if (status === 'active') {
    tileClass += " t-active";
  } else if (status === 'correct') {
    tileClass += " t-correct";
    style = { animationDelay: `${animDelayIndex * 120}ms` };
  } else if (status === 'present') {
    tileClass += " t-present";
    style = { animationDelay: `${animDelayIndex * 120}ms` };
  } else if (status === 'absent') {
    tileClass += " t-absent";
    style = { animationDelay: `${animDelayIndex * 120}ms` };
  }

  return (
    <div 
      className={tileClass} 
      style={style}
    >
      {letter}
    </div>
  );
}
