"use client";

import styles from '../../app/(nonHomePage)/for-you/page.module.css';
import Link from "next/link"
import { IoTimeOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { useState } from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  subscriptionRequired: boolean;
}

interface Props {
  recommendedBooks: Book[];
}

function RecommendedBooksCarousel({ recommendedBooks }: Props) {

  return (
    <>
      {recommendedBooks.map((book) => (
        <Link key={book.id} href={`/book/${book.id}`} className={styles['for-you__recommended--books-link']}>
            {book.subscriptionRequired ? (
                <div className={styles['book__pill']}>Premium</div>
            ): null}
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
              <div className={styles['recommended__book--details-text']}>03:24</div>
            </div>
            <div className={styles['recommended__book--details']}>
              <div className={styles['recommended__book--details-icon-wrapper']}>
                <FaRegStar className={styles['recommended__book--details-icon']} />
              </div>
              <div className={styles['recommended__book--details-text']}>4.4</div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default RecommendedBooksCarousel