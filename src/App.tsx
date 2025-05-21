import React, { useState } from 'react';
import TermsStep from './components/TermsStep';
import ConfigStep from './components/ConfigStep';
import ApiStep from './components/ApiStep';
import JsonSummaryStep from './components/JsonSummaryStep';
import logo from '../public/dfm-logo.png';

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

  const handleSummaryBack = () => {
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <TermsStep onAccept={handleTermsAccepted} />;
      case 1:
        return <ConfigStep onNext={handleConfigNext} onBack={handleConfigBack} initialData={formData} />;
      case 2:
        return <JsonSummaryStep data={formData} onBack={handleSummaryBack} />;
      default:
        return null;
    }
  }

  return (
    <div className="app-container">
      <img src={logo} alt="Logo" className="app-logo" />
      {renderStep()}
    </div>
  );
};

export default App; 