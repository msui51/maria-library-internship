import styles from './search-bar.module.css';
import { IoIosSearch } from "react-icons/io";

function SearchBar() {
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
              />
              <div className={styles['search__icon--wrapper']}>
                <IoIosSearch className={styles['search__icon']} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar