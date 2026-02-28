import styles from './page.module.css';

export default function Loading() {
  // simple skeleton placeholders matching the real layout
  const placeholderCards = Array.from({ length: 5 });
  return (
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={styles['for-you__wrapper']}>
          {/* selected book skeleton - matches real layout */}
          <div className={styles['for-you__title']}>Selected just for you</div>
          <div className={styles['selected__book']}>
            <div className={styles['selected__book--sub-title']}>
              <div className={styles['skeleton']} style={{ width: '120px', height: '20px', marginBottom: '8px' }} />
            </div>
            
            <div className={styles['selected__book--content']}>
              <figure className={`${styles['book__image--wrapper']} ${styles['book__image--wrapper-selected']}`}>
                <div className={styles['skeleton']} style={{ width: '172px', height: '172px' }} />
              </figure>
            </div>
          </div>

          {/* recommended section skeleton */}
          <div>
            <div className={styles['for-you__title']}>Recommended for you</div>
            <div className={styles['for-you__recommended--books']}> 
              {placeholderCards.map((_, idx) => (
                <div key={idx} className={styles['for-you__recommended--books-link']}>
                  <div className={`${styles['skeleton']} ${styles['book__image--wrapper']}`} />
                  <div className={styles['skeleton']} style={{ width: '80%', height: '14px', margin: '8px 0' }} />
                  <div className={styles['skeleton']} style={{ width: '60%', height: '12px' }} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={styles['for-you__title']}>Suggested Books</div>
            <div className={styles['for-you__recommended--books']}> 
              {placeholderCards.map((_, idx) => (
                <div key={idx} className={styles['for-you__recommended--books-link']}>
                  <div className={`${styles['skeleton']} ${styles['book__image--wrapper']}`} />
                  <div className={styles['skeleton']} style={{ width: '80%', height: '14px', margin: '8px 0' }} />
                  <div className={styles['skeleton']} style={{ width: '60%', height: '12px' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
