import React, { useEffect, useState } from 'react';
import Note from '../components/Note';
import Navigation from '../components/Navigation';
import start from '../assets/start.svg';
import stop from '../assets/stop.svg';

const Home = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const [notes, setNotes] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const updateNotes = () => {
    fetch('/user/notes', {
      method: 'get',
    })
      .then((res) => res.json())
      .then((data) => setNotes(data.notes.notes));
  };

  useEffect(() => {
    updateNotes();
  }, []);

  recognition.onresult = (e) => {
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;
    const upperCase =
      transcript.charAt(0).toUpperCase() + transcript.substring(1);
    fetch('/user/note', {
      method: 'post',
      body: JSON.stringify({ content: upperCase }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => updateNotes());
  };

  const handleClick = (event) => {
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="notes-container">
        {notes
          .slice(0)
          .reverse()
          .map((note) => {
            const { _id, date, content } = note;
            return <Note key={_id} date={date} content={content} />;
          })}
      </div>
      <div className="button-container">
        <button onClick={handleClick}>
          {isRecording ? (
            <>
              <img src={stop} alt="stop" /> Stop Recording
            </>
          ) : (
            <>
              <img src={start} alt="start" /> Start Recording
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Home;
