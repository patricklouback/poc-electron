import React, { useState } from 'react';

interface ConfigStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

const timeStampModes = [
  { value: 0, label: 'Interno' },
  { value: 1, label: 'Bry' },
  { value: 2, label: 'Serpro' },
];

const processTypeModes = [
  'BodyCam', 'TT5P', 'TX822', 'DMT900', 'TX5PL', 'TX5RP', 'BR220', 'BR520', 'BR860', 'M1N', 'DMT900_N'
];

const ConfigStep: React.FC<ConfigStepProps> = ({ onNext, onBack, initialData }) => {
  const [fields, setFields] = useState({
    errorPath: initialData?.errorPath || '',
    authPath: initialData?.authPath || '',
    tempPath: initialData?.tempPath || '',
    videoDir: initialData?.videoDir || '',
    subscriptionName: initialData?.subscriptionName || '',
    timeStampMode: initialData?.timeStampMode || 0,
    processTypeMode: initialData?.processTypeMode || processTypeModes[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const allFilled = fields.errorPath && fields.authPath && fields.tempPath && fields.videoDir && fields.subscriptionName;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#222', borderRadius: 12, padding: 28, color: '#fff', boxShadow: '0 2px 16px #0003' }}>
      <h2 style={{ color: '#FFC300', marginBottom: 24 }}>Configuração Inicial</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[
          { label: 'Destino de Erros', name: 'errorPath' },
          { label: 'Destino de arquivos autenticados', name: 'authPath' },
          { label: 'Destino de arquivos temporários', name: 'tempPath' },
          { label: 'Diretório de vídeos', name: 'videoDir' },
        ].map(field => (
          <div key={field.name} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              name={field.name}
              value={fields[field.name as keyof typeof fields] as string}
              onChange={handleChange}
              placeholder={field.label}
              style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: 16 }}
            />
            <button
              type="button"
              style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#FFC300', fontSize: 22 }}
              title="Selecionar pasta (em breve)"
              disabled
            >
              <span role="img" aria-label="folder">📁</span>
            </button>
          </div>
        ))}
        <input
          type="text"
          name="subscriptionName"
          value={fields.subscriptionName}
          onChange={handleChange}
          placeholder="Nome da Subscription"
          style={{ padding: 10, borderRadius: 6, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: 16 }}
        />
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ color: '#FFC300' }}>Tipo de Carimbo</label>
            <select
              name="timeStampMode"
              value={fields.timeStampMode}
              onChange={handleChange}
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: 16 }}
            >
              {timeStampModes.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ color: '#FFC300' }}>Tipo de Dispositivo</label>
            <select
              name="processTypeMode"
              value={fields.processTypeMode}
              onChange={handleChange}
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: 16 }}
            >
              {processTypeModes.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
        <button
          type="button"
          onClick={onBack}
          style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 32px', fontSize: 18, cursor: 'pointer' }}
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() => onNext(fields)}
          style={{ background: allFilled ? '#1976d2' : '#555', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 32px', fontSize: 18, cursor: allFilled ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
          disabled={!allFilled}
        >
          Avançar
        </button>
      </div>
    </div>
  );
};

export default ConfigStep; 