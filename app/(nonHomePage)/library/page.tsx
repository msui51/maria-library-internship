import styles from './page.module.css'

function page() {
  return (
    <div className={styles['row']}>
        <div className={styles['container']}>
            <div className={styles['for-you__title']}>Saved Books</div>
            <div className={styles['for-you__sub--title']}>0 items</div>
            <div className={styles['finished__books--block-wrapper']}>
                <div className={styles['finished__books--title']}>Save your favorite books!</div>
                <div className={styles['finished__books--sub-title']}>When you save a book, it will appear here.</div>
            </div>
            <div className={styles['for-you__title']}>Finished</div>
            <div className={styles['for-you__sub--title']}>0 items</div>
            <div className={styles['finished__books--block-wrapper']}> 
                <div className={styles['finished__books--title']}>Done and dusted</div>
                <div className={styles['finished__books--sub-title']}>When you finish a book, you can find it here.</div>
            </div>
        </div>
    </div>
  )
}

export default page