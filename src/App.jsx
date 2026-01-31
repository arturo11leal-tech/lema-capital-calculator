import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ReferenceLine, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Datos de composición de portafolios (Top 10 Holdings y Sectores)
const portfolioComposition = {
  "LEMA Global Fund": {
    holdings: [
      { rank: 1, name: "Berkshire Hathaway Inc.", weight: 24.52 },
      { rank: 2, name: "Medica Sur, SAB de CV", weight: 14.94 },
      { rank: 3, name: "Grupo Traxión, S.A.B. de C.V.", weight: 12.74 },
      { rank: 4, name: "Grupo Bimbo, SAB de CV", weight: 8.99 },
      { rank: 5, name: "Industrias Peñoles, S.A.B. de C.V.", weight: 8.14 },
      { rank: 6, name: "Grupo Aeroportuario del Centro Norte, SAB de CV", weight: 7.44 },
      { rank: 7, name: "Grupo Financiero Banorte, SAB de CV", weight: 6.86 },
      { rank: 8, name: "PrologisProperty Mexico SA de CV", weight: 5.93 },
      { rank: 9, name: "Fomento Economico Mexicano, SAB de CV", weight: 5.46 },
      { rank: 10, name: "Cemex, SAB de CV", weight: 4.86 }
    ],
    sectors: [
      { sector: "Financials", weight: 31.38 },
      { sector: "Industrials", weight: 20.18 },
      { sector: "Health Care", weight: 14.94 },
      { sector: "Consumer Staples", weight: 14.46 },
      { sector: "Basic Materials", weight: 13.00 },
      { sector: "Real Estate", weight: 5.93 },
      { sector: "Cash & Equivalents", weight: 0.13 }
    ]
  },
  "HM Fund": {
    holdings: [
      { rank: 1, name: "Grupo Traxión, S.A.B. de C.V.", weight: 18.90 },
      { rank: 2, name: "Medica Sur, SAB de CV", weight: 14.01 },
      { rank: 3, name: "Fomento Economico Mexicano, SAB de CV", weight: 11.21 },
      { rank: 4, name: "Grupo Aeroportuario del Centro Norte, S.A.B. de C.V.", weight: 10.68 },
      { rank: 5, name: "Promotora y Operadora de Infraestructura, S.A.B. de C.V.", weight: 8.49 },
      { rank: 6, name: "Industrias Peñoles, S.A.B. de C.V.", weight: 6.68 },
      { rank: 7, name: "Grupo Bimbo, SAB de CV", weight: 5.53 },
      { rank: 8, name: "PrologisProperty Mexico SA de CV", weight: 5.10 },
      { rank: 9, name: "Fibra Mty, S.A.P.I. de C.V.", weight: 4.51 },
      { rank: 10, name: "Grupo Aeroportuario del Pacífico, S.A.B. de C.V.", weight: 4.39 }
    ],
    sectors: [
      { sector: "Industrials", weight: 46.58 },
      { sector: "Consumer Staples", weight: 16.74 },
      { sector: "Health Care", weight: 16.04 },
      { sector: "Real Estate", weight: 9.62 },
      { sector: "Basic Materials", weight: 8.67 },
      { sector: "Financials", weight: 2.25 },
      { sector: "Cash & Equivalents", weight: 0.10 }
    ]
  },
  "AL Composite": {
    holdings: [
      { rank: 1, name: "Cash (US Dollars)", weight: 5.81 },
      { rank: 2, name: "Berkshire Hathaway Inc.", weight: 5.68 },
      { rank: 3, name: "Occidental Petroleum Corporation", weight: 4.03 },
      { rank: 4, name: "VanEck Pharmaceutical ETF", weight: 3.46 },
      { rank: 5, name: "JD.com, Inc.", weight: 3.33 },
      { rank: 6, name: "Leverage Shares 2X Long UNH Daily ETF", weight: 3.25 },
      { rank: 7, name: "Fairfax Financial Holdings Ltd.", weight: 3.11 },
      { rank: 8, name: "Oscar Health, Inc.", weight: 3.10 },
      { rank: 9, name: "Alphabet Inc.", weight: 3.08 },
      { rank: 10, name: "Enbridge Inc", weight: 3.06 }
    ],
    sectors: [
      { sector: "Technology", weight: 22.53 },
      { sector: "Financials", weight: 15.64 },
      { sector: "Health Care", weight: 14.26 },
      { sector: "Energy", weight: 12.36 },
      { sector: "Industrials", weight: 9.94 },
      { sector: "Precious Metals", weight: 8.78 },
      { sector: "Cash & Crypto", weight: 6.81 },
      { sector: "Hedges", weight: 3.50 },
      { sector: "Consumer Discretionary", weight: 3.30 },
      { sector: "ETFs", weight: 2.90 }
    ]
  },
  "ALR Portfolio": {
    holdings: [
      { rank: 1, name: "Estados Unidos (Acciones)", weight: 37.4 },
      { rank: 2, name: "México (Acciones)", weight: 26.6 },
      { rank: 3, name: "Efectivo & Equivalentes", weight: 12.9 },
      { rank: 4, name: "Asia (Acciones)", weight: 8.3 },
      { rank: 5, name: "Europa (Acciones)", weight: 6.8 },
      { rank: 6, name: "Metales Preciosos", weight: 5.0 },
      { rank: 7, name: "Activos Digitales (Crypto)", weight: 3.0 }
    ],
    sectors: [
      { sector: "Industrial", weight: 25.2 },
      { sector: "Salud", weight: 13.4 },
      { sector: "Efectivo & Equivalentes", weight: 12.9 },
      { sector: "Financiero", weight: 11.1 },
      { sector: "Tecnología", weight: 9.0 },
      { sector: "Energía", weight: 5.3 },
      { sector: "Consumo Defensivo", weight: 5.1 },
      { sector: "Metales Preciosos", weight: 5.0 },
      { sector: "ETFs", weight: 3.7 },
      { sector: "FIBRA/Bienes Raíces", weight: 3.7 },
      { sector: "Activos Digitales", weight: 3.0 },
      { sector: "Servicios Públicos", weight: 1.7 },
      { sector: "Cobertura", weight: 0.8 }
    ]
  }
};

