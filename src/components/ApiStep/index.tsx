import React, { useState } from 'react';
import './styles.css';

interface ApiStepProps {
  onFinish: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

const ApiStep: React.FC<ApiStepProps> = ({ onFinish, onBack, initialData }) => {
  const [apiUrl, setApiUrl] = useState(initialData?.apiUrl || '');
  const [showJson, setShowJson] = useState(false);

  const handleFinish = () => {
    setShowJson(true);
    onFinish({ apiUrl });
  };

  return (
    <div className="api-step-container">
      <h2 className="api-title">Outras Configurações</h2>
      {!showJson ? (
        <>
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
              onClick={handleFinish}
              className="api-btn api-btn-next"
              disabled={!apiUrl}
            >
              Concluir
            </button>
          </div>
        </>
      ) : (
        <div className="api-json-summary">
          <h3 className="api-summary-title">Resumo das Configurações</h3>
          <pre className="api-json-box">
            {JSON.stringify({ ...initialData, apiUrl }, null, 2)}
          </pre>
          <div className="api-btns-row api-btns-row-end">
            <button
              type="button"
              onClick={onBack}
              className="api-btn api-btn-back"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiStep; 