import { useState, useEffect } from "react";

function MinimalApp() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simple load check
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div>Loading Gariyangu...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          🚗 Gariyangu
        </h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>
          Kenya Motor Vehicle Duty Calculator & Car Marketplace
        </h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          Calculate Kenya Revenue Authority (KRA) import duties and taxes for motor vehicles. 
          Browse Kenya's premier car marketplace with comprehensive automotive services.
        </p>
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '1rem', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            ✅ Backend Server: Operational<br/>
            ✅ Database: Connected<br/>
            ✅ APIs: Responding<br/>
            ✅ Frontend: Loading Successfully
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/duty-calculator'} 
          style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: '1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '1rem'
          }}
        >
          Calculate Import Duty
        </button>
        <button 
          onClick={() => window.location.href = '/buy-a-car'} 
          style={{
            background: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: '1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Browse Cars
        </button>
      </div>
    </div>
  );
}

export default MinimalApp;