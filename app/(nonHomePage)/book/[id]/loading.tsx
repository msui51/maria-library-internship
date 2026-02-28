import styles from './page.module.css';

export default function Loading() {
  return (
    <div className={styles['row']}>
      <div className={styles['container']}>
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Left side - content */}
          <div style={{ width: '100%' }}>
            {/* Title skeleton */}
            <div className={styles['skeleton']} style={{ width: '70%', height: '32px', marginBottom: '16px' }} />
            
            {/* Author skeleton */}
            <div className={styles['skeleton']} style={{ width: '30%', height: '20px', marginBottom: '16px' }} />
            
            {/* Subtitle skeleton */}
            <div className={styles['skeleton']} style={{ width: '60%', height: '20px', marginBottom: '16px' }} />
            
            {/* Description wrapper skeleton */}
            <div style={{ borderTop: '1px solid #e1e7ea', borderBottom: '1px solid #e1e7ea', padding: '16px 0', marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '400px', rowGap: '12px' }}>
                {/* 4 description items */}
                <div style={{ width: '50%' }}>
                  <div className={styles['skeleton']} style={{ width: '70%', height: '16px' }} />
                </div>
                <div style={{ width: '50%' }}>
                  <div className={styles['skeleton']} style={{ width: '60%', height: '16px' }} />
                </div>
                <div style={{ width: '50%' }}>
                  <div className={styles['skeleton']} style={{ width: '80%', height: '16px' }} />
                </div>
                <div style={{ width: '50%' }}>
                  <div className={styles['skeleton']} style={{ width: '70%', height: '16px' }} />
                </div>
              </div>
            </div>
            
            {/* Buttons skeleton */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div className={styles['skeleton']} style={{ width: '144px', height: '48px' }} />
              <div className={styles['skeleton']} style={{ width: '144px', height: '48px' }} />
            </div>
            
            {/* Bookmark skeleton */}
            <div className={styles['skeleton']} style={{ width: '60%', height: '40px', marginBottom: '24px' }} />
            
            {/* What's it about section */}
            <div className={styles['skeleton']} style={{ width: '40%', height: '20px', marginBottom: '16px' }} />
            
            {/* Tags skeleton */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <div className={styles['skeleton']} style={{ width: '80px', height: '24px' }} />
              <div className={styles['skeleton']} style={{ width: '100px', height: '24px' }} />
            </div>
            
            {/* Book description skeleton */}
            <div style={{ marginBottom: '24px' }}>
              <div className={styles['skeleton']} style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
              <div className={styles['skeleton']} style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
              <div className={styles['skeleton']} style={{ width: '85%', height: '16px' }} />
            </div>
            
            {/* About the author section */}
            <div className={styles['skeleton']} style={{ width: '40%', height: '20px', marginBottom: '16px' }} />
            
            {/* Author description skeleton */}
            <div>
              <div className={styles['skeleton']} style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
              <div className={styles['skeleton']} style={{ width: '90%', height: '16px' }} />
            </div>
          </div>
          
          {/* Right side - book image */}
          <div style={{ minWidth: '300px' }}>
            <div className={styles['skeleton']} style={{ width: '300px', height: '400px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
