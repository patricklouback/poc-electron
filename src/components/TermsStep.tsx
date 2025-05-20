import React, { useState } from 'react';

interface TermsStepProps {
  onAccept: () => void;
}

const TermsStep: React.FC<TermsStepProps> = ({ onAccept }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', background: '#222', borderRadius: 12, padding: 32, color: '#fff', boxShadow: '0 2px 16px #0003' }}>
      <img src="/logo.svg" alt="Logo" style={{ height: 60, marginBottom: 24 }} />
      <h2 style={{ color: '#FFC300', marginBottom: 16 }}>Termos de Uso</h2>
      <div style={{ textAlign: 'left', marginBottom: 24, fontSize: 16, lineHeight: 1.6 }}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. (Texto mockado)</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <input type="checkbox" id="accept" checked={checked} onChange={e => setChecked(e.target.checked)} />
        <label htmlFor="accept" style={{ marginLeft: 8 }}>Li e aceito os termos de uso</label>
      </div>
      <button
        style={{ background: checked ? '#1976d2' : '#555', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 32px', fontSize: 18, cursor: checked ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
        disabled={!checked}
        onClick={onAccept}
      >
        Avançar
      </button>
    </div>
  );
};

export default TermsStep; 