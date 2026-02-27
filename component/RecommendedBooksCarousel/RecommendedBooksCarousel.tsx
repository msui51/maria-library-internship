"use client";

import styles from '../../app/(nonHomePage)/for-you/page.module.css';
import Link from "next/link"
import { IoTimeOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { useState } from 'react';
import formatTime from '@/lib/utils/formatTime';

type Book = {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  subscriptionRequired: boolean;
  averageRating: number;
  audioLink: string;
}

interface Props {
  recommendedBooks: Book[];
}

function RecommendedBooksCarousel({ recommendedBooks }: Props) {
  const [durations, setDurations] = useState<Record<string, number>>({});

        // replaced audioRef logic; we'll update duration directly in map
        const handleLoadedMetadata = (id: string, event: React.SyntheticEvent<HTMLAudioElement>) => {
            const audio = event.currentTarget;
            setDurations(prev => ({ ...prev, [id]: audio.duration }));
        };

  return (
    <>
      {recommendedBooks.map((book) => (
        <Link key={book.id} href={`/book/${book.id}`} className={styles['for-you__recommended--books-link']}>
            {book.subscriptionRequired ? (
                <div className={styles['book__pill']}>Premium</div>
            ): null}
          <audio
                  src={book.audioLink}
                  onLoadedMetadata={e => handleLoadedMetadata(book.id, e)}
            ></audio>
          <figure className={styles['book__image--wrapper']}>
            <img className={styles['book__image']} src={book.imageLink} alt={`${book.title} Cover Image`} />
          </figure>
          <div className={styles['recommended__book--title']}>{book.title}</div>
          <div className={styles['recommended__book--author']}>{book.author}</div>
          <div className={styles['recommended__book--sub-title']}>{book.subTitle}</div>
          <div className={styles['recommended__book--details-wrapper']}>
            <div className={styles['recommended__book--details']}>
              <div className={styles['recommended__book--details-icon-wrapper']}>
                <IoTimeOutline className={styles['recommended__book--details-icon']} />
              </div>
              <div className={styles['recommended__book--details-text']}>{formatTime(durations[book.id] || 0)}</div>
            </div>
            <div className={styles['recommended__book--details']}>
              <div className={styles['recommended__book--details-icon-wrapper']}>
                <FaRegStar className={styles['recommended__book--details-icon']} />
              </div>
              <div className={styles['recommended__book--details-text']}>{book.averageRating}</div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default RecommendedBooksCarousel