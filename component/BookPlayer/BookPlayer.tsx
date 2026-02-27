'use client';

import styles from './bookPlayer.module.css';
import { MdOutlineForward10 } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdReplay10 } from "react-icons/md";
import { useRef, useState, useEffect } from 'react';
import { FaPauseCircle } from "react-icons/fa";


interface Book{
  id: string;
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
  subscriptionRequired: boolean;
  summary: string;
}

interface Props {
    bookDetail: Book;
}

function BookPlayer({bookDetail}: Props) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const fontSize = useSelector((state: any) => state.playerFontSizeReducer.value.fontSize);

    const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      } else {
        setProgress(0);
      }
    }
  };

const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Poll audio element to keep UI in sync even when paused
  useEffect(() => {
    const id = setInterval(() => {
      const a = audioRef.current;
      if (a) {
        const t = a.currentTime;
        if (t !== currentTime) {
          setCurrentTime(t);
          if (a.duration && !isNaN(a.duration)) {
            setProgress((t / a.duration) * 100);
          }
        }
      }
    }, 250);

    return () => clearInterval(id);
  }, [currentTime]);

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setProgress((value / audioRef.current.duration) * 100);
      }
    }
  };

  // Smooth updates while playing using requestAnimationFrame
  useEffect(() => {
    let rafId: number | null = null;

    const loop = () => {
      const a = audioRef.current;
      if (a && a.duration && !isNaN(a.duration)) {
        const t = a.currentTime;
        setCurrentTime(t);
        setProgress((t / a.duration) * 100);
      }
      rafId = requestAnimationFrame(loop);
    };

    if (isPlaying) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isPlaying]);
   
  return (
    <div className={styles['summary']}>
        <div className={styles['audio__book--summary']}>
            <div className={styles['audio__book--summary-title']}>
                {bookDetail.title}
            </div>
            <div className={`${styles['audio__book--summary-text']} ${styles[`audio__book--summary-text--${fontSize}`]}`}>
                {bookDetail.summary}
            </div>
        </div>
        <div className={styles['audio__wrapper']}>
            <audio src={bookDetail.audioLink} ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata}></audio>
            <div className={styles['audio__track--wrapper']}>
                <figure className={styles['audio__track--image-mask']}>
                    <figure className={styles['book__image--wrapper-player']}>
                        <img className={styles['book__image']} src={bookDetail.imageLink}/>
                    </figure>
                </figure>
                <div className={styles['audio__track--details-wrapper']}>
                    <div className={styles['audio__track--title']}>{bookDetail.title}</div>
                    <div className={styles['audio__track--author']}>{bookDetail.author}</div>
                </div>
            </div>
            <div className={styles['audio__controls--wrapper']}>
                <div className={styles['audio__controls']}>
                    <button className={styles['audio__controls--btn']}>
                        <MdReplay10 className={styles['controls__icon']}/>
                    </button>
                    <button className={`${styles['audio__controls--btn']} ${styles['audio__controls--btn-play']}`} onClick={handlePlayPause}>
                       {isPlaying ? <FaPauseCircle className={styles['audio__controls--play-icon']}/> : <FaPlayCircle className={styles['audio__controls--play-icon']}/>}
                    </button>
                    <button className={styles['audio__controls--btn']}>
                        <MdOutlineForward10 className={styles['controls__icon']}/>
                    </button>
                </div>
            </div>
            <div className={styles['audio__progress--wrapper']}>
              <div className={styles['audio__time']}>{formatTime(currentTime)}</div>
              <input
                type="range"
                className={styles['audio__progress--bar']}
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.currentTarget.value))}
                style={{ ['--range-progress' as any]: `${progress}%` }}
              />
              <div className={styles['audio__time']}>{formatTime(duration)}</div>
            </div>
        </div>
    </div>
  )
}

export default BookPlayer