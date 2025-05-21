import React, { useState } from 'react';
import './styles.css';

interface ApiStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

const ApiStep: React.FC<ApiStepProps> = ({ onNext, onBack, initialData }) => {
  const [apiUrl, setApiUrl] = useState(initialData?.apiUrl || '');

  const handleNext = () => {
    onNext({ apiUrl });
  };

  return (
    <div className="api-step-container">
      <h2 className="api-title">Outras Configurações</h2>
      <input
        type="text"
        name="apiUrl"
        value={apiUrl}
        onChange={e => setApiUrl(e.target.value)}
        placeholder="API URL"
        className="api-input"
      />
      <div className="api-btns-row">
        <button
          type="button"
          onClick={onBack}
          className="api-btn api-btn-back"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="api-btn api-btn-next"
          disabled={!apiUrl}
        >
          Avançar
        </button>
      </div>
    </div>
  );
};

export default ApiStep; 