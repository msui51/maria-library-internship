"use client";
import { searchBook } from '@/lib/features/search/search';
import SearchBook from '../SearchBook/SearchBook';
import styles from './search-bar.module.css';
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Book{
  id: string;
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
}

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const handleSearchBook = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(searchBook(event.target.value));
    setSearchTerm(event.target.value);
  }

  useEffect(()=>{
    setSearchTerm('')
  },[pathName])
 
  return (
    <div className={styles['search__background']}>
      <div className={styles['search__wrapper']}>
        <div className={styles['search__content']}>
          <div className={styles['search']}>
            <div className={styles['search__input--wrapper']}>
              <input 
                className={styles['search__input']}
                type="text"
                placeholder="Search for books"
                value={searchTerm}
                onChange={handleSearchBook}
              />
              <div className={styles['search__icon--wrapper']}>
                <IoIosSearch className={styles['search__icon']} />
              </div>
            </div>
          </div>
        </div>
        {searchTerm ? <SearchBook  /> : null}
      </div>
    </div>
  )
}

export default SearchBar