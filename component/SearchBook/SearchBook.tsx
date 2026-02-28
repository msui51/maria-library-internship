"use client";
import styles from './searchBook.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { IoTimeOutline } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import formatTime from '@/lib/utils/formatTime';



interface Book{
  id: string;
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
}


function SearchBook() {
        const searchResults = useSelector((state: any) => state.searchReducer.value.searchTerm);
        const [books, setBooks] = useState<Book[]>([]);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        // track duration per book id
        const [durations, setDurations] = useState<Record<string, number>>({});

        // replaced audioRef logic; we'll update duration directly in map
        const handleLoadedMetadata = (id: string, event: React.SyntheticEvent<HTMLAudioElement>) => {
            const audio = event.currentTarget;
            setDurations(prev => ({ ...prev, [id]: audio.duration }));
        };


        useEffect(() => {
            if(!searchResults) return;
            setIsLoading(true);
            fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchResults}`)
                .then(r => r.json())
                .then(books => {
                    setBooks(books);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Failed to fetch book details:', error);
                    setIsLoading(false);
                });
        }, [searchResults]);
    
    const skeletonCards = Array.from({ length: 5 });

    return (
    <div className={styles['search__books--wrapper']}>
        {isLoading ? (
            skeletonCards.map((_, idx) => (
                <div key={idx} className={styles['search__book--link']}>
                    <div className={`${styles['skeleton']} ${styles['book__image--wrapper']}`} />
                    <div style={{ width: '100%' }}>
                        <div className={styles['skeleton']} style={{ width: '70%', height: '16px', marginBottom: '8px' }} />
                        <div className={styles['skeleton']} style={{ width: '50%', height: '14px', marginBottom: '8px' }} />
                        <div className={styles['skeleton']} style={{ width: '40%', height: '14px' }} />
                    </div>
                </div>
            ))
        ) : (
            books.map((book) => (
                <Link key={book.id} href={`/book/${book.id}`} className={styles['search__book--link']}>
                    <audio
                        src={book.audioLink}
                        onLoadedMetadata={e => handleLoadedMetadata(book.id, e)}
                    ></audio>
                    <figure className={styles['book__image--wrapper']}>
                        <img className={styles['book__image']} src={book.imageLink} alt={`${book.title} Cover Image`} />
                    </figure>
                    <div>
                        <div className={styles['search__book--title']}>{book.title}</div>
                        <div className={styles['search__book--author']}>{book.author}</div>
                        <div className={styles['search__book--duration']}>
                            <div className={styles['recommended__book--details']}>
                                <div className={styles['recommended__book--details-icon-wrapper']}>
                                    <IoTimeOutline className={styles['recommended__book--details-icon']} />
                                </div>
                                <div className={styles['recommended__book--details-text']}>{formatTime(durations[book.id] || 0)}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))
        )}
    </div>
  )
}

export default SearchBook