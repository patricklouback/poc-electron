import React, { useState } from 'react';
import terms from './terms.txt?raw';
import './styles.css';

interface TermsStepProps {
  onAccept: () => void;
}

const TermsStep: React.FC<TermsStepProps> = ({ onAccept }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="terms-step-container">
      <img src="/logo.svg" alt="Logo" className="terms-logo" />
      <h2 className="terms-title">Termos de Uso</h2>
      <pre className="terms-pre">{terms}</pre>
      <div className="terms-checkbox-row">
        <input type="checkbox" id="accept" checked={checked} onChange={e => setChecked(e.target.checked)} />
        <label htmlFor="accept" className="terms-checkbox-label">Li e aceito os termos de uso</label>
      </div>
      <button
        className="terms-advance-btn"
        disabled={!checked}
        onClick={onAccept}
      >
        Avançar
      </button>
    </div>
  );
};

export default TermsStep; 