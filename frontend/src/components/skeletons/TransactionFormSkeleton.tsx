const TransactionFormSkeleton = () => {
  return (
    <div style={{
      minHeight: '100vh',
      maxWidth: '56rem',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '32rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        padding: '0 0.75rem'
      }}>
        <div style={{
          height: '2rem',
          width: '60%',
          backgroundColor: '#374151',
          borderRadius: '0.375rem',
          marginBottom: '1rem',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>

        <div style={{ width: '100%' }}>
          <div style={{
            height: '1rem',
            width: '30%',
            backgroundColor: '#374151',
            borderRadius: '0.375rem',
            marginBottom: '0.5rem',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></div>
          <div style={{
            height: '3rem',
            width: '100%',
            backgroundColor: '#374151',
            borderRadius: '0.375rem',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{
                height: '1rem',
                width: '80%',
                backgroundColor: '#374151',
                borderRadius: '0.375rem',
                marginBottom: '0.5rem',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{
                height: '3rem',
                width: '100%',
                backgroundColor: '#374151',
                borderRadius: '0.375rem',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[1, 2].map((i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{
                height: '1rem',
                width: '80%',
                backgroundColor: '#374151',
                borderRadius: '0.375rem',
                marginBottom: '0.5rem',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              <div style={{
                height: '3rem',
                width: '100%',
                backgroundColor: '#374151',
                borderRadius: '0.375rem',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
            </div>
          ))}
        </div>

        <div style={{
          height: '3rem',
          width: '100%',
          backgroundColor: '#374151',
          borderRadius: '0.375rem',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionFormSkeleton;
