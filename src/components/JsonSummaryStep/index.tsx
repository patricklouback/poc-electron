import React, { useState } from 'react';
import './styles.css';

interface JsonSummaryStepProps {
  data: any;
  onBack: () => void;
}

const JsonSummaryStep: React.FC<JsonSummaryStepProps> = ({ data, onBack }) => {
  const [folder, setFolder] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectFolder = async () => {
    if (window.electron && window.electron.selectFolder) {
      const selected = await window.electron.selectFolder();
      if (selected) setFolder(selected);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      if (window.electron && window.electron.saveJson && folder) {
        await window.electron.saveJson(folder, data);
        setSaved(true);
      } else {
        setError('Função de salvar JSON não disponível.');
      }
    } catch (e) {
      setError('Erro ao salvar JSON.');
    }
    setSaving(false);
  };

  return (
    <div className="api-step-container">
      <h2 className="api-title">Resumo das Configurações</h2>
      <pre className="api-json-box">
        {JSON.stringify(data, null, 2)}
      </pre>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button
          type="button"
          className="api-btn api-btn-next"
          onClick={handleSelectFolder}
        >
          Selecionar diretório
        </button>
        <span style={{ color: '#3A7DFF', fontWeight: 500, fontSize: 15 }}>
          {folder ? folder : 'Nenhum diretório selecionado'}
        </span>
      </div>
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
          className="api-btn api-btn-next"
          onClick={handleSave}
          disabled={!folder || saving}
        >
          {saving ? 'Salvando...' : 'Salvar JSON'}
        </button>
      </div>
      {saved && <div style={{ color: 'green', marginTop: 12 }}>JSON salvo com sucesso!</div>}
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
    </div>
  );
};

export default JsonSummaryStep; 