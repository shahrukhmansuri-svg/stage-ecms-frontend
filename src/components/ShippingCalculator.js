import React, { useState, useEffect } from 'react';

function ShippingCalculator() {
  const [orderTotal, setOrderTotal] = useState('');
  const [shippingData, setShippingData] = useState(null);
  const [error, setError] = useState('');
  
  const calculateShipping = async () => {
    if (!orderTotal) {
      setError('Please enter an order total');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_total: parseFloat(orderTotal) }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setShippingData(data);
      setError('');
    } catch (err) {
      setError('Error calculating shipping: ' + err.message);
    }
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Shipping Calculator</h2>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Order Total: $
          <input 
            type="number" 
            value={orderTotal} 
            onChange={(e) => setOrderTotal(e.target.value)}
            placeholder="Enter order total"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
      </div>
      <button 
        onClick={calculateShipping}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '15px'
        }}
      >
        Calculate Shipping
      </button>
      
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
      
      {shippingData && (
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          backgroundColor: '#f8f9fa',
          marginTop: '15px'
        }}>
          <h3>Shipping Details</h3>
          <p>Order Total: ${shippingData.order_total.toFixed(2)}</p>
          <p>Shipping Rate: {shippingData.shipping_rate * 100}%</p>
          <p>Shipping Cost: ${shippingData.shipping_cost.toFixed(2)}</p>
          <p>{shippingData.message}</p>
        </div>
      )}
    </div>
  );
}

export default ShippingCalculator;