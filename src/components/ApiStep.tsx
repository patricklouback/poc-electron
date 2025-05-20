import React, { useState } from 'react';

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
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#222', borderRadius: 12, padding: 32, color: '#fff', boxShadow: '0 2px 16px #0003' }}>
      <h2 style={{ color: '#FFC300', marginBottom: 24 }}>Configuração da API</h2>
      {!showJson ? (
        <>
          <input
            type="text"
            name="apiUrl"
            value={apiUrl}
            onChange={e => setApiUrl(e.target.value)}
            placeholder="API URL"
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: 16, marginBottom: 32 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <button
              type="button"
              onClick={onBack}
              style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 32px', fontSize: 18, cursor: 'pointer', flex: 1 }}
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={handleFinish}
              style={{ background: apiUrl ? '#1976d2' : '#555', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 32px', fontSize: 18, cursor: apiUrl ? 'pointer' : 'not-allowed', transition: 'background 0.2s', flex: 1, marginLeft: 16 }}
              disabled={!apiUrl}
            >
              Concluir
            </button>
          </div>
        </>
      ) : (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ color: '#FFC300' }}>Resumo das Configurações</h3>
          <pre style={{ background: '#181818', color: '#fff', padding: 20, borderRadius: 8, fontSize: 15, textAlign: 'left', overflowX: 'auto', marginBottom: 32 }}>
            {JSON.stringify({ ...initialData, apiUrl }, null, 2)}
          </pre>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onBack}
              style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 32px', fontSize: 18, cursor: 'pointer' }}
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