// Colores para gráficos de pie/sectores
const SECTOR_COLORS = ['#1F4E79', '#2E75B6', '#00B050', '#7030A0', '#FFC000', '#C00000', '#00B0F0', '#92D050', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

// Estadísticas calculadas de los datos reales
const fundsStats = {
  "LEMA Global Fund": {
    benchmark: "IPC México",
    color: "#1F4E79",
    description: "Estrategia global diversificada",
    n_months: 63,
    last_month: 0.0244,
    last_3m: 0.0493,
    last_6m: 0.1016,
    last_12m: 0.1793,
    cumulative: 0.9132,
    annualized: 0.1315,
    std_annual: 0.1290,
    std_bench_annual: 0.1640,
    alpha: 0.0231,
    sharpe: 0.40,
    beta: 0.66,
    correlation: 0.82,
    max_drawdown: -0.0995,
    best_month: 0.1154,
    worst_month: -0.0727,
    positive_months: 37,
    negative_months: 26,
    win_rate: 0.587,
    upside_capture: 0.8251,
    downside_capture: 0.6029,
    n_holdings: 10,
    returns: [
      { date: "2020-10", month: "Oct 2020", fund: -0.0173, benchmark: -0.012569 },
      { date: "2020-11", month: "Nov 2020", fund: 0.1154, benchmark: 0.129529 },
      { date: "2020-12", month: "Dec 2020", fund: 0.0721, benchmark: 0.054765 },
      { date: "2021-01", month: "Jan 2021", fund: -0.0505, benchmark: -0.024534 },
      { date: "2021-02", month: "Feb 2021", fund: 0.0096, benchmark: 0.037389 },
      { date: "2021-03", month: "Mar 2021", fund: 0.0219, benchmark: 0.059502 },
      { date: "2021-04", month: "Apr 2021", fund: 0.0283, benchmark: 0.016159 },
      { date: "2021-05", month: "May 2021", fund: 0.03, benchmark: 0.059909 },
      { date: "2021-06", month: "Jun 2021", fund: -0.0051, benchmark: -0.011716 },
      { date: "2021-07", month: "Jul 2021", fund: 0.0069, benchmark: 0.011505 },
      { date: "2021-08", month: "Aug 2021", fund: 0.0286, benchmark: 0.047897 },
      { date: "2021-09", month: "Sep 2021", fund: -0.0254, benchmark: -0.036 },
      { date: "2021-10", month: "Oct 2021", fund: 0.0024, benchmark: -0.0015 },
      { date: "2021-11", month: "Nov 2021", fund: -0.0165, benchmark: -0.0314 },
      { date: "2021-12", month: "Dec 2021", fund: 0.0622, benchmark: 0.0719 },
      { date: "2022-01", month: "Jan 2022", fund: -0.0727, benchmark: -0.0364 },
      { date: "2022-02", month: "Feb 2022", fund: 0.0188, benchmark: 0.0403 },
      { date: "2022-03", month: "Mar 2022", fund: 0.0026, benchmark: 0.0587 },
      { date: "2022-04", month: "Apr 2022", fund: -0.029, benchmark: -0.0905 },
      { date: "2022-05", month: "May 2022", fund: 0.0487, benchmark: 0.0065 },
      { date: "2022-06", month: "Jun 2022", fund: -0.0664, benchmark: -0.0817 },
      { date: "2022-07", month: "Jul 2022", fund: 0.0731, benchmark: 0.013 },
      { date: "2022-08", month: "Aug 2022", fund: -0.0362, benchmark: -0.067 },
      { date: "2022-09", month: "Sep 2022", fund: 0.013, benchmark: -0.0065 },
      { date: "2022-10", month: "Oct 2022", fund: 0.0857, benchmark: 0.1187 },
      { date: "2022-11", month: "Nov 2022", fund: 0.0547, benchmark: 0.0353 },
      { date: "2022-12", month: "Dec 2022", fund: -0.0375, benchmark: -0.0624 },
      { date: "2023-01", month: "Jan 2023", fund: 0.0777, benchmark: 0.1259 },
      { date: "2023-02", month: "Feb 2023", fund: -0.0384, benchmark: -0.0331 },
      { date: "2023-03", month: "Mar 2023", fund: 0.0353, benchmark: 0.0217 },
      { date: "2023-04", month: "Apr 2023", fund: 0.0504, benchmark: 0.0226 },
      { date: "2023-05", month: "May 2023", fund: -0.0131, benchmark: -0.0433 },
      { date: "2023-06", month: "Jun 2023", fund: -0.0093, benchmark: 0.015 },
      { date: "2023-07", month: "Jul 2023", fund: 0.0067, benchmark: 0.0242 },
      { date: "2023-08", month: "Aug 2023", fund: -0.0001, benchmark: -0.0328 },
      { date: "2023-09", month: "Sep 2023", fund: -0.0055, benchmark: -0.0405 },
      { date: "2023-10", month: "Oct 2023", fund: -0.0275, benchmark: -0.0356 },
      { date: "2023-11", month: "Nov 2023", fund: 0.0833, benchmark: 0.1019 },
      { date: "2023-12", month: "Dec 2023", fund: 0.02, benchmark: 0.0614 },
      { date: "2024-01", month: "Jan 2024", fund: -0.0162, benchmark: -0.0002 },
      { date: "2024-02", month: "Feb 2024", fund: 0.0117, benchmark: -0.0341 },
      { date: "2024-03", month: "Mar 2024", fund: 0.0225, benchmark: 0.0353 },
      { date: "2024-04", month: "Apr 2024", fund: -0.0088, benchmark: -0.0112 },
      { date: "2024-05", month: "May 2024", fund: -0.0205, benchmark: -0.0273 },
      { date: "2024-06", month: "Jun 2024", fund: -0.0107, benchmark: -0.0496 },
      { date: "2024-07", month: "Jul 2024", fund: 0.0362, benchmark: 0.0125 },
      { date: "2024-08", month: "Aug 2024", fund: 0.0234, benchmark: -0.0209 },
      { date: "2024-09", month: "Sep 2024", fund: 0.0308, benchmark: 0.0094 },
      { date: "2024-10", month: "Oct 2024", fund: -0.0029, benchmark: -0.0347 },
      { date: "2024-11", month: "Nov 2024", fund: -0.0098, benchmark: -0.0167 },
      { date: "2024-12", month: "Dec 2024", fund: -0.0269, benchmark: -0.006 },
      { date: "2025-01", month: "Jan 2025", fund: 0.0291, benchmark: 0.0343 },
      { date: "2025-02", month: "Feb 2025", fund: 0.0073, benchmark: 0.0218 },
      { date: "2025-03", month: "Mar 2025", fund: -0.0077, benchmark: 0.003 },
      { date: "2025-04", month: "Apr 2025", fund: 0.037, benchmark: 0.0719 },
      { date: "2025-05", month: "May 2025", fund: 0.0386, benchmark: 0.0281 },
      { date: "2025-06", month: "Jun 2025", fund: -0.0337, benchmark: -0.0068 },
      { date: "2025-07", month: "Jul 2025", fund: 0.0051, benchmark: -0.0009 },
      { date: "2025-08", month: "Aug 2025", fund: 0.0068, benchmark: 0.0228 },
      { date: "2025-09", month: "Sep 2025", fund: 0.0375, benchmark: 0.0717 },
      { date: "2025-10", month: "Oct 2025", fund: -0.0001, benchmark: -0.0023 },
      { date: "2025-11", month: "Nov 2025", fund: 0.0244, benchmark: 0.0132 },
      { date: "2025-12", month: "Dec 2025", fund: 0.0244, benchmark: 0.0112 }
    ]
  },
  "HM Fund": {
    benchmark: "IPC México",
    color: "#2E75B6",
    description: "Estrategia de valor México y Latam",
    n_months: 54,
    last_month: 0.0227,
    last_3m: 0.0409,
    last_6m: 0.1183,
    last_12m: 0.2918,
    cumulative: 0.7610,
    annualized: 0.1340,
    std_annual: 0.1288,
    std_bench_annual: 0.1605,
    alpha: 0.0779,
    sharpe: 0.42,
    beta: 0.68,
    correlation: 0.83,
    max_drawdown: -0.0879,
    best_month: 0.1050,
    worst_month: -0.0603,
    positive_months: 30,
    negative_months: 24,
    win_rate: 0.556,
    upside_capture: 1.0148,
    downside_capture: 0.3464,
    n_holdings: 10,
    returns: [
      { date: "2021-07", month: "Jul 2021", fund: -0.0142, benchmark: 0.011505 },
      { date: "2021-08", month: "Aug 2021", fund: 0.0327, benchmark: 0.047897 },
      { date: "2021-09", month: "Sep 2021", fund: 0.0119, benchmark: -0.036 },
      { date: "2021-10", month: "Oct 2021", fund: -0.0045, benchmark: -0.0015 },
      { date: "2021-11", month: "Nov 2021", fund: -0.0184, benchmark: -0.0314 },
      { date: "2021-12", month: "Dec 2021", fund: 0.0488, benchmark: 0.0719 },
      { date: "2022-01", month: "Jan 2022", fund: -0.0073, benchmark: -0.0364 },
      { date: "2022-02", month: "Feb 2022", fund: 0.0261, benchmark: 0.0403 },
      { date: "2022-03", month: "Mar 2022", fund: 0.0109, benchmark: 0.0587 },
      { date: "2022-04", month: "Apr 2022", fund: -0.0353, benchmark: -0.0905 },
      { date: "2022-05", month: "May 2022", fund: 0.051, benchmark: 0.0065 },
      { date: "2022-06", month: "Jun 2022", fund: -0.0603, benchmark: -0.0817 },
      { date: "2022-07", month: "Jul 2022", fund: 0.0587, benchmark: 0.013 },
      { date: "2022-08", month: "Aug 2022", fund: -0.0286, benchmark: -0.067 },
      { date: "2022-09", month: "Sep 2022", fund: 0.0084, benchmark: -0.0065 },
      { date: "2022-10", month: "Oct 2022", fund: 0.0835, benchmark: 0.1187 },
      { date: "2022-11", month: "Nov 2022", fund: 0.0616, benchmark: 0.0353 },
      { date: "2022-12", month: "Dec 2022", fund: -0.0297, benchmark: -0.0624 },
      { date: "2023-01", month: "Jan 2023", fund: 0.0892, benchmark: 0.1259 },
      { date: "2023-02", month: "Feb 2023", fund: -0.0142, benchmark: -0.0331 },
      { date: "2023-03", month: "Mar 2023", fund: 0.0341, benchmark: 0.0217 },
      { date: "2023-04", month: "Apr 2023", fund: 0.0039, benchmark: 0.0226 },
      { date: "2023-05", month: "May 2023", fund: -0.0125, benchmark: -0.0433 },
      { date: "2023-06", month: "Jun 2023", fund: -0.002, benchmark: 0.015 },
      { date: "2023-07", month: "Jul 2023", fund: 0.0201, benchmark: 0.0242 },
      { date: "2023-08", month: "Aug 2023", fund: -0.0091, benchmark: -0.0328 },
      { date: "2023-09", month: "Sep 2023", fund: -0.0153, benchmark: -0.0405 },
      { date: "2023-10", month: "Oct 2023", fund: -0.0543, benchmark: -0.0356 },
      { date: "2023-11", month: "Nov 2023", fund: 0.105, benchmark: 0.1019 },
      { date: "2023-12", month: "Dec 2023", fund: 0.0759, benchmark: 0.0614 },
      { date: "2024-01", month: "Jan 2024", fund: -0.0338, benchmark: -0.0002 },
      { date: "2024-02", month: "Feb 2024", fund: -0.0231, benchmark: -0.0341 },
      { date: "2024-03", month: "Mar 2024", fund: 0.0344, benchmark: 0.0353 },
      { date: "2024-04", month: "Apr 2024", fund: -0.0095, benchmark: -0.0112 },
      { date: "2024-05", month: "May 2024", fund: -0.0083, benchmark: -0.0273 },
      { date: "2024-06", month: "Jun 2024", fund: -0.049, benchmark: -0.0496 },
      { date: "2024-07", month: "Jul 2024", fund: 0.0242, benchmark: 0.0125 },
      { date: "2024-08", month: "Aug 2024", fund: 0.002, benchmark: -0.0209 },
      { date: "2024-09", month: "Sep 2024", fund: 0.0123, benchmark: 0.0094 },
      { date: "2024-10", month: "Oct 2024", fund: 0.0045, benchmark: -0.0347 },
      { date: "2024-11", month: "Nov 2024", fund: -0.0151, benchmark: -0.0167 },
      { date: "2024-12", month: "Dec 2024", fund: -0.0133, benchmark: -0.006 },
      { date: "2025-01", month: "Jan 2025", fund: 0.0251, benchmark: 0.0343 },
      { date: "2025-02", month: "Feb 2025", fund: -0.0036, benchmark: 0.0218 },
      { date: "2025-03", month: "Mar 2025", fund: 0.0046, benchmark: 0.003 },
      { date: "2025-04", month: "Apr 2025", fund: 0.0389, benchmark: 0.0719 },
      { date: "2025-05", month: "May 2025", fund: 0.0958, benchmark: 0.0281 },
      { date: "2025-06", month: "Jun 2025", fund: -0.0111, benchmark: -0.0068 },
      { date: "2025-07", month: "Jul 2025", fund: 0.026, benchmark: -0.0009 },
      { date: "2025-08", month: "Aug 2025", fund: 0.0048, benchmark: 0.0228 },
      { date: "2025-09", month: "Sep 2025", fund: 0.0421, benchmark: 0.0717 },
      { date: "2025-10", month: "Oct 2025", fund: -0.0048, benchmark: -0.0023 },
      { date: "2025-11", month: "Nov 2025", fund: 0.0227, benchmark: 0.0132 },
      { date: "2025-12", month: "Dec 2025", fund: 0.0227, benchmark: 0.0112 }
    ]
  },
  "AL Composite": {
    benchmark: "S&P 500",
    color: "#00B050",
    description: "Alto rendimiento en mercados desarrollados",
    n_months: 29,
    last_month: -0.0215,
    last_3m: 0.0351,
    last_6m: 0.1797,
    last_12m: 0.4498,
    cumulative: 0.8001,
    annualized: 0.2754,
    std_annual: 0.1312,
    std_bench_annual: 0.1218,
    alpha: 0.0788,
    sharpe: 1.49,
    beta: 0.70,
    correlation: 0.63,
    max_drawdown: -0.0557,
    best_month: 0.0890,
    worst_month: -0.0497,
    positive_months: 19,
    negative_months: 10,
    win_rate: 0.655,
    upside_capture: 1.0161,
    downside_capture: 0.5605,
    n_holdings: 37,
    returns: [
      { date: "2023-08", month: "Aug 2023", fund: -0.0332, benchmark: -0.0159 },
      { date: "2023-09", month: "Sep 2023", fund: -0.0497, benchmark: -0.0477 },
      { date: "2023-10", month: "Oct 2023", fund: -0.0063, benchmark: -0.021 },
      { date: "2023-11", month: "Nov 2023", fund: 0.0713, benchmark: 0.0913 },
      { date: "2023-12", month: "Dec 2023", fund: 0.0148, benchmark: 0.0454 },
      { date: "2024-01", month: "Jan 2024", fund: -0.0157, benchmark: 0.0168 },
      { date: "2024-02", month: "Feb 2024", fund: 0.061, benchmark: 0.0534 },
      { date: "2024-03", month: "Mar 2024", fund: 0.0571, benchmark: 0.0322 },
      { date: "2024-04", month: "Apr 2024", fund: -0.0095, benchmark: -0.0408 },
      { date: "2024-05", month: "May 2024", fund: 0.0266, benchmark: 0.0496 },
      { date: "2024-06", month: "Jun 2024", fund: -0.0259, benchmark: 0.0359 },
      { date: "2024-07", month: "Jul 2024", fund: 0.0504, benchmark: 0.0122 },
      { date: "2024-08", month: "Aug 2024", fund: 0.0091, benchmark: 0.0243 },
      { date: "2024-09", month: "Sep 2024", fund: 0.0869, benchmark: 0.0214 },
      { date: "2024-10", month: "Oct 2024", fund: -0.0142, benchmark: -0.0091 },
      { date: "2024-11", month: "Nov 2024", fund: 0.0399, benchmark: 0.0587 },
      { date: "2024-12", month: "Dec 2024", fund: -0.0314, benchmark: -0.0238 },
      { date: "2025-01", month: "Jan 2025", fund: 0.0556, benchmark: 0.0278 },
      { date: "2025-02", month: "Feb 2025", fund: 0.0483, benchmark: -0.013 },
      { date: "2025-03", month: "Mar 2025", fund: 0.0064, benchmark: -0.0563 },
      { date: "2025-04", month: "Apr 2025", fund: -0.001, benchmark: -0.0068 },
      { date: "2025-05", month: "May 2025", fund: 0.0565, benchmark: 0.0629 },
      { date: "2025-06", month: "Jun 2025", fund: 0.0456, benchmark: 0.0509 },
      { date: "2025-07", month: "Jul 2025", fund: 0.0055, benchmark: 0.0224 },
      { date: "2025-08", month: "Aug 2025", fund: 0.0408, benchmark: 0.0203 },
      { date: "2025-09", month: "Sep 2025", fund: 0.089, benchmark: 0.0365 },
      { date: "2025-10", month: "Oct 2025", fund: 0.0208, benchmark: 0.0234 },
      { date: "2025-11", month: "Nov 2025", fund: 0.0363, benchmark: 0.0025 },
      { date: "2025-12", month: "Dec 2025", fund: -0.0215, benchmark: 0.0006 }
    ]
  },
  "ALR Portfolio": {
    benchmark: "GBMF2",
    color: "#7030A0",
    description: "Estrategia conservadora de baja volatilidad",
    n_months: 15,
    last_month: -0.0074,
    last_3m: 0.0254,
    last_6m: 0.0400,
    last_12m: 0.0755,
    cumulative: 0.0942,
    annualized: 0.0747,
    std_annual: 0.0260,
    std_bench_annual: 0.1020,
    alpha: 0.0530,
    sharpe: 0.42,
    beta: 0.06,
    correlation: 0.48,
    max_drawdown: -0.0074,
    best_month: 0.0264,
    worst_month: -0.0074,
    positive_months: 13,
    negative_months: 2,
    win_rate: 0.867,
    upside_capture: 0.258,
    downside_capture: -0.282,
    dividend_yield: 0.019,
    n_holdings: 34,
    returns: [
      { date: "2024-10", month: "Oct 2024", fund: 0.0051, benchmark: 0.0071 },
      { date: "2024-11", month: "Nov 2024", fund: 0.0073, benchmark: 0.0067 },
      { date: "2024-12", month: "Dec 2024", fund: 0.0049, benchmark: 0.0072 },
      { date: "2025-01", month: "Jan 2025", fund: 0.0066, benchmark: 0.0067 },
      { date: "2025-02", month: "Feb 2025", fund: 0.0069, benchmark: 0.0066 },
      { date: "2025-03", month: "Mar 2025", fund: 0.0055, benchmark: 0.0072 },
      { date: "2025-04", month: "Apr 2025", fund: 0.0034, benchmark: 0.0064 },
      { date: "2025-05", month: "May 2025", fund: 0.0089, benchmark: 0.0064 },
      { date: "2025-06", month: "Jun 2025", fund: 0.0023, benchmark: 0.0063 },
      { date: "2025-07", month: "Jul 2025", fund: 0.0032, benchmark: 0.0057 },
      { date: "2025-08", month: "Aug 2025", fund: 0.0111, benchmark: 0.0053 },
      { date: "2025-09", month: "Sep 2025", fund: 0.0264, benchmark: 0.0058 },
      { date: "2025-10", month: "Oct 2025", fund: -0.0036, benchmark: 0.0053 },
      { date: "2025-11", month: "Nov 2025", fund: 0.0101, benchmark: 0.0047 },
      { date: "2025-12", month: "Dec 2025", fund: -0.0074, benchmark: 0.0054 }
    ]
  }
};

// Funciones de formato
const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '$0';
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '0';
  return new Intl.NumberFormat('es-MX').format(Math.round(value));
};

