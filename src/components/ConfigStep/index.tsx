import React, { useState } from 'react';
import './styles.css';

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

  const handleSelectFolder = async (fieldName: string) => {
    if (window.electron && window.electron.selectFolder) {
      const folder = await window.electron.selectFolder();
      if (folder) {
        setFields(prev => ({ ...prev, [fieldName]: folder }));
      }
    }
  };

  const allFilled = fields.errorPath && fields.authPath && fields.tempPath && fields.videoDir && fields.subscriptionName;

  return (
    <div className="config-step-container">
      <h2 className="config-title">Configuração de Diretórios</h2>
      <div className="config-fields">
        {[
          { label: 'Destino de Erros', name: 'errorPath' },
          { label: 'Destino de arquivos autenticados', name: 'authPath' },
          { label: 'Destino de arquivos temporários', name: 'tempPath' },
          { label: 'Diretório de vídeos', name: 'videoDir' },
        ].map(field => (
          <div key={field.name} className="config-input-row">
            <input
              type="text"
              name={field.name}
              value={fields[field.name as keyof typeof fields] as string}
              onChange={handleChange}
              placeholder={field.label}
              className="config-input"
            />
            <button
              type="button"
              className="config-folder-btn"
              title={`Selecionar pasta para ${field.label}`}
              onClick={() => handleSelectFolder(field.name)}
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
          className="config-input"
        />
        <div className="config-selects-row">
          <div className="config-select-col">
            <label className="config-label">Tipo de Carimbo</label>
            <select
              name="timeStampMode"
              value={fields.timeStampMode}
              onChange={handleChange}
              className="config-select"
            >
              {timeStampModes.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="config-select-col">
            <label className="config-label">Tipo de Dispositivo</label>
            <select
              name="processTypeMode"
              value={fields.processTypeMode}
              onChange={handleChange}
              className="config-select"
            >
              {processTypeModes.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="config-btns-row">
        <button
          type="button"
          onClick={onBack}
          className="config-btn config-btn-back"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() => onNext(fields)}
          className="config-btn config-btn-next"
          disabled={!allFilled}
        >
          Avançar
        </button>
      </div>
    </div>
  );
};

export default ConfigStep; 