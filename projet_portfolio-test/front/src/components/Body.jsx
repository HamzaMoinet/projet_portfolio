import React from "react";

const Body = ({ children }) => (
  <main style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #F5F7FA 0%, #B8C6DB 100%)', minHeight: '60vh', borderRadius: 50, margin: '32px 0', boxShadow: '0 4px 24px rgba(48,129,209,0.08)' }}>
    {children}
  </main>
);

export default Body;