const formatPercent = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return '0.00%';
  const pct = value * 100;
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(decimals)}%`;
};

const formatPercentPlain = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return '0.00%';
  return `${(value * 100).toFixed(decimals)}%`;
};

export default function App() {
  const [selectedFund, setSelectedFund] = useState('LEMA Global Fund');
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [activeTab, setActiveTab] = useState('simulator');
  
  // Estados para Análisis de Retiro
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySavings, setMonthlySavings] = useState(10000);
  const [monthlyRetirementExpense, setMonthlyRetirementExpense] = useState(30000);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);

  const fund = fundsStats[selectedFund];
  const composition = portfolioComposition[selectedFund];

  // Simulación histórica
  const simulationData = useMemo(() => {
    const returns = fund.returns;
    let fundValue = initialInvestment;
    let benchmarkValue = initialInvestment;
    let totalContributed = initialInvestment;
    
    const data = [{ month: 'Inicio', fundValue: initialInvestment, benchmarkValue: initialInvestment, totalContributed: initialInvestment }];

    returns.forEach((r) => {
      fundValue = fundValue * (1 + r.fund) + monthlyContribution;
      benchmarkValue = benchmarkValue * (1 + r.benchmark) + monthlyContribution;
      totalContributed += monthlyContribution;
      data.push({ month: r.month, fundValue: Math.round(fundValue), benchmarkValue: Math.round(benchmarkValue), totalContributed, difference: Math.round(fundValue - benchmarkValue) });
    });

    return data;
  }, [selectedFund, initialInvestment, monthlyContribution]);

  // Proyección de retiro
  const retirementProjection = useMemo(() => {
    const annualReturn = fund.annualized;
    const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const monthsInRetirement = yearsInRetirement * 12;
    
    let balance = currentSavings;
    const accumulationData = [];
    
    for (let year = currentAge; year <= retirementAge; year++) {
      accumulationData.push({ year, balance: Math.round(balance), phase: 'accumulation' });
      if (year < retirementAge) {
        for (let m = 0; m < 12; m++) { balance = balance * (1 + monthlyReturn) + monthlySavings; }
      }
    }
    
    const balanceAtRetirement = balance;
    
    let maxMonthlyWithdrawal;
    if (monthlyReturn > 0 && monthsInRetirement > 0) {
      const pvFactor = (1 - Math.pow(1 + monthlyReturn, -monthsInRetirement)) / monthlyReturn;
      maxMonthlyWithdrawal = balanceAtRetirement / pvFactor;
    } else {
      maxMonthlyWithdrawal = balanceAtRetirement / monthsInRetirement;
    }
    
    let retirementBalance = balanceAtRetirement;
    const withdrawalData = [];
    let yearsUntilDepleted = yearsInRetirement;
    
    for (let year = retirementAge; year <= lifeExpectancy; year++) {
      withdrawalData.push({ year, balance: Math.round(Math.max(0, retirementBalance)), phase: 'withdrawal' });
      if (year < lifeExpectancy && retirementBalance > 0) {
        for (let m = 0; m < 12; m++) {
          retirementBalance = retirementBalance * (1 + monthlyReturn) - monthlyRetirementExpense;
          if (retirementBalance <= 0) { yearsUntilDepleted = year - retirementAge + (m / 12); retirementBalance = 0; break; }
        }
      }
    }
    
    const finalBalance = Math.max(0, retirementBalance);
    const canSustain = finalBalance > 0;
    
    return { accumulationData, withdrawalData, balanceAtRetirement: Math.round(balanceAtRetirement), finalBalance: Math.round(finalBalance), canSustain, yearsUntilDepleted: canSustain ? yearsInRetirement : Math.round(yearsUntilDepleted * 10) / 10, maxMonthlyWithdrawal: Math.round(maxMonthlyWithdrawal), totalContributed: currentSavings + (monthlySavings * monthsToRetirement), annualReturn };
  }, [selectedFund, currentAge, retirementAge, currentSavings, monthlySavings, monthlyRetirementExpense, lifeExpectancy, fund.annualized]);

  const lastData = simulationData[simulationData.length - 1];
  const difference = lastData.fundValue - lastData.benchmarkValue;
  const percentGainFund = (lastData.fundValue / lastData.totalContributed - 1);
  const fullRetirementData = [...retirementProjection.accumulationData, ...retirementProjection.withdrawalData.slice(1)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="text-center py-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">LEMA CAPITAL</h1>
        <p className="text-slate-400 mt-1">Planificador Financiero</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <button onClick={() => setActiveTab('simulator')} className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'simulator' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>📊 Simulador</button>
          <button onClick={() => setActiveTab('stats')} className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'stats' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>📈 Estadísticas</button>
          <button onClick={() => setActiveTab('composition')} className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'composition' ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>🏢 Composición</button>
          <button onClick={() => setActiveTab('retirement')} className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'retirement' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>🏖️ Retiro</button>
          <button onClick={() => setActiveTab('glossary')} className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'glossary' ? 'bg-rose-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>📚 Glosario</button>
        </div>

        {/* Fund Selector */}
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {Object.keys(fundsStats).map((fundName) => (
            <button key={fundName} onClick={() => setSelectedFund(fundName)} className={`px-3 py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${selectedFund === fundName ? 'text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`} style={selectedFund === fundName ? { backgroundColor: fundsStats[fundName].color } : {}}>
              {fundName}
            </button>
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-slate-400 text-sm">{fund.description} • {fund.n_months} meses de track record</p>
        </div>

        {/* ==================== COMPOSICIÓN ==================== */}
        {activeTab === 'composition' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Top 10 Holdings */}
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-4">🏆 Top {composition.holdings.length} Posiciones</h2>
                <div className="space-y-3">
                  {composition.holdings.map((holding, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-slate-500 w-6 text-sm">{holding.rank}.</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm truncate pr-2">{holding.name}</span>
                          <span className="font-medium text-sm" style={{ color: fund.color }}>{holding.weight.toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="h-2 rounded-full" style={{ width: `${Math.min(holding.weight * 3, 100)}%`, backgroundColor: fund.color, opacity: 1 - (idx * 0.07) }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sector Allocation */}
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-4">📊 Distribución por Sector</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={composition.sectors} dataKey="weight" nameKey="sector" cx="50%" cy="50%" outerRadius={80} label={({ sector, weight }) => `${weight.toFixed(1)}%`} labelLine={false}>
                      {composition.sectors.map((entry, index) => (<Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} />))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {composition.sectors.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: SECTOR_COLORS[idx % SECTOR_COLORS.length] }}></div>
                      <span className="text-slate-400 truncate">{s.sector}</span>
                      <span className="ml-auto font-medium">{s.weight.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sector Bar Chart */}
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
              <h2 className="text-xl font-semibold mb-4">📈 Sectores por Peso</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={composition.sectors} layout="vertical" margin={{ left: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" fontSize={10} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="sector" stroke="#9CA3AF" fontSize={10} width={100} />
                  <Tooltip formatter={(value) => `${value.toFixed(2)}%`} contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }} />
                  <Bar dataKey="weight" fill={fund.color} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ==================== ESTADÍSTICAS ==================== */}
        {activeTab === 'stats' && (
          <>
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-center">📈 Rendimientos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[['Último Mes', fund.last_month], ['Últimos 3M', fund.last_3m], ['Últimos 6M', fund.last_6m], ['Últimos 12M', fund.last_12m], ['Acumulado', fund.cumulative], ['Anualizado', fund.annualized]].map(([label, value], idx) => (
                  <div key={idx} className={`bg-slate-700/50 rounded-lg p-4 text-center ${idx === 5 ? 'border-2' : ''}`} style={idx === 5 ? { borderColor: fund.color } : {}}>
                    <p className="text-slate-400 text-xs mb-1">{label}</p>
                    <p className={`text-xl font-bold ${value >= 0 ? 'text-emerald-400' : 'text-red-400'}`} style={idx === 5 ? { color: fund.color } : {}}>{formatPercent(value)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h3 className="text-lg font-semibold mb-4">📊 Métricas de Riesgo</h3>
                <div className="space-y-3">
                  {[['Volatilidad (Anual)', formatPercentPlain(fund.std_annual)], ['Vol. ' + fund.benchmark, formatPercentPlain(fund.std_bench_annual), 'text-slate-500'], ['Max Drawdown', formatPercentPlain(fund.max_drawdown), 'text-red-400'], ['Sharpe Ratio', fund.sharpe.toFixed(2), fund.sharpe >= 1 ? 'text-emerald-400' : fund.sharpe >= 0.5 ? 'text-amber-400' : ''], ['Beta vs ' + fund.benchmark, fund.beta.toFixed(2)], ['Correlación', fund.correlation.toFixed(2)]].map(([label, value, cls], idx) => (
                    <div key={idx} className="flex justify-between items-center"><span className="text-slate-400">{label}</span><span className={`font-medium ${cls || ''}`}>{value}</span></div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h3 className="text-lg font-semibold mb-4">🎯 Alpha y Consistencia</h3>
                <div className="space-y-3">
                  {[['Alpha vs ' + fund.benchmark, formatPercent(fund.alpha), fund.alpha >= 0 ? 'text-emerald-400' : 'text-red-400'], ['Mejor Mes', formatPercent(fund.best_month), 'text-emerald-400'], ['Peor Mes', formatPercent(fund.worst_month), 'text-red-400'], ['Meses Positivos', `${fund.positive_months} de ${fund.n_months}`], ['Win Rate', formatPercentPlain(fund.win_rate, 1), fund.win_rate >= 0.6 ? 'text-emerald-400' : 'text-amber-400'], ['# Posiciones', fund.n_holdings || 'N/A']].map(([label, value, cls], idx) => (
                    <div key={idx} className="flex justify-between items-center"><span className="text-slate-400">{label}</span><span className={`font-medium ${cls || ''}`}>{value}</span></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Capture Ratios */}
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h3 className="text-lg font-semibold mb-4">📈 Captura de Mercado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-slate-400 text-sm mb-2">Captura en Alzas (Upside)</p>
                  <p className="text-3xl font-bold" style={{ color: fund.upside_capture >= 1 ? '#10B981' : fund.color }}>{formatPercentPlain(fund.upside_capture, 1)}</p>
                  <p className="text-xs text-slate-500 mt-1">Cuando {fund.benchmark} sube, capturamos {formatPercentPlain(fund.upside_capture, 0)} del alza</p>
                  <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
                    <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${Math.min(fund.upside_capture * 100, 100)}%` }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-sm mb-2">Captura en Bajas (Downside)</p>
                  <p className="text-3xl font-bold" style={{ color: fund.downside_capture <= 0.5 ? '#10B981' : '#EF4444' }}>{formatPercentPlain(fund.downside_capture, 1)}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {fund.downside_capture < 0 
                      ? `Cuando ${fund.benchmark} baja, ¡el portafolio tiende a subir!` 
                      : `Cuando ${fund.benchmark} baja, solo caemos ${formatPercentPlain(fund.downside_capture, 0)}`}
                  </p>
                  <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
                    <div className="h-3 rounded-full" style={{ width: `${Math.min(Math.abs(fund.downside_capture) * 100, 100)}%`, backgroundColor: fund.downside_capture <= 0.5 ? '#10B981' : '#EF4444' }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                <p className="text-sm text-slate-400">
                  💡 <strong>Interpretación:</strong> {fund.downside_capture < 0 
                    ? '¡Excelente! El portafolio tiene correlación inversa al mercado en bajas - sube cuando el mercado cae.'
                    : fund.upside_capture >= 1 && fund.downside_capture < 0.7 
                    ? 'Excelente perfil: captura más ganancias y menos pérdidas que el mercado.' 
                    : fund.downside_capture < 0.7 
                    ? 'Buena protección a la baja: cuando el mercado cae, este portafolio cae menos.'
                    : 'El portafolio tiende a seguir al mercado de cerca.'}
                </p>
              </div>
            </div>
          </>
        )}

        {/* ==================== SIMULADOR ==================== */}
        {activeTab === 'simulator' && (
          <>
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-lg font-semibold mb-4 text-center">Configura tu Simulación</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 mb-2 text-sm">Inversión Inicial</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)} className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-8 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex gap-2 mt-2">{[50000, 100000, 500000, 1000000].map((amt) => (<button key={amt} onClick={() => setInitialInvestment(amt)} className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded">{amt >= 1000000 ? `${amt/1000000}M` : `${amt/1000}K`}</button>))}</div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-2 text-sm">Aportación Mensual</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)} className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-8 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex gap-2 mt-2">{[0, 5000, 10000, 25000].map((amt) => (<button key={amt} onClick={() => setMonthlyContribution(amt)} className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded">{amt === 0 ? 'Sin aport.' : `${amt/1000}K`}</button>))}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"><p className="text-slate-400 text-xs">Total Aportado</p><p className="text-xl font-bold text-slate-300">{formatCurrency(lastData.totalContributed)}</p></div>
              <div className="bg-slate-800/50 rounded-xl p-4 border-2" style={{ borderColor: fund.color }}><p className="text-slate-400 text-xs">Con {selectedFund.split(' ')[0]}</p><p className="text-xl font-bold" style={{ color: fund.color }}>{formatCurrency(lastData.fundValue)}</p><p className="text-xs text-emerald-400">{formatPercent(percentGainFund)}</p></div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"><p className="text-slate-400 text-xs">Con {fund.benchmark}</p><p className="text-xl font-bold text-slate-400">{formatCurrency(lastData.benchmarkValue)}</p></div>
              <div className={`rounded-xl p-4 border ${difference >= 0 ? 'bg-emerald-900/30 border-emerald-700' : 'bg-red-900/30 border-red-700'}`}><p className="text-slate-400 text-xs">Diferencia</p><p className={`text-xl font-bold ${difference >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{difference >= 0 ? '+' : ''}{formatCurrency(difference)}</p></div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700">
              <h2 className="text-lg font-semibold mb-4">Evolución de tu Inversión</h2>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={simulationData}>
                  <defs><linearGradient id="fundGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={fund.color} stopOpacity={0.3}/><stop offset="95%" stopColor={fund.color} stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} interval="preserveStartEnd" />
                  <YAxis stroke="#9CA3AF" fontSize={10} tickFormatter={(v) => `$${formatNumber(v/1000)}K`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }} formatter={(v) => [formatCurrency(v), '']} />
                  <Legend />
                  <Area type="monotone" dataKey="totalContributed" name="Aportado" stroke="#475569" fill="transparent" strokeDasharray="5 5" />
                  <Area type="monotone" dataKey="benchmarkValue" name={fund.benchmark} stroke="#94A3B8" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="fundValue" name={selectedFund} stroke={fund.color} fill="url(#fundGrad)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ==================== ANÁLISIS DE RETIRO ==================== */}
        {activeTab === 'retirement' && (
          <>
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-lg font-semibold mb-4 text-center">🏖️ Configura tu Plan de Retiro</h2>
              <p className="text-center text-slate-400 text-sm mb-4">Usando rendimiento anualizado de {formatPercentPlain(fund.annualized)} ({selectedFund})</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[['Tu edad actual', currentAge, setCurrentAge], ['Edad de retiro', retirementAge, setRetirementAge], ['Expectativa de vida', lifeExpectancy, setLifeExpectancy], ['Ahorro actual', currentSavings, setCurrentSavings], ['Ahorro mensual', monthlySavings, setMonthlySavings], ['Gasto mensual en retiro', monthlyRetirementExpense, setMonthlyRetirementExpense]].map(([label, value, setter], idx) => (
                  <div key={idx}>
                    <label className="block text-slate-400 mb-1 text-sm">{label}</label>
                    <input type="number" value={value} onChange={(e) => setter(Number(e.target.value) || 0)} className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-white" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"><p className="text-slate-400 text-xs">Años hasta retiro</p><p className="text-2xl font-bold text-blue-400">{retirementAge - currentAge}</p></div>
              <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-700"><p className="text-slate-400 text-xs">Capital al retirarte</p><p className="text-2xl font-bold text-emerald-400">{formatCurrency(retirementProjection.balanceAtRetirement)}</p></div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-amber-700"><p className="text-slate-400 text-xs">Retiro máximo sostenible</p><p className="text-2xl font-bold text-amber-400">{formatCurrency(retirementProjection.maxMonthlyWithdrawal)}</p><p className="text-xs text-slate-500">/mes</p></div>
              <div className={`rounded-xl p-4 border ${retirementProjection.canSustain ? 'bg-emerald-900/30 border-emerald-700' : 'bg-red-900/30 border-red-700'}`}><p className="text-slate-400 text-xs">Estado</p><p className={`text-2xl font-bold ${retirementProjection.canSustain ? 'text-emerald-400' : 'text-red-400'}`}>{retirementProjection.canSustain ? '✓ Viable' : '⚠ Ajustar'}</p></div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-lg font-semibold mb-4">Proyección de Patrimonio</h2>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={fullRetirementData}>
                  <defs><linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9CA3AF" fontSize={10} />
                  <YAxis stroke="#9CA3AF" fontSize={10} tickFormatter={(v) => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${formatNumber(v/1000)}K`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }} formatter={(v) => [formatCurrency(v), 'Patrimonio']} labelFormatter={(l) => `Edad: ${l}`} />
                  <ReferenceLine x={retirementAge} stroke="#F59E0B" strokeDasharray="5 5" />
                  <Area type="monotone" dataKey="balance" stroke="#10B981" fill="url(#retGrad)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Resumen detallado del Plan de Retiro */}
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-xl font-semibold mb-4">📋 Resumen de tu Plan de Retiro</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-emerald-400 mb-3">Fase de Acumulación</h3>
                  <div className="space-y-2 text-sm">
                    {[['Ahorro inicial:', formatCurrency(currentSavings)], ['Aportación mensual:', formatCurrency(monthlySavings)], ['Años de ahorro:', `${retirementAge - currentAge} años`], ['Total aportado:', formatCurrency(retirementProjection.totalContributed)], ['Rendimiento anual usado:', formatPercentPlain(fund.annualized), 'text-emerald-400']].map(([label, value, cls], idx) => (
                      <div key={idx} className="flex justify-between"><span className="text-slate-400">{label}</span><span className={cls || ''}>{value}</span></div>
                    ))}
                    <div className="flex justify-between border-t border-slate-600 pt-2 mt-2"><span className="text-slate-300 font-medium">Capital al retiro:</span><span className="text-emerald-400 font-bold">{formatCurrency(retirementProjection.balanceAtRetirement)}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-amber-400 mb-3">Fase de Retiro</h3>
                  <div className="space-y-2 text-sm">
                    {[['Edad de retiro:', `${retirementAge} años`], ['Retiro mensual deseado:', formatCurrency(monthlyRetirementExpense)], ['Años en retiro:', `${lifeExpectancy - retirementAge} años`], ['Retiro máximo sostenible:', `${formatCurrency(retirementProjection.maxMonthlyWithdrawal)}/mes`, 'text-amber-400'], ['Duración del capital:', retirementProjection.canSustain ? `Hasta los ${lifeExpectancy} años ✓` : `${retirementProjection.yearsUntilDepleted} años`, retirementProjection.canSustain ? 'text-emerald-400' : 'text-red-400']].map(([label, value, cls], idx) => (
                      <div key={idx} className="flex justify-between"><span className="text-slate-400">{label}</span><span className={cls || ''}>{value}</span></div>
                    ))}
                    <div className="flex justify-between border-t border-slate-600 pt-2 mt-2"><span className="text-slate-300 font-medium">Capital al final ({lifeExpectancy} años):</span><span className={`font-bold ${retirementProjection.canSustain ? 'text-emerald-400' : 'text-red-400'}`}>{formatCurrency(retirementProjection.finalBalance)}</span></div>
                  </div>
                </div>
              </div>
              {retirementProjection.canSustain ? (
                <div className="mt-6 p-4 bg-emerald-900/30 border border-emerald-700 rounded-lg">
                  <p className="text-emerald-400 font-medium">✓ Tu plan es viable</p>
                  <p className="text-slate-400 text-sm mt-2">Podrás retirarte a los {retirementAge} años con un gasto mensual de {formatCurrency(monthlyRetirementExpense)} y aún te quedarán {formatCurrency(retirementProjection.finalBalance)} a los {lifeExpectancy} años.</p>
                </div>
              ) : (
                <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
                  <p className="text-red-400 font-medium">⚠️ Tu plan actual no es sostenible</p>
                  <p className="text-slate-400 text-sm mt-2">Con un retiro de {formatCurrency(monthlyRetirementExpense)} mensuales, tu capital se agotaría a los {retirementAge + Math.floor(retirementProjection.yearsUntilDepleted)} años.</p>
                  <p className="text-slate-400 text-sm mt-1"><strong>Opciones:</strong> Aumenta tu ahorro mensual, reduce el gasto en retiro a {formatCurrency(retirementProjection.maxMonthlyWithdrawal)}, o retrasa tu edad de retiro.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ==================== GLOSARIO ==================== */}
        {activeTab === 'glossary' && (
          <>
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-center">📚 Glosario de Términos</h2>
              <p className="text-slate-400 text-center text-sm mb-6">Definiciones claras para entender mejor tu inversión</p>
              
              <div className="space-y-4">
                {/* Rendimientos */}
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">📈 Rendimientos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Rendimiento Acumulado</p>
                      <p className="text-slate-400 text-sm mt-1">Ganancia o pérdida total desde el inicio del portafolio. Si es 91%, significa que $100,000 invertidos se convirtieron en $191,000.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Rendimiento Anualizado</p>
                      <p className="text-slate-400 text-sm mt-1">Rendimiento promedio por año, considerando el interés compuesto. Permite comparar inversiones de diferentes periodos.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Últimos 3M / 6M / 12M</p>
                      <p className="text-slate-400 text-sm mt-1">Rendimiento acumulado en los últimos 3, 6 o 12 meses. Muestra el desempeño reciente del portafolio.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Benchmark</p>
                      <p className="text-slate-400 text-sm mt-1">Índice de referencia contra el cual se compara el portafolio (ej: IPC México, S&P 500). Sirve para evaluar si el gestor agrega valor.</p>
                    </div>
                  </div>
                </div>

                {/* Riesgo */}
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">⚠️ Métricas de Riesgo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Volatilidad (Desv. Estándar)</p>
                      <p className="text-slate-400 text-sm mt-1">Mide cuánto varían los rendimientos. Mayor volatilidad = más riesgo. Una volatilidad de 12% significa que los rendimientos suelen variar ±12% alrededor del promedio.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Max Drawdown</p>
                      <p className="text-slate-400 text-sm mt-1">La máxima caída desde un punto alto hasta un punto bajo. Un drawdown de -10% significa que en el peor momento, el portafolio cayó 10% desde su máximo.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Beta</p>
                      <p className="text-slate-400 text-sm mt-1">Sensibilidad al mercado. Beta = 1 significa que se mueve igual que el mercado. Beta = 0.6 significa que si el mercado sube 10%, el portafolio sube ~6%.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Correlación</p>
                      <p className="text-slate-400 text-sm mt-1">Qué tan relacionados están los movimientos del portafolio con el mercado. Va de -1 a 1. Cerca de 1 = se mueven juntos. Cerca de 0 = movimientos independientes.</p>
                    </div>
                  </div>
                </div>

                {/* Captura de Mercado */}
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">🎯 Captura de Mercado</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg border-l-4 border-emerald-500">
                      <p className="font-medium text-white">Captura en Alzas (Upside Capture)</p>
                      <p className="text-slate-400 text-sm mt-1">Qué porcentaje de las subidas del mercado captura el portafolio. <strong className="text-emerald-400">100% o más es excelente</strong> - significa que cuando el mercado sube, el portafolio sube igual o más.</p>
                      <p className="text-xs text-slate-500 mt-2">Ejemplo: Upside 82% → Cuando el mercado sube 10%, el portafolio sube ~8.2%</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg border-l-4 border-amber-500">
                      <p className="font-medium text-white">Captura en Bajas (Downside Capture)</p>
                      <p className="text-slate-400 text-sm mt-1">Qué porcentaje de las caídas del mercado sufre el portafolio. <strong className="text-amber-400">Menos de 70% es excelente</strong> - significa protección cuando el mercado cae.</p>
                      <p className="text-xs text-slate-500 mt-2">Ejemplo: Downside 60% → Cuando el mercado cae 10%, el portafolio solo cae ~6%</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-700 rounded-lg">
                    <p className="text-sm text-emerald-400 font-medium">💡 El portafolio ideal tiene:</p>
                    <p className="text-sm text-slate-400 mt-1">• Captura en Alzas ≥ 100% (captura todas las ganancias o más)</p>
                    <p className="text-sm text-slate-400">• Captura en Bajas ≤ 70% (protección en caídas)</p>
                  </div>
                </div>

                {/* Alpha y Rendimiento Ajustado */}
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-semibold text-amber-400 mb-3">🏆 Rendimiento Ajustado por Riesgo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Alpha</p>
                      <p className="text-slate-400 text-sm mt-1">Rendimiento extra generado por el gestor vs. el benchmark. <strong className="text-emerald-400">Alpha positivo = el gestor agrega valor.</strong> Alpha de 2.3% significa 2.3% de rendimiento adicional por año.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Sharpe Ratio</p>
                      <p className="text-slate-400 text-sm mt-1">Rendimiento obtenido por cada unidad de riesgo. <strong className="text-emerald-400">Mayor a 1 es excelente</strong>, 0.5-1 es bueno, menor a 0.5 es regular.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Win Rate</p>
                      <p className="text-slate-400 text-sm mt-1">Porcentaje de meses con rendimiento positivo. Un win rate de 60% significa que 6 de cada 10 meses el portafolio ganó dinero.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Track Record</p>
                      <p className="text-slate-400 text-sm mt-1">Historial de rendimientos del portafolio. Más meses = más confiable la estadística. Se recomienda mínimo 36 meses para conclusiones sólidas.</p>
                    </div>
                  </div>
                </div>

                {/* Simulador y Retiro */}
                <div>
                  <h3 className="text-lg font-semibold text-rose-400 mb-3">🧮 Simulador y Retiro</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Interés Compuesto</p>
                      <p className="text-slate-400 text-sm mt-1">Las ganancias generan más ganancias. Es el efecto "bola de nieve" que hace crecer exponencialmente tu inversión con el tiempo.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Aportaciones Mensuales</p>
                      <p className="text-slate-400 text-sm mt-1">Invertir una cantidad fija cada mes. Esta estrategia (DCA) reduce el riesgo de comprar todo en un mal momento.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Retiro Máximo Sostenible</p>
                      <p className="text-slate-400 text-sm mt-1">La cantidad máxima que puedes retirar mensualmente sin agotar tu capital antes de tu expectativa de vida.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Regla del 4%</p>
                      <p className="text-slate-400 text-sm mt-1">Regla general: puedes retirar ~4% anual de tu portafolio de retiro sin agotarlo en 30 años (asumiendo rendimientos históricos).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-xs">
          <p>⚠️ Los rendimientos pasados no garantizan rendimientos futuros. Esta simulación es solo ilustrativa.</p>
          <p className="mt-2">© 2025 LEMA Capital Asset Management</p>
        </div>
      </div>
    </div>
  );
}
