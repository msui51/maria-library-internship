import styles from './page.module.css';

export default function Loading() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f5f7fa'
    }}>
      <div style={{ textAlign: 'center' }}>
        {/* Spinner */}
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #e0e0e0',
          borderTop: '4px solid #032b41',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 24px'
        }} />
        
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
