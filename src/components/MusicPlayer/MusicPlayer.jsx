import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Your favorite songs list
  const songs = [
    {
      title: "Paint It, Black",
      artist: "The Rolling Stones",
      audioUrl: process.env.PUBLIC_URL + "/music/song1.mp3",
      coverUrl: process.env.PUBLIC_URL + "/music/cover1.jpg"
    },
    {
      title: "Sultans of Swing",
      artist: "Dire Straits",
      audioUrl: process.env.PUBLIC_URL + "/music/song2.mp3",
      coverUrl: process.env.PUBLIC_URL + "/music/cover2.jpg"
    },
    {
      title: "Soldier of Fortune",
      artist: "Deep Purple",
      audioUrl: process.env.PUBLIC_URL + "/music/song3.mp3",
      coverUrl: process.env.PUBLIC_URL + "/music/cover3.jpg"
    }
  ];

  // Update song progress
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        const duration = audioRef.current.duration;
        const currentTime = audioRef.current.currentTime;
        if (duration) {
          setProgress((currentTime / duration) * 100);
        }
      }, 1000);
    } else {
      clearInterval(progressIntervalRef.current);
    }

    return () => clearInterval(progressIntervalRef.current);
  }, [isPlaying]);

  // Play or pause the song
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Go to next song when current song ends
  const handleSongEnd = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setProgress(0);
    
    // Wait a moment before playing the next song
    setTimeout(() => {
      audioRef.current.play().catch(err => console.error("Error playing next song:", err));
    }, 300);
  };

  // Go to next song manually
  const goToNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setProgress(0);
    
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play().catch(err => console.error("Error playing next song:", err));
      }, 300);
    }
  };

  // Go to previous song manually
  const goToPrevSong = () => {
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setProgress(0);
    
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play().catch(err => console.error("Error playing previous song:", err));
      }, 300);
    }
  };

  // Current song data
  const currentSong = songs[currentSongIndex];

  return (
    <div className="audio-player-container">
      <div className="audio-player">
        <div 
          className="album-cover" 
          style={{ backgroundImage: `url(${currentSong.coverUrl})` }}
        ></div>
        <div className="player-controls">
          <div className="song-info">
            <div className="song-title">{currentSong.title}</div>
            <p className="artist">{currentSong.artist}</p>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="buttons">
            <button className="prev-btn" onClick={goToPrevSong}>
              <svg viewBox="0 0 16 16" className="bi bi-skip-backward-fill" fill="currentColor" height="12" width="12" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"/>
              </svg>
            </button>
            {!isPlaying ? (
              <button className="play-btn" onClick={togglePlay}>
                <svg viewBox="0 0 16 16" className="bi bi-play-fill" fill="currentColor" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                  <path fill="white" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                </svg>
              </button>
            ) : (
              <button className="pause-btn" onClick={togglePlay}>
                <svg viewBox="0 0 16 16" className="bi bi-pause-fill" fill="currentColor" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                  <path fill="white" d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
                </svg>
              </button>
            )}
            <button className="next-btn" onClick={goToNextSong}>
              <svg viewBox="0 0 16 16" className="bi bi-skip-forward-fill" fill="currentColor" height="12" width="12" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <audio 
        ref={audioRef} 
        src={currentSong.audioUrl}
        onEnded={handleSongEnd}
      />
    </div>
  );
};

export default MusicPlayer;