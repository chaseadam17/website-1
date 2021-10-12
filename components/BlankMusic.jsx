import { useState } from "react";

const BlankMusic = ({ className, onClick }) => {

  const toggleAudio = () => {
    const mp3 = document.getElementById('mp3');
    const play = document.getElementById("play");
    const pause = document.getElementById("pause");

    if (play.classList.contains('hidden')) {
      mp3.pause();
      play.classList.remove('hidden');
      pause.classList.add('hidden');
      onClick(false);
    } else {
      mp3.play();
      play.classList.add('hidden');
      pause.classList.remove('hidden');
      onClick(true);
    }
  }

  return (
    <div onClick={toggleAudio} className="cursor-pointer z-50">
      <svg id="play" width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="bg-gray-900 p-1 h-8 w-8 rounded-full">
        <path d="M4.33993 2.93L2.92993 4.34L7.28993 8.7L6.99993 9H2.99993V15H6.99993L11.9999 20V13.41L16.1799 17.59C15.5299 18.08 14.7999 18.47 13.9999 18.7V20.76C15.3399 20.46 16.5699 19.84 17.6099 19.01L19.6599 21.06L21.0699 19.65L4.33993 2.93ZM9.99993 15.17L7.82993 13H4.99993V11H7.82993L8.70993 10.12L9.99993 11.41V15.17ZM18.9999 12C18.9999 12.82 18.8499 13.61 18.5899 14.34L20.1199 15.87C20.6799 14.7 20.9999 13.39 20.9999 12C20.9999 7.72 18.0099 4.14 13.9999 3.23V5.29C16.8899 6.15 18.9999 8.83 18.9999 12ZM11.9999 4L10.1199 5.88L11.9999 7.76V4ZM16.4999 12C16.4999 10.23 15.4799 8.71 13.9999 7.97V9.76L16.4799 12.24C16.4899 12.16 16.4999 12.08 16.4999 12Z" fill="white"/>
      </svg>

      <svg id="pause" width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="hidden bg-gray-900 p-1 h-8 w-8 rounded-full">
        <path d="M3 9V15H7L12 20V4L7 9H3ZM10 8.83V15.17L7.83 13H5V11H7.83L10 8.83ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="white"/>
      </svg>

      <audio id="mp3">
        <source src="Blank_Banshee_-_B-Start_Up.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default BlankMusic;