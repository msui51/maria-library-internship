


import styles from './page.module.css'
import { FaPlayCircle } from "react-icons/fa";
import Link from 'next/link';
import RecommendedBooksCarousel from '@/component/RecommendedBooksCarousel/RecommendedBooksCarousel';
import SuggestedBooksCarousel from '@/component/SuggestedBooksCarousel/SuggestedBooksCarousel';



interface Book{
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

async function getBook(): Promise<Book> {
   try {
    const res = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected');
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const bookData = await res.json();
    const book: Book = bookData[0];
    return book;
  } catch (error) {
    console.error('Failed to fetch book:', error);
    throw error;
  }
}

async function getRecommendedBooks(): Promise<Book[]> {
  try {
    const res = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended')
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const books: Book[] = await res.json();
    return books.slice(0, 5);
  }catch (error) {
    console.error('Failed to fetch books:', error);
    throw error;
}}

async function getSuggestedBooks(): Promise<Book[]> {
  try {
    const res = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested')
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const books: Book[] = await res.json();
    return books.slice(0, 5);
  }catch (error) {
    console.error('Failed to fetch books:', error);
    throw error;
}}


async function forYou() {
  const book = await getBook();
  const recommendedBooks = await getRecommendedBooks();
  const suggestedBooks = await getSuggestedBooks();


  return (
    <>
      <div className={styles['row']}>
        <div className={styles['container']}>    
          <div className={styles['for-you__wrapper']}>
            <div className={styles['for-you__title']}>Selected just for you</div>
            <Link href={`/book/${book.id}`} className={styles['selected__book']}>
              <div className={styles['selected__book--sub-title']}>{book.subTitle}</div>
              <div className={styles['selected__book--line']}></div>
              <div className={styles['selected__book--content']}>
                <figure className={`${styles['book__image--wrapper']} ${styles['book__image--wrapper-selected']}`}>
                  <img className={styles['book__image']} src={book.imageLink} alt={`${book.title} Cover Image`}/>
                </figure>
                <div className={styles['selected__book--text']}>
                  <div className={styles['selected__book--title']}>{book.title}</div>
                  <div className={styles['selected__book--author']}>{book.author}</div>
                  <div className={styles['selected__book--duration-wrapper']}>
                    <div className={styles['selected__book--icon-wrapper']}>
                      <FaPlayCircle className={styles['selected__book--icon']}/>
                    </div>
                    <div className={styles['selected__book--duration']}>3 mins 23 secs</div>
                  </div>
                </div>
              </div>
            </Link>
            <div>
              <div className={styles['for-you__title']}>Recommended for you</div>
              <div className={styles['for-you__sub--title']}>We think you'll like these</div>
              <div className={styles['for-you__recommended--books']}>
                <RecommendedBooksCarousel recommendedBooks={recommendedBooks} />
              </div>
            </div>
            <div>
              <div className={styles['for-you__title']}>Suggested Books</div>
              <div className={styles['for-you__sub--title']}>Browse these books</div>
              <div className={styles['for-you__recommended--books']}>
                <SuggestedBooksCarousel suggestedBooks={suggestedBooks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default forYou