import React from 'react';

const Note = (props) => {
  const { date, content } = props;
  return (
    <div className="note">
      <span>{date}</span>
      {content}
    </div>
  );
};

export default Note;
