import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Datos reales de rendimientos mensuales extraídos del Excel
const fundsData = {
  "LEMA Global Fund": {
    "benchmark": "IPC México",
    "color": "#1F4E79",
    "benchmarkColor": "#94A3B8",
    "description": "Estrategia global diversificada - 63 meses de track record",
    "returns": [
      { "date": "2020-10", "month": "Oct 2020", "fund": -0.0173, "benchmark": -0.012569 },
      { "date": "2020-11", "month": "Nov 2020", "fund": 0.1154, "benchmark": 0.129529 },
      { "date": "2020-12", "month": "Dec 2020", "fund": 0.0721, "benchmark": 0.054765 },
      { "date": "2021-01", "month": "Jan 2021", "fund": -0.0505, "benchmark": -0.024534 },
      { "date": "2021-02", "month": "Feb 2021", "fund": 0.0096, "benchmark": 0.037389 },
      { "date": "2021-03", "month": "Mar 2021", "fund": 0.0219, "benchmark": 0.059502 },
      { "date": "2021-04", "month": "Apr 2021", "fund": 0.0283, "benchmark": 0.016159 },
      { "date": "2021-05", "month": "May 2021", "fund": 0.03, "benchmark": 0.059909 },
      { "date": "2021-06", "month": "Jun 2021", "fund": -0.0051, "benchmark": -0.011716 },
      { "date": "2021-07", "month": "Jul 2021", "fund": 0.0069, "benchmark": 0.011505 },
      { "date": "2021-08", "month": "Aug 2021", "fund": 0.0286, "benchmark": 0.047897 },
      { "date": "2021-09", "month": "Sep 2021", "fund": -0.0254, "benchmark": -0.036 },
      { "date": "2021-10", "month": "Oct 2021", "fund": 0.0024, "benchmark": -0.0015 },
      { "date": "2021-11", "month": "Nov 2021", "fund": -0.0165, "benchmark": -0.0314 },
      { "date": "2021-12", "month": "Dec 2021", "fund": 0.0622, "benchmark": 0.0719 },
      { "date": "2022-01", "month": "Jan 2022", "fund": -0.0727, "benchmark": -0.0364 },
      { "date": "2022-02", "month": "Feb 2022", "fund": 0.0188, "benchmark": 0.0403 },
      { "date": "2022-03", "month": "Mar 2022", "fund": 0.0026, "benchmark": 0.0587 },
      { "date": "2022-04", "month": "Apr 2022", "fund": -0.029, "benchmark": -0.0905 },
      { "date": "2022-05", "month": "May 2022", "fund": 0.0487, "benchmark": 0.0065 },
      { "date": "2022-06", "month": "Jun 2022", "fund": -0.0664, "benchmark": -0.0817 },
      { "date": "2022-07", "month": "Jul 2022", "fund": 0.0731, "benchmark": 0.013 },
      { "date": "2022-08", "month": "Aug 2022", "fund": -0.0362, "benchmark": -0.067 },
      { "date": "2022-09", "month": "Sep 2022", "fund": 0.013, "benchmark": -0.0065 },
      { "date": "2022-10", "month": "Oct 2022", "fund": 0.0857, "benchmark": 0.1187 },
      { "date": "2022-11", "month": "Nov 2022", "fund": 0.0547, "benchmark": 0.0353 },
      { "date": "2022-12", "month": "Dec 2022", "fund": -0.0375, "benchmark": -0.0624 },
      { "date": "2023-01", "month": "Jan 2023", "fund": 0.0777, "benchmark": 0.1259 },
      { "date": "2023-02", "month": "Feb 2023", "fund": -0.0384, "benchmark": -0.0331 },
      { "date": "2023-03", "month": "Mar 2023", "fund": 0.0353, "benchmark": 0.0217 },
      { "date": "2023-04", "month": "Apr 2023", "fund": 0.0504, "benchmark": 0.0226 },
      { "date": "2023-05", "month": "May 2023", "fund": -0.0131, "benchmark": -0.0433 },
      { "date": "2023-06", "month": "Jun 2023", "fund": -0.0093, "benchmark": 0.015 },
      { "date": "2023-07", "month": "Jul 2023", "fund": 0.0067, "benchmark": 0.0242 },
      { "date": "2023-08", "month": "Aug 2023", "fund": -0.0001, "benchmark": -0.0328 },
      { "date": "2023-09", "month": "Sep 2023", "fund": -0.0055, "benchmark": -0.0405 },
      { "date": "2023-10", "month": "Oct 2023", "fund": -0.0275, "benchmark": -0.0356 },
      { "date": "2023-11", "month": "Nov 2023", "fund": 0.0833, "benchmark": 0.1019 },
      { "date": "2023-12", "month": "Dec 2023", "fund": 0.02, "benchmark": 0.0614 },
      { "date": "2024-01", "month": "Jan 2024", "fund": -0.0162, "benchmark": -0.0002 },
      { "date": "2024-02", "month": "Feb 2024", "fund": 0.0117, "benchmark": -0.0341 },
      { "date": "2024-03", "month": "Mar 2024", "fund": 0.0225, "benchmark": 0.0353 },
      { "date": "2024-04", "month": "Apr 2024", "fund": -0.0088, "benchmark": -0.0112 },
      { "date": "2024-05", "month": "May 2024", "fund": -0.0205, "benchmark": -0.0273 },
      { "date": "2024-06", "month": "Jun 2024", "fund": -0.0107, "benchmark": -0.0496 },
      { "date": "2024-07", "month": "Jul 2024", "fund": 0.0362, "benchmark": 0.0125 },
      { "date": "2024-08", "month": "Aug 2024", "fund": 0.0234, "benchmark": -0.0209 },
      { "date": "2024-09", "month": "Sep 2024", "fund": 0.0308, "benchmark": 0.0094 },
      { "date": "2024-10", "month": "Oct 2024", "fund": -0.0029, "benchmark": -0.0347 },
      { "date": "2024-11", "month": "Nov 2024", "fund": -0.0098, "benchmark": -0.0167 },
      { "date": "2024-12", "month": "Dec 2024", "fund": -0.0269, "benchmark": -0.006 },
      { "date": "2025-01", "month": "Jan 2025", "fund": 0.0291, "benchmark": 0.0343 },
      { "date": "2025-02", "month": "Feb 2025", "fund": 0.0073, "benchmark": 0.0218 },
      { "date": "2025-03", "month": "Mar 2025", "fund": -0.0077, "benchmark": 0.003 },
      { "date": "2025-04", "month": "Apr 2025", "fund": 0.037, "benchmark": 0.0719 },
      { "date": "2025-05", "month": "May 2025", "fund": 0.0386, "benchmark": 0.0281 },
      { "date": "2025-06", "month": "Jun 2025", "fund": -0.0337, "benchmark": -0.0068 },
      { "date": "2025-07", "month": "Jul 2025", "fund": 0.0051, "benchmark": -0.0009 },
      { "date": "2025-08", "month": "Aug 2025", "fund": 0.0068, "benchmark": 0.0228 },
      { "date": "2025-09", "month": "Sep 2025", "fund": 0.0375, "benchmark": 0.0717 },
      { "date": "2025-10", "month": "Oct 2025", "fund": -0.0001, "benchmark": -0.0023 },
      { "date": "2025-11", "month": "Nov 2025", "fund": 0.0244, "benchmark": 0.0132 },
      { "date": "2025-12", "month": "Dec 2025", "fund": 0.0244, "benchmark": 0.0112 }
    ]
  },
  "HM Fund": {
    "benchmark": "IPC México",
    "color": "#2E75B6",
    "benchmarkColor": "#94A3B8",
    "description": "Estrategia de valor México y Latam - 54 meses de track record",
    "returns": [
      { "date": "2021-07", "month": "Jul 2021", "fund": -0.0142, "benchmark": 0.011505 },
      { "date": "2021-08", "month": "Aug 2021", "fund": 0.0327, "benchmark": 0.047897 },
      { "date": "2021-09", "month": "Sep 2021", "fund": 0.0119, "benchmark": -0.036 },
      { "date": "2021-10", "month": "Oct 2021", "fund": -0.0045, "benchmark": -0.0015 },
      { "date": "2021-11", "month": "Nov 2021", "fund": -0.0184, "benchmark": -0.0314 },
      { "date": "2021-12", "month": "Dec 2021", "fund": 0.0488, "benchmark": 0.0719 },
      { "date": "2022-01", "month": "Jan 2022", "fund": -0.0073, "benchmark": -0.0364 },
      { "date": "2022-02", "month": "Feb 2022", "fund": 0.0261, "benchmark": 0.0403 },
      { "date": "2022-03", "month": "Mar 2022", "fund": 0.0109, "benchmark": 0.0587 },
      { "date": "2022-04", "month": "Apr 2022", "fund": -0.0353, "benchmark": -0.0905 },
      { "date": "2022-05", "month": "May 2022", "fund": 0.051, "benchmark": 0.0065 },
      { "date": "2022-06", "month": "Jun 2022", "fund": -0.0603, "benchmark": -0.0817 },
      { "date": "2022-07", "month": "Jul 2022", "fund": 0.0587, "benchmark": 0.013 },
      { "date": "2022-08", "month": "Aug 2022", "fund": -0.0286, "benchmark": -0.067 },
      { "date": "2022-09", "month": "Sep 2022", "fund": 0.0084, "benchmark": -0.0065 },
      { "date": "2022-10", "month": "Oct 2022", "fund": 0.0835, "benchmark": 0.1187 },
      { "date": "2022-11", "month": "Nov 2022", "fund": 0.0616, "benchmark": 0.0353 },
      { "date": "2022-12", "month": "Dec 2022", "fund": -0.0297, "benchmark": -0.0624 },
      { "date": "2023-01", "month": "Jan 2023", "fund": 0.0892, "benchmark": 0.1259 },
      { "date": "2023-02", "month": "Feb 2023", "fund": -0.0142, "benchmark": -0.0331 },
      { "date": "2023-03", "month": "Mar 2023", "fund": 0.0341, "benchmark": 0.0217 },
      { "date": "2023-04", "month": "Apr 2023", "fund": 0.0039, "benchmark": 0.0226 },
      { "date": "2023-05", "month": "May 2023", "fund": -0.0125, "benchmark": -0.0433 },
      { "date": "2023-06", "month": "Jun 2023", "fund": -0.002, "benchmark": 0.015 },
      { "date": "2023-07", "month": "Jul 2023", "fund": 0.0201, "benchmark": 0.0242 },
      { "date": "2023-08", "month": "Aug 2023", "fund": -0.0091, "benchmark": -0.0328 },
      { "date": "2023-09", "month": "Sep 2023", "fund": -0.0153, "benchmark": -0.0405 },
      { "date": "2023-10", "month": "Oct 2023", "fund": -0.0543, "benchmark": -0.0356 },
      { "date": "2023-11", "month": "Nov 2023", "fund": 0.105, "benchmark": 0.1019 },
      { "date": "2023-12", "month": "Dec 2023", "fund": 0.0759, "benchmark": 0.0614 },
      { "date": "2024-01", "month": "Jan 2024", "fund": -0.0338, "benchmark": -0.0002 },
      { "date": "2024-02", "month": "Feb 2024", "fund": -0.0231, "benchmark": -0.0341 },
      { "date": "2024-03", "month": "Mar 2024", "fund": 0.0344, "benchmark": 0.0353 },
      { "date": "2024-04", "month": "Apr 2024", "fund": -0.0095, "benchmark": -0.0112 },
      { "date": "2024-05", "month": "May 2024", "fund": -0.0083, "benchmark": -0.0273 },
      { "date": "2024-06", "month": "Jun 2024", "fund": -0.049, "benchmark": -0.0496 },
      { "date": "2024-07", "month": "Jul 2024", "fund": 0.0242, "benchmark": 0.0125 },
      { "date": "2024-08", "month": "Aug 2024", "fund": 0.002, "benchmark": -0.0209 },
      { "date": "2024-09", "month": "Sep 2024", "fund": 0.0123, "benchmark": 0.0094 },
      { "date": "2024-10", "month": "Oct 2024", "fund": 0.0045, "benchmark": -0.0347 },
      { "date": "2024-11", "month": "Nov 2024", "fund": -0.0151, "benchmark": -0.0167 },
      { "date": "2024-12", "month": "Dec 2024", "fund": -0.0133, "benchmark": -0.006 },
      { "date": "2025-01", "month": "Jan 2025", "fund": 0.0251, "benchmark": 0.0343 },
      { "date": "2025-02", "month": "Feb 2025", "fund": -0.0036, "benchmark": 0.0218 },
      { "date": "2025-03", "month": "Mar 2025", "fund": 0.0046, "benchmark": 0.003 },
      { "date": "2025-04", "month": "Apr 2025", "fund": 0.0389, "benchmark": 0.0719 },
      { "date": "2025-05", "month": "May 2025", "fund": 0.0958, "benchmark": 0.0281 },
      { "date": "2025-06", "month": "Jun 2025", "fund": -0.0111, "benchmark": -0.0068 },
      { "date": "2025-07", "month": "Jul 2025", "fund": 0.026, "benchmark": -0.0009 },
      { "date": "2025-08", "month": "Aug 2025", "fund": 0.0048, "benchmark": 0.0228 },
      { "date": "2025-09", "month": "Sep 2025", "fund": 0.0421, "benchmark": 0.0717 },
      { "date": "2025-10", "month": "Oct 2025", "fund": -0.0048, "benchmark": -0.0023 },
      { "date": "2025-11", "month": "Nov 2025", "fund": 0.0227, "benchmark": 0.0132 },
      { "date": "2025-12", "month": "Dec 2025", "fund": 0.0227, "benchmark": 0.0112 }
    ]
  },
  "AL Composite": {
    "benchmark": "S&P 500",
    "color": "#00B050",
    "benchmarkColor": "#94A3B8",
    "description": "Alto rendimiento en mercados desarrollados - 29 meses de track record",
    "returns": [
      { "date": "2023-08", "month": "Aug 2023", "fund": -0.0332, "benchmark": -0.0159 },
      { "date": "2023-09", "month": "Sep 2023", "fund": -0.0497, "benchmark": -0.0477 },
      { "date": "2023-10", "month": "Oct 2023", "fund": -0.0063, "benchmark": -0.021 },
      { "date": "2023-11", "month": "Nov 2023", "fund": 0.0713, "benchmark": 0.0913 },
      { "date": "2023-12", "month": "Dec 2023", "fund": 0.0148, "benchmark": 0.0454 },
      { "date": "2024-01", "month": "Jan 2024", "fund": -0.0157, "benchmark": 0.0168 },
      { "date": "2024-02", "month": "Feb 2024", "fund": 0.061, "benchmark": 0.0534 },
      { "date": "2024-03", "month": "Mar 2024", "fund": 0.0571, "benchmark": 0.0322 },
      { "date": "2024-04", "month": "Apr 2024", "fund": -0.0095, "benchmark": -0.0408 },
      { "date": "2024-05", "month": "May 2024", "fund": 0.0266, "benchmark": 0.0496 },
      { "date": "2024-06", "month": "Jun 2024", "fund": -0.0259, "benchmark": 0.0359 },
      { "date": "2024-07", "month": "Jul 2024", "fund": 0.0504, "benchmark": 0.0122 },
      { "date": "2024-08", "month": "Aug 2024", "fund": 0.0091, "benchmark": 0.0243 },
      { "date": "2024-09", "month": "Sep 2024", "fund": 0.0869, "benchmark": 0.0214 },
      { "date": "2024-10", "month": "Oct 2024", "fund": -0.0142, "benchmark": -0.0091 },
      { "date": "2024-11", "month": "Nov 2024", "fund": 0.0399, "benchmark": 0.0587 },
      { "date": "2024-12", "month": "Dec 2024", "fund": -0.0314, "benchmark": -0.0238 },
      { "date": "2025-01", "month": "Jan 2025", "fund": 0.0556, "benchmark": 0.0278 },
      { "date": "2025-02", "month": "Feb 2025", "fund": 0.0483, "benchmark": -0.013 },
      { "date": "2025-03", "month": "Mar 2025", "fund": 0.0064, "benchmark": -0.0563 },
      { "date": "2025-04", "month": "Apr 2025", "fund": -0.001, "benchmark": -0.0068 },
      { "date": "2025-05", "month": "May 2025", "fund": 0.0565, "benchmark": 0.0629 },
      { "date": "2025-06", "month": "Jun 2025", "fund": 0.0456, "benchmark": 0.0509 },
      { "date": "2025-07", "month": "Jul 2025", "fund": 0.0055, "benchmark": 0.0224 },
      { "date": "2025-08", "month": "Aug 2025", "fund": 0.0408, "benchmark": 0.0203 },
      { "date": "2025-09", "month": "Sep 2025", "fund": 0.089, "benchmark": 0.0365 },
      { "date": "2025-10", "month": "Oct 2025", "fund": 0.0208, "benchmark": 0.0234 },
      { "date": "2025-11", "month": "Nov 2025", "fund": 0.0363, "benchmark": 0.0025 },
      { "date": "2025-12", "month": "Dec 2025", "fund": -0.0215, "benchmark": 0.0006 }
    ]
  },
  "ALR Portfolio": {
    "benchmark": "GBMF2",
    "color": "#7030A0",
    "benchmarkColor": "#94A3B8",
    "description": "Estrategia conservadora de baja volatilidad - 15 meses de track record",
    "returns": [
      { "date": "2024-10", "month": "Oct 2024", "fund": 0.0051, "benchmark": 0.0071 },
      { "date": "2024-11", "month": "Nov 2024", "fund": 0.0073, "benchmark": 0.0067 },
      { "date": "2024-12", "month": "Dec 2024", "fund": 0.0049, "benchmark": 0.0072 },
      { "date": "2025-01", "month": "Jan 2025", "fund": 0.0066, "benchmark": 0.0067 },
      { "date": "2025-02", "month": "Feb 2025", "fund": 0.006904, "benchmark": 0.0066 },
      { "date": "2025-03", "month": "Mar 2025", "fund": 0.0055, "benchmark": 0.0072 },
      { "date": "2025-04", "month": "Apr 2025", "fund": 0.0034, "benchmark": 0.0064 },
      { "date": "2025-05", "month": "May 2025", "fund": 0.0089, "benchmark": 0.0064 },
      { "date": "2025-06", "month": "Jun 2025", "fund": 0.002326, "benchmark": 0.0063 },
      { "date": "2025-07", "month": "Jul 2025", "fund": 0.00315, "benchmark": 0.0057 },
      { "date": "2025-08", "month": "Aug 2025", "fund": 0.011092, "benchmark": 0.0053 },
      { "date": "2025-09", "month": "Sep 2025", "fund": 0.026383, "benchmark": 0.0058 },
      { "date": "2025-10", "month": "Oct 2025", "fund": -0.003599, "benchmark": 0.0053 },
      { "date": "2025-11", "month": "Nov 2025", "fund": 0.010091, "benchmark": 0.0047 },
      { "date": "2025-12", "month": "Dec 2025", "fund": -0.007392, "benchmark": 0.0054 }
    ]
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatPercent = (value) => {
  return `${value >= 0 ? '+' : ''}${(value * 100).toFixed(2)}%`;
};

export default function App() {
  const [selectedFund, setSelectedFund] = useState('LEMA Global Fund');
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [showCalculator, setShowCalculator] = useState(true);

  const fund = fundsData[selectedFund];

  // Calcular la simulación de inversión
  const simulationData = useMemo(() => {
    const returns = fund.returns;
    let fundValue = initialInvestment;
    let benchmarkValue = initialInvestment;
    let totalContributed = initialInvestment;
    
    const data = [{
      month: 'Inicio',
      date: returns[0]?.date || '',
      fundValue: initialInvestment,
      benchmarkValue: initialInvestment,
      totalContributed: initialInvestment,
      fundReturn: 0,
      benchmarkReturn: 0
    }];

    returns.forEach((r, index) => {
      // Aplicar rendimiento del mes
      fundValue = fundValue * (1 + r.fund);
      benchmarkValue = benchmarkValue * (1 + r.benchmark);
      
      // Agregar aportación mensual
      fundValue += monthlyContribution;
      benchmarkValue += monthlyContribution;
      totalContributed += monthlyContribution;

      data.push({
        month: r.month,
        date: r.date,
        fundValue: Math.round(fundValue),
        benchmarkValue: Math.round(benchmarkValue),
        totalContributed: totalContributed,
        fundReturn: r.fund,
        benchmarkReturn: r.benchmark,
        difference: Math.round(fundValue - benchmarkValue)
      });
    });

    return data;
  }, [selectedFund, initialInvestment, monthlyContribution, fund.returns]);

  const lastData = simulationData[simulationData.length - 1];
  const difference = lastData.fundValue - lastData.benchmarkValue;
  const totalGainFund = lastData.fundValue - lastData.totalContributed;
  const totalGainBenchmark = lastData.benchmarkValue - lastData.totalContributed;
  const percentGainFund = (lastData.fundValue / lastData.totalContributed - 1);
  const percentGainBenchmark = (lastData.benchmarkValue / lastData.totalContributed - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          LEMA CAPITAL
        </h1>
        <p className="text-slate-400 mt-2">Calculadora de Inversión</p>
        <p className="text-sm text-slate-500">Simula tu inversión con rendimientos históricos reales</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Fund Selector */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {Object.keys(fundsData).map((fundName) => (
            <button
              key={fundName}
              onClick={() => setSelectedFund(fundName)}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                selectedFund === fundName 
                  ? 'text-white shadow-lg' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              style={selectedFund === fundName ? { backgroundColor: fundsData[fundName].color } : {}}
            >
              {fundName}
            </button>
          ))}
        </div>

        {/* Fund Description */}
        <div className="text-center mb-6">
          <p className="text-slate-400">{fund.description}</p>
          <p className="text-sm text-slate-500 mt-1">Benchmark: {fund.benchmark}</p>
        </div>

        {/* Calculator Inputs */}
        <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Configura tu Simulación</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 mb-2">Inversión Inicial</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-8 text-white text-lg focus:outline-none focus:border-blue-500"
                  step="10000"
                  min="0"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[50000, 100000, 500000, 1000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setInitialInvestment(amount)}
                    className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                  >
                    {amount >= 1000000 ? `${amount/1000000}M` : `${amount/1000}K`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-2">Aportación Mensual</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-8 text-white text-lg focus:outline-none focus:border-blue-500"
                  step="1000"
                  min="0"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[0, 5000, 10000, 25000, 50000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setMonthlyContribution(amount)}
                    className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                  >
                    {amount === 0 ? 'Sin aport.' : `${amount/1000}K`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <p className="text-slate-400 text-sm">Total Aportado</p>
            <p className="text-xl md:text-2xl font-bold text-slate-300">{formatCurrency(lastData.totalContributed)}</p>
            <p className="text-xs text-slate-500">{fund.returns.length} meses</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700" style={{ borderColor: fund.color }}>
            <p className="text-slate-400 text-sm">Con {selectedFund.split(' ')[0]}</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: fund.color }}>{formatCurrency(lastData.fundValue)}</p>
            <p className={`text-xs ${totalGainFund >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatCurrency(totalGainFund)} ({formatPercent(percentGainFund)})
            </p>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <p className="text-slate-400 text-sm">Con {fund.benchmark}</p>
            <p className="text-xl md:text-2xl font-bold text-slate-400">{formatCurrency(lastData.benchmarkValue)}</p>
            <p className={`text-xs ${totalGainBenchmark >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatCurrency(totalGainBenchmark)} ({formatPercent(percentGainBenchmark)})
            </p>
          </div>
          
          <div className={`rounded-xl p-4 border ${difference >= 0 ? 'bg-emerald-900/30 border-emerald-700' : 'bg-red-900/30 border-red-700'}`}>
            <p className="text-slate-400 text-sm">Diferencia</p>
            <p className={`text-xl md:text-2xl font-bold ${difference >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {difference >= 0 ? '+' : ''}{formatCurrency(difference)}
            </p>
            <p className={`text-xs ${difference >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {difference >= 0 ? 'A favor con LEMA' : 'En contra'}
            </p>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700 mb-6">
          <h2 className="text-xl font-semibold mb-4">Evolución de tu Inversión</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={simulationData}>
              <defs>
                <linearGradient id="fundGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={fund.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={fund.color} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="contributedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#475569" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF" 
                fontSize={11}
                interval="preserveStartEnd"
                tickFormatter={(value, index) => {
                  if (index === 0) return 'Inicio';
                  if (index % 6 === 0 || index === simulationData.length - 1) return value;
                  return '';
                }}
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={11}
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid #475569', 
                  borderRadius: '8px' 
                }}
                formatter={(value, name) => [formatCurrency(value), name]}
                labelStyle={{ color: '#E2E8F0' }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="totalContributed" 
                name="Total Aportado"
                stroke="#475569" 
                fill="url(#contributedGradient)"
                strokeWidth={1}
                strokeDasharray="5 5"
              />
              <Area 
                type="monotone" 
                dataKey="benchmarkValue" 
                name={fund.benchmark}
                stroke="#94A3B8" 
                fill="url(#benchmarkGradient)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="fundValue" 
                name={selectedFund}
                stroke={fund.color} 
                fill="url(#fundGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Difference Chart */}
        <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700 mb-6">
          <h2 className="text-xl font-semibold mb-4">Diferencia Acumulada: {selectedFund} vs {fund.benchmark}</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={simulationData.slice(1)}>
              <defs>
                <linearGradient id="diffGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF" 
                fontSize={11}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={11}
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid #475569', 
                  borderRadius: '8px' 
                }}
                formatter={(value) => [formatCurrency(value), 'Diferencia']}
                labelStyle={{ color: '#E2E8F0' }}
              />
              <Area 
                type="monotone" 
                dataKey="difference" 
                name="Diferencia"
                stroke="#10B981" 
                fill="url(#diffGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Returns Comparison */}
        <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Rendimientos Mensuales</h2>
          <div className="overflow-x-auto max-h-80">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-800">
                <tr className="border-b border-slate-600">
                  <th className="text-left py-2 px-3 text-slate-400">Mes</th>
                  <th className="text-right py-2 px-3" style={{ color: fund.color }}>{selectedFund}</th>
                  <th className="text-right py-2 px-3 text-slate-400">{fund.benchmark}</th>
                  <th className="text-right py-2 px-3 text-slate-400">Diferencia</th>
                </tr>
              </thead>
              <tbody>
                {fund.returns.slice().reverse().map((r, idx) => (
                  <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-2 px-3">{r.month}</td>
                    <td className={`text-right py-2 px-3 ${r.fund >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatPercent(r.fund)}
                    </td>
                    <td className={`text-right py-2 px-3 ${r.benchmark >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatPercent(r.benchmark)}
                    </td>
                    <td className={`text-right py-2 px-3 font-medium ${(r.fund - r.benchmark) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatPercent(r.fund - r.benchmark)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-xs md:text-sm">
          <p>⚠️ Los rendimientos pasados no garantizan rendimientos futuros.</p>
          <p>Esta simulación utiliza datos históricos reales de los portafolios de LEMA Capital.</p>
          <p>Toda inversión implica riesgos, incluyendo la posible pérdida del capital invertido.</p>
          <p className="mt-4">© 2025 LEMA Capital Asset Management</p>
        </div>
      </div>
    </div>
  );
}
