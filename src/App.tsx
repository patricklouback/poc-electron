import React, { useState } from 'react';
import TermsStep from './components/TermsStep';
import ConfigStep from './components/ConfigStep';
import ApiStep from './components/ApiStep';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({ termsAccepted: false });

  const handleTermsAccepted = () => {
    setFormData({ ...formData, termsAccepted: true });
    setStep(1);
  };

  const handleConfigNext = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const handleConfigBack = () => {
    setStep(0);
  };

  const handleApiFinish = (data: any) => {
    setFormData({ ...formData, ...data });
    // step permanece 2 para mostrar o resumo
  };

  const handleApiBack = () => {
    setStep(1);
  };

  switch (step) {
    case 0:
      return <TermsStep onAccept={handleTermsAccepted} />;
    case 1:
      return <ConfigStep onNext={handleConfigNext} onBack={handleConfigBack} initialData={formData} />;
    case 2:
      return <ApiStep onFinish={handleApiFinish} onBack={handleApiBack} initialData={formData} />;
    default:
      return null;
  }
};

export default App; 