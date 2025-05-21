import React from 'react';
import './styles.css';

interface JsonSummaryStepProps {
  data: any;
  onBack: () => void;
  onSave: () => Promise<void>;
}

const JsonSummaryStep: React.FC<JsonSummaryStepProps> = ({ data, onBack, onSave }) => {
  return (
    <div className="api-step-container">
      <h2 className="api-title">Resumo da Configuração</h2>
      <pre className="api-json-box">
        {JSON.stringify(data, null, 2)}
      </pre>
      <div className="api-btns-row api-btns-row-end">
        <button
          type="button"
          onClick={onBack}
          className="api-btn api-btn-back"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={onSave}
          className="api-btn api-btn-next"
        >
          Salvar Configuração
        </button>
      </div>
    </div>
  );
};

export default JsonSummaryStep; 