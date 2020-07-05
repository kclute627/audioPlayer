import React, { useState, useEffect, useLayoutEffect, useRef } from "react";


function AudioPlayer({playlist}) {
  const targetRef = useRef();

  const [song, songHandler] = useState({
    title: null,
    artist: null,
    src: null,
  });

  const [currentSong, currentSongHandler] = useState({
    totalTime: "",
    isPlaying: false,
    currentTime: "0",
    percentPlayed: "",
  });

  const [dimentions, dimentionsHandler] = useState({
    height: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    if (targetRef.current) {
      dimentionsHandler({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, [dimentions.width]);

  useEffect(() => {
    const player = document.getElementById("audio");
    player.src = song.src;
    player.onloadedmetadata = () => {
      currentSongHandler({
        ...currentSong,
        isPlaying: true,
        totalTime: player.duration,
      });
    };
    let audio = document.getElementById("audio");
    audio.play();
  }, [song.src]);

  const updateProgressBar = () => {
    // get precentage for transition
    const player = document.getElementById("audio");
    const currentTime = player.currentTime;
    const totalTime = player.duration;
    const percentPlayed = ((currentTime / totalTime) * 100).toFixed(2);
    currentSongHandler({
      ...currentSong,
      percentPlayed,
    });
  };

  const timeHandler = (e) => {
    const clickLocation = e.nativeEvent.offsetX;

    const clickPercentage = ((clickLocation / dimentions.width) * 100).toFixed(
      2
    );
    const player = document.getElementById("audio");
    player.currentTime = player.duration * (clickLocation / dimentions.width);

    currentSongHandler({
      ...currentSong,
      percentPlayed: clickPercentage,
    });
  };

  const play = () => {
    const player = document.getElementById("audio");
    player.play();
    currentSongHandler({ ...currentSong, isPlaying: true });
  };
  const pause = () => {
    const player = document.getElementById("audio");
    player.pause();
    currentSongHandler({ ...currentSong, isPlaying: false });
  };

  const playingTime = () => {
    if (title) {
      const current = Math.floor(document.getElementById("audio").currentTime);
      const seconds = current % 60;
      const min = Math.floor(current / 60);
      const hour = Math.floor(min / 60);

      return `${String(min).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    }
  };

  const newPlaylist = playlist.map((item) => {
    return (
      <li
        className='song__title'
        key={item.id}
        onClick={
          item.title !== song.title
            ? () => {
                songHandler({
                  title: item.title,
                  artist: item.artist,
                  src: item.src,
                });
                currentSongHandler({ ...currentSong, isPlaying: true });
              }
            : null
        }
      >
        {item.title}
      </li>
    );
  });

  const { title } = song;
  const { isPlaying, percentPlayed, totalTime } = currentSong;

  return (
    <div className='audio'>
      <ul>{newPlaylist}</ul>

      <div className='audio__container'>
        <audio
          id='audio'
          src={song.src}
          preload='metadata'
          onTimeUpdate={() => updateProgressBar()}
        />

        <div className='audio__header'>
          <h1>{title && `Current Song:  ${title}`}</h1>
        </div>

        <div
          className='audio__progress'
          onClick={title ? (e) => timeHandler(e) : null}
          ref={targetRef}
        >
          {" "}
          <div className='start__time'>{playingTime()}</div>
          <div className='played' style={{ width: `${percentPlayed}%` }}></div>
          <div className='end__time'>
            {title
              ? `${String(Math.floor(totalTime / 60)).padStart(
                  2,
                  "0"
                )}:${Math.floor(totalTime % 60)}`
              : null}
          </div>
        </div>
        <div className='audio__controls'>
          {!isPlaying ? (
            <button
              disabled={!title}
              className='btn__play'
              onClick={() => play()}
            >
              <i class='fas fa-play fa-3x'></i>
            </button>
          ) : (
            <button className='btn__pause' onClick={() => pause()}>
              {" "}
              <i class='fas fa-pause fa-3x'></i>{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
