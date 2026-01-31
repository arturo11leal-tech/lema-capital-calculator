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
      { sector: "Financiero", weight: 31.38 },
      { sector: "Industrial", weight: 20.18 },
      { sector: "Salud", weight: 14.94 },
      { sector: "Consumo Básico", weight: 14.46 },
      { sector: "Materiales Básicos", weight: 13.00 },
      { sector: "Bienes Raíces", weight: 5.93 },
      { sector: "Efectivo", weight: 0.13 }
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
      { sector: "Industrial", weight: 46.58 },
      { sector: "Consumo Básico", weight: 16.74 },
      { sector: "Salud", weight: 16.04 },
      { sector: "Bienes Raíces", weight: 9.62 },
      { sector: "Materiales Básicos", weight: 8.67 },
      { sector: "Financiero", weight: 2.25 },
      { sector: "Efectivo", weight: 0.10 }
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
      { sector: "Tecnología", weight: 22.53 },
      { sector: "Financiero", weight: 15.64 },
      { sector: "Salud", weight: 14.26 },
      { sector: "Energía", weight: 12.36 },
      { sector: "Industrial", weight: 9.94 },
      { sector: "Metales Preciosos", weight: 8.78 },
      { sector: "Efectivo & Cripto", weight: 6.81 },
      { sector: "Coberturas", weight: 3.50 },
      { sector: "Consumo Discrecional", weight: 3.30 },
      { sector: "ETFs", weight: 2.90 }
    ]
  },
  "ALR Portfolio": {
    holdings: [
      { rank: 1, name: "Grupo Traxion SAB de CV", weight: 15.5 },
      { rank: 2, name: "Mexican Pesos (MXN)", weight: 11.1 },
      { rank: 3, name: "Berkshire Hathaway Inc", weight: 8.4 },
      { rank: 4, name: "UnitedHealth Group Inc", weight: 5.3 },
      { rank: 5, name: "Occidental Petroleum Corp", weight: 4.3 },
      { rank: 6, name: "Novo Nordisk AS", weight: 4.2 },
      { rank: 7, name: "JD.com Inc", weight: 3.3 },
      { rank: 8, name: "Fomento Economico Mexicano SAB de CV", weight: 3.1 },
      { rank: 9, name: "Generac Holdings Inc", weight: 3.0 },
      { rank: 10, name: "Oscar Health Inc", weight: 2.7 }
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

// Descripciones de compañías para tooltips
const companyDescriptions = {
  // LEMA Global Fund
  "Berkshire Hathaway Inc.": "Conglomerado multinacional fundado por Warren Buffett. Posee empresas de seguros, energía, manufactura y retail. Una de las empresas más valiosas del mundo.",
  "Medica Sur, SAB de CV": "Grupo hospitalario mexicano líder en servicios de salud privados. Opera hospitales de alta especialidad en México.",
  "Grupo Traxión, S.A.B. de C.V.": "Empresa mexicana líder en logística y transporte terrestre. Ofrece servicios de carga, paquetería y soluciones logísticas integrales.",
  "Grupo Bimbo, SAB de CV": "La panificadora más grande del mundo. Produce y distribuye pan, pastelitos y snacks en más de 30 países.",
  "Industrias Peñoles, S.A.B. de C.V.": "Grupo minero mexicano, segundo productor mundial de plata refinada. También produce oro, zinc y plomo.",
  "Grupo Financiero Banorte, SAB de CV": "Uno de los grupos financieros más grandes de México. Ofrece servicios bancarios, seguros y pensiones.",
  "Grupo Aeroportuario del Centro del Norte, SAB de CV": "OMA - Opera 13 aeropuertos internacionales en México incluyendo Monterrey, Acapulco, Mazatlán y Ciudad Juárez. También opera hoteles, estacionamientos y servicios de carga.",
  "Grupo Aeroportuario del Centro Norte, SAB de CV": "OMA - Opera 13 aeropuertos internacionales en México incluyendo Monterrey, Acapulco, Mazatlán y Ciudad Juárez. También opera hoteles, estacionamientos y servicios de carga.",
  "PrologisProperty Mexico SA de CV": "FIBRA especializada en propiedades industriales y logísticas en México. Líder en centros de distribución.",
  "Fomento Economico Mexicano, SAB de CV": "FEMSA - Conglomerado mexicano dueño de OXXO, embotellador de Coca-Cola más grande del mundo y participación en Heineken.",
  "Cemex, SAB de CV": "Empresa global de materiales de construcción. Uno de los mayores productores de cemento del mundo.",
  
  // HM Fund
  "Promotora y Operadora de Infraestructura, S.A.B. de C.V.": "PINFRA - Empresa mexicana de infraestructura. Opera autopistas de cuota, plantas de concreto y otros activos.",
  "Grupo Aeroportuario del Pacífico, SAB de CV": "GAP - Opera 12 aeropuertos internacionales en México (Guadalajara, Tijuana, Los Cabos) y 2 en Jamaica. También ofrece servicios comerciales, estacionamientos y salas VIP.",
  "Grupo Aeroportuario del Pacífico, S.A.B. de C.V.": "GAP - Opera 12 aeropuertos internacionales en México (Guadalajara, Tijuana, Los Cabos) y 2 en Jamaica. También ofrece servicios comerciales, estacionamientos y salas VIP.",
  "Fibra Mty, S.A.P.I. de C.V.": "FIBRA enfocada en propiedades industriales y de oficinas en el norte de México.",
  "Qualitas Controladora, SAB de CV": "Aseguradora mexicana líder en seguros de automóviles. La más grande de México en su segmento.",
  "Corp. Inmobiliaria Vesta, S.A.B. de C.V.": "Desarrollador y operador de parques industriales en México. Enfocado en nearshoring y manufactura.",
  "Gruma, SAB de CV": "Productor líder mundial de harina de maíz y tortillas. Dueño de la marca Mission.",
  "Arca Continental, SAB de CV": "Segundo embotellador de Coca-Cola más grande de América Latina. Opera en México, EE.UU. y Sudamérica.",
  
  // AL Composite
  "Cash USD": "Efectivo en dólares americanos mantenido para liquidez y oportunidades de inversión.",
  "Occidental Petroleum Corporation": "Empresa estadounidense de exploración y producción de petróleo y gas. Fuerte presencia en la Cuenca Permian.",
  "VanEck Pharmaceutical ETF": "ETF que invierte en empresas farmacéuticas globales. Exposición diversificada al sector salud.",
  "JD.com, Inc.": "Segunda plataforma de e-commerce más grande de China. Competidor directo de Alibaba con logística propia.",
  "Leverage Shares 2X Long UNH Daily ETF": "ETF apalancado que busca 2x el rendimiento diario de UnitedHealth Group.",
  "Fairfax Financial Holdings Ltd.": "Holding canadiense de seguros y reaseguros. Estilo de inversión tipo Berkshire Hathaway.",
  "Oscar Health, Inc.": "Compañía de seguros de salud enfocada en tecnología. Busca modernizar la experiencia de seguros médicos en EE.UU.",
  "Alphabet Inc.": "Empresa matriz de Google. Líder en búsqueda, publicidad digital, YouTube, Android y servicios en la nube.",
  "Enbridge Inc": "Empresa canadiense de infraestructura energética. Opera el sistema de oleoductos más grande de Norteamérica.",
  
  // ALR Portfolio
  "Grupo Traxion SAB de CV": "Empresa mexicana líder en logística y transporte terrestre. Ofrece servicios de carga, paquetería y soluciones logísticas integrales.",
  "Mexican Pesos (MXN)": "Efectivo en pesos mexicanos para liquidez y oportunidades de inversión local.",
  "Berkshire Hathaway Inc": "Conglomerado multinacional de Warren Buffett. Posee empresas de seguros, energía, manufactura y retail.",
  "UnitedHealth Group Inc": "La aseguradora de salud más grande de EE.UU. También opera Optum, empresa de servicios de salud y tecnología.",
  "Occidental Petroleum Corp": "Empresa estadounidense de exploración y producción de petróleo y gas. Fuerte presencia en la Cuenca Permian.",
  "Novo Nordisk AS": "Farmacéutica danesa líder mundial en tratamiento de diabetes. Fabricante de Ozempic y Wegovy.",
  "JD.com Inc": "Segunda plataforma de e-commerce más grande de China. Competidor directo de Alibaba con logística propia.",
  "Fomento Economico Mexicano SAB de CV": "FEMSA - Dueño de OXXO, embotellador de Coca-Cola más grande del mundo y participación en Heineken.",
  "Generac Holdings Inc": "Fabricante líder de generadores eléctricos y soluciones de almacenamiento de energía en EE.UU.",
  "Oscar Health Inc": "Compañía de seguros de salud enfocada en tecnología. Moderniza la experiencia de seguros médicos.",
  
  // Valores por defecto para holdings no listados
  "default": "Información de la compañía no disponible."
};

// Descripciones de métricas financieras para tooltips
const metricDescriptions = {
  // Rendimientos
  "Último Mes": "Rendimiento del portafolio en el mes más reciente. Muestra el desempeño a muy corto plazo.",
  "Últimos 3M": "Rendimiento acumulado de los últimos 3 meses. Útil para ver tendencias recientes.",
  "Últimos 6M": "Rendimiento acumulado del último semestre. Captura movimientos de mediano plazo.",
  "Últimos 12M": "Rendimiento de los últimos 12 meses (LTM). Estándar para comparar inversiones.",
  "LTM (Últimos 12 Meses)": "Last Twelve Months - Rendimiento acumulado del último año completo.",
  "Acumulado": "Ganancia o pérdida total desde el inicio del portafolio. Si es 91%, $100K se convirtieron en $191K.",
  "Rendimiento Acumulado": "Ganancia o pérdida total desde el inicio del portafolio.",
  "Anualizado": "Rendimiento promedio por año considerando interés compuesto. Permite comparar inversiones de diferentes periodos.",
  "Rendimiento Anualizado": "Rendimiento promedio anual. Es la métrica estándar para comparar inversiones.",
  "YTD (Año a la Fecha)": "Year-To-Date: Rendimiento desde el 1 de enero del año actual hasta hoy.",
  
  // Riesgo
  "Volatilidad (Anual)": "Qué tanto varían los rendimientos. Mayor volatilidad = mayor riesgo pero también mayor potencial de ganancia.",
  "Volatilidad": "Desviación estándar anualizada. Mide cuánto fluctúa el valor del portafolio.",
  "Max Drawdown": "La caída máxima desde un punto alto hasta un punto bajo. Indica el peor escenario histórico que ha enfrentado el portafolio.",
  "Sharpe Ratio": "Rendimiento obtenido por cada unidad de riesgo tomado. Menor a 0.5 es bajo, >1 es bueno, >2 es excelente.",
  "Beta": "Sensibilidad al mercado. Beta=1 se mueve igual que el mercado. Beta<1 es menos volátil que el mercado.",
  "Correlación": "Qué tan relacionados están los movimientos del portafolio con el benchmark. 1=perfectamente correlacionado, 0=sin relación.",
  
  // Alpha y consistencia
  "Alpha": "Rendimiento extra generado sobre el benchmark. Alpha positivo significa que el gestor agrega valor vs invertir pasivamente.",
  "Mejor Mes": "El mes con mayor rendimiento en toda la historia del portafolio.",
  "Peor Mes": "El mes con peor rendimiento. Muestra el riesgo de pérdida en un mal momento del mercado.",
  "Meses Positivos": "Cantidad de meses con rendimiento positivo vs el total de meses de operación.",
  "Win Rate": "Porcentaje de meses con rendimiento positivo. >50% es deseable, >60% es bueno, >70% es excelente.",
  "# Posiciones": "Número de inversiones diferentes en el portafolio. Más posiciones generalmente significa mayor diversificación.",
  
  // Capture ratios
  "Captura en Alzas (Upside)": "Qué porcentaje de las subidas del mercado captura el portafolio. >100% significa que sube más que el mercado cuando hay alzas.",
  "Captura en Bajas (Downside)": "Qué porcentaje de las caídas del mercado sufre el portafolio. <100% significa mejor protección. Valor negativo = el portafolio sube cuando el mercado baja.",
  "Upside Capture": "Captura en alzas: cuánto participa el portafolio cuando el mercado sube.",
  "Downside Capture": "Captura en bajas: cuánto cae el portafolio cuando el mercado baja. Menor es mejor.",
  
  // Tabla de rentabilidad
  "Diferencia": "La ventaja o desventaja del portafolio vs el benchmark. Verde = supera al mercado, Rojo = por debajo del mercado.",
};

// Estadísticas calculadas de los datos reales (Actualizado Enero 2026)
const fundsStats = {
  "LEMA Global Fund": {
    benchmark: "IPC México",
    color: "#1F4E79",
    description: "Estrategia global diversificada",
    descriptionEn: "Globally diversified strategy",
    n_months: 63,
    last_month: 0.0244,
    last_3m: 0.0886,
    last_6m: 0.1016,
    last_12m: 0.1476,
    ytd: 0.1793,
    cumulative: 0.9132,
    annualized: 0.1315,
    std_annual: 0.1290,
    std_bench_annual: 0.1640,
    alpha: 0.0585,
    sharpe: 0.71,
    beta: 0.65,
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
    descriptionEn: "Value strategy Mexico & Latam",
    n_months: 54,
    last_month: 0.0227,
    last_3m: 0.0847,
    last_6m: 0.1183,
    last_12m: 0.2746,
    ytd: 0.2918,
    cumulative: 0.7610,
    annualized: 0.1340,
    std_annual: 0.1288,
    std_bench_annual: 0.1605,
    alpha: 0.0934,
    sharpe: 0.73,
    beta: 0.67,
    correlation: 0.83,
    max_drawdown: -0.0879,
    best_month: 0.1050,
    worst_month: -0.0603,
    positive_months: 30,
    negative_months: 24,
    win_rate: 0.556,
    upside_capture: 0.9080,
    downside_capture: 0.5014,
    n_holdings: 14,
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
    descriptionEn: "High returns in developed markets",
    n_months: 29,
    last_month: -0.0215,
    last_3m: 0.0351,
    last_6m: 0.1797,
    last_12m: 0.4498,
    ytd: 0.4498,
    cumulative: 0.8001,
    annualized: 0.2754,
    std_annual: 0.1312,
    std_bench_annual: 0.1218,
    alpha: 0.1350,
    sharpe: 1.79,
    beta: 0.67,
    correlation: 0.63,
    max_drawdown: -0.0870,
    best_month: 0.0890,
    worst_month: -0.0497,
    positive_months: 19,
    negative_months: 10,
    win_rate: 0.655,
    upside_capture: 1.0144,
    downside_capture: 0.3978,
    n_holdings: 33,
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
    benchmark2: "Mexico IPC",
    color: "#7030A0",
    description: "Estrategia conservadora de baja volatilidad",
    descriptionEn: "Conservative low volatility strategy",
    n_months: 15,
    last_month: -0.0074,
    last_3m: 0.0254,
    last_6m: 0.0400,
    last_12m: 0.0807,
    cumulative: 0.0942,
    annualized: 0.0747,
    ytd: 0.0755,
    std_annual: 0.0260,
    std_bench_annual: 0.1020,
    alpha: 0.0535,
    sharpe: 1.35,
    beta: 0.12,
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
    // Benchmark returns for comparison
    bench_annualized: 0.0768,
    bench_cumulative: 0.0969,
    bench_last_month: 0.0054,
    bench_last_3m: 0.0214,
    bench_last_12m: 0.0819,
    bench_ytd: 0.0742,
    // IPC Mexico for second comparison
    ipc_annualized: 0.1766,
    ipc_cumulative: 0.2254,
    ipc_last_month: 0.0112,
    ipc_last_3m: 0.0955,
    ipc_last_12m: 0.2910,
    ipc_ytd: 0.2988,
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

// Traducciones
const translations = {
  es: {
    // Header
    title: "LEMA CAPITAL",
    subtitle: "Gestión de Activos",
    
    // Tabs
    riskProfile: "🎯 Perfil de Riesgo",
    portfolio: "📊 Portafolio",
    simulator: "💹 Simulador",
    retirement: "🏖️ Retiro",
    glossary: "📚 Glosario",
    
    // Sectores
    sectors: {
      "Financiero": "Financiero",
      "Industrial": "Industrial",
      "Salud": "Salud",
      "Consumo Básico": "Consumo Básico",
      "Materiales Básicos": "Materiales Básicos",
      "Bienes Raíces": "Bienes Raíces",
      "Efectivo": "Efectivo",
      "Tecnología": "Tecnología",
      "Energía": "Energía",
      "Metales Preciosos": "Metales Preciosos",
      "Efectivo & Cripto": "Efectivo & Cripto",
      "Coberturas": "Coberturas",
      "Consumo Discrecional": "Consumo Discrecional",
      "ETFs": "ETFs",
      "Efectivo & Equivalentes": "Efectivo & Equivalentes",
      "Consumo Defensivo": "Consumo Defensivo",
      "FIBRA/Bienes Raíces": "FIBRA/Bienes Raíces",
      "Activos Digitales": "Activos Digitales",
      "Servicios Públicos": "Servicios Públicos",
      "Cobertura": "Cobertura"
    },
    
    // Portfolio section
    returns: "Rendimientos",
    hoverTip: "💡 Pasa el mouse sobre cualquier métrica para ver su explicación",
    lastMonth: "Último Mes",
    last3m: "Últimos 3M",
    last6m: "Últimos 6M",
    last12m: "Últimos 12M",
    cumulative: "Acumulado",
    annualized: "Anualizado",
    riskMetrics: "📊 Métricas de Riesgo",
    volatilityAnnual: "Volatilidad (Anual)",
    maxDrawdown: "Max Drawdown",
    sharpeRatio: "Sharpe Ratio",
    beta: "Beta",
    correlation: "Correlación",
    alphaConsistency: "🎯 Alpha y Consistencia",
    alpha: "Alpha",
    bestMonth: "Mejor Mes",
    worstMonth: "Peor Mes",
    positiveMonths: "Meses Positivos",
    winRate: "Win Rate",
    positions: "# Posiciones",
    marketCapture: "📈 Captura de Mercado",
    upsideCapture: "Captura en Alzas (Upside)",
    downsideCapture: "Captura en Bajas (Downside)",
    whenUp: "Cuando {benchmark} sube, capturamos {value} del alza",
    whenDown: "Cuando {benchmark} baja, solo caemos {value}",
    whenDownInverse: "Cuando {benchmark} baja, ¡el portafolio tiende a subir!",
    interpretation: "Interpretación",
    topPositions: "🏆 Top {n} Posiciones",
    positionHoverTip: "💡 Pasa el mouse sobre una posición para ver más información",
    sectorDistribution: "📊 Distribución por Sector",
    sectorsByWeight: "📈 Sectores por Peso",
    
    // Simulator
    configureSimulation: "Configura tu Simulación",
    initialInvestment: "Inversión Inicial",
    monthlyContribution: "Aportación Mensual",
    simulationResults: "Resultado de la Simulación",
    withFund: "Con {fund}",
    withBenchmark: "Con {benchmark}",
    difference: "Diferencia",
    inYourFavor: "a tu favor",
    historicalGrowth: "📈 Crecimiento Histórico",
    periodReturns: "📊 Rentabilidad por Periodo",
    period: "Periodo",
    fund: "Fondo",
    benchmark: "Benchmark",
    diff: "Diferencia",
    
    // Retirement
    retirementAnalysis: "🏖️ Análisis de Retiro",
    yearsUntilRetirement: "años hasta el retiro",
    currentAge: "Edad Actual",
    retirementAge: "Edad de Retiro",
    currentSavings: "Ahorro Actual",
    monthlySavings: "Ahorro Mensual",
    monthlyExpense: "Gasto Mensual en Retiro",
    lifeExpectancy: "Expectativa de Vida",
    projectedCapital: "Capital Proyectado al Retiro",
    yearsInRetirement: "años de retiro",
    maxSustainableWithdrawal: "Retiro Máximo Sostenible",
    monthly: "mensuales",
    requiredMonthlySavings: "Ahorro Mensual Necesario",
    toReach: "Para alcanzar",
    atRetirement: "al retiro",
    retirementProjection: "📈 Proyección de Retiro",
    
    // Risk Profile
    discoverProfile: "Descubre tu Perfil de Inversionista",
    discoverProfileDesc: "Responde algunas preguntas para que podamos recomendarte la estrategia de inversión más adecuada para ti.",
    estimatedTime: "⏱️ Tiempo estimado: 3-5 minutos",
    startEvaluation: "Comenzar Evaluación",
    yourGoal: "1. Tu Objetivo",
    riskProfileStep: "2. Perfil de Riesgo",
    recommendation: "3. Recomendación",
    investmentGoal: "¿Cuál es tu objetivo principal de inversión?",
    selectGoalDesc: "Selecciona el objetivo que mejor describe tus metas financieras.",
    saveForRetirement: "Ahorrar para el retiro",
    saveForRetirementDesc: "Planeo dejar crecer este dinero hasta mi jubilación.",
    majorExpense: "Gasto importante próximo",
    majorExpenseDesc: "Planeo usar este dinero para un gasto mayor (educación, salud, etc.)",
    somethingSpecial: "Algo especial en el futuro",
    somethingSpecialDesc: "Tengo un gasto grande planeado como casa, auto o boda.",
    emergencyFund: "Fondo de emergencia",
    emergencyFundDesc: "Este dinero es una red de seguridad para imprevistos.",
    buildWealth: "Crecer mi patrimonio",
    buildWealthDesc: "No tengo un plan específico, solo quiero invertir y crecer mi dinero.",
    generateIncome: "Generar ingresos",
    generateIncomeDesc: "Planeo retirar dinero de esta cuenta regularmente.",
    howMuchInvest: "¿Cuánto te gustaría invertir inicialmente?",
    howMuchInvestDesc: "El monto de inversión nos ayuda a construir un portafolio adecuado a tus objetivos.",
    yearsToWithdraw: "¿En cuántos años necesitarás retirar este dinero?",
    yearsToWithdrawDesc: "Tu horizonte de tiempo afecta cuánto riesgo puede manejar tu portafolio.",
    yearsUntilWithdraw: "Años hasta retirar fondos",
    monthlyContributionQ: "¿Cuánto deseas aportar mensualmente?",
    monthlyContributionQDesc: "Las aportaciones regulares ayudan a hacer crecer tu inversión. (Opcional)",
    knowledgeLevel: "¿Cuál es tu conocimiento sobre acciones, bonos y ETFs?",
    knowledgeLevelDesc: "Esto nos ayuda a personalizar las recomendaciones.",
    none: "Ninguno",
    noneDesc: "No tengo experiencia en inversiones",
    some: "Algo",
    someDesc: "Conozco los conceptos básicos",
    good: "Bueno",
    goodDesc: "Tengo experiencia invirtiendo",
    extensive: "Extenso",
    extensiveDesc: "Soy un inversionista experimentado",
    riskPerception: "Cuando escuchas \"riesgo\" relacionado con tus finanzas, ¿qué es lo primero que piensas?",
    riskPerceptionDesc: "No hay respuesta correcta o incorrecta.",
    worry: "Me preocupa quedarme sin nada",
    understand: "Entiendo que es parte inherente del proceso de inversión",
    opportunity: "Veo oportunidad de grandes rendimientos",
    thrill: "Pienso en la emoción de invertir",
    experiencedLoss: "¿Has experimentado una caída del 20% o más en el valor de tus inversiones en un año?",
    experiencedLossDesc: "Tu experiencia pasada nos ayuda a entender tu tolerancia al riesgo.",
    yes: "Sí",
    no: "No",
    lossReaction: "¿Qué hiciste cuando experimentaste esa caída del 20%?",
    lossReactionDesc: "Tu reacción pasada predice tu comportamiento futuro.",
    soldAll: "Vendí todo",
    soldSome: "Vendí algo",
    didNothing: "No hice nada",
    rebalanced: "Rebalanceé mis inversiones",
    boughtMore: "Compré más",
    volatilityTolerance: "¿Con cuánta fluctuación te sentirías cómodo en 1 año?",
    volatilityToleranceDesc: "Asumiendo una inversión de $100,000",
    potentialLoss: "Pérdida potencial",
    potentialGain: "Ganancia potencial",
    decisionApproach: "¿Cómo describirías tu enfoque al tomar decisiones financieras importantes?",
    decisionApproachDesc: "Última pregunta antes de ver tu resultado.",
    avoidDecisions: "Trato de evitar tomar decisiones",
    reluctant: "Las tomo con reluctancia",
    confident: "Las tomo con confianza y no miro atrás",
    yourInvestorProfile: "Tu Perfil de Inversionista",
    veryConservative: "Muy Conservador",
    conservative: "Conservador",
    moderate: "Moderado",
    growth: "Crecimiento",
    aggressive: "Agresivo",
    recommendedAllocation: "📊 Asignación de Activos Recomendada",
    stocks: "Renta Variable",
    bonds: "Renta Fija",
    realEstate: "Bienes Raíces",
    metals: "Metales",
    cash: "Efectivo",
    profileSummary: "📋 Resumen de tu perfil",
    goal: "Objetivo",
    horizon: "Horizonte",
    years: "años",
    riskTolerance: "Tolerancia al riesgo",
    veryLow: "Muy Baja",
    low: "Baja",
    high: "Alta",
    veryHigh: "Muy Alta",
    startOver: "🔄 Volver a Empezar",
    goToSimulator: "📊 Ir al Simulador",
    back: "Atrás",
    continue: "Continuar",
    
    // Glossary
    glossaryTitle: "📚 Glosario de Términos Financieros",
    glossaryDesc: "Definiciones de las métricas utilizadas en el análisis de portafolios",
    
    // Common
    of: "de",
    monthsTrackRecord: "meses de track record"
  },
  en: {
    // Header
    title: "LEMA CAPITAL",
    subtitle: "Asset Management",
    
    // Tabs
    riskProfile: "🎯 Risk Profile",
    portfolio: "📊 Portfolio",
    simulator: "💹 Simulator",
    retirement: "🏖️ Retirement",
    glossary: "📚 Glossary",
    
    // Sectores
    sectors: {
      "Financiero": "Financials",
      "Industrial": "Industrials",
      "Salud": "Health Care",
      "Consumo Básico": "Consumer Staples",
      "Materiales Básicos": "Basic Materials",
      "Bienes Raíces": "Real Estate",
      "Efectivo": "Cash",
      "Tecnología": "Technology",
      "Energía": "Energy",
      "Metales Preciosos": "Precious Metals",
      "Efectivo & Cripto": "Cash & Crypto",
      "Coberturas": "Hedges",
      "Consumo Discrecional": "Consumer Discretionary",
      "ETFs": "ETFs",
      "Efectivo & Equivalentes": "Cash & Equivalents",
      "Consumo Defensivo": "Consumer Defensive",
      "FIBRA/Bienes Raíces": "REITs/Real Estate",
      "Activos Digitales": "Digital Assets",
      "Servicios Públicos": "Utilities",
      "Cobertura": "Hedge"
    },
    
    // Portfolio section
    returns: "Returns",
    hoverTip: "💡 Hover over any metric to see its explanation",
    lastMonth: "Last Month",
    last3m: "Last 3M",
    last6m: "Last 6M",
    last12m: "Last 12M",
    cumulative: "Cumulative",
    annualized: "Annualized",
    riskMetrics: "📊 Risk Metrics",
    volatilityAnnual: "Volatility (Annual)",
    maxDrawdown: "Max Drawdown",
    sharpeRatio: "Sharpe Ratio",
    beta: "Beta",
    correlation: "Correlation",
    alphaConsistency: "🎯 Alpha & Consistency",
    alpha: "Alpha",
    bestMonth: "Best Month",
    worstMonth: "Worst Month",
    positiveMonths: "Positive Months",
    winRate: "Win Rate",
    positions: "# Holdings",
    marketCapture: "📈 Market Capture",
    upsideCapture: "Upside Capture",
    downsideCapture: "Downside Capture",
    whenUp: "When {benchmark} rises, we capture {value} of the gain",
    whenDown: "When {benchmark} falls, we only drop {value}",
    whenDownInverse: "When {benchmark} falls, the portfolio tends to rise!",
    interpretation: "Interpretation",
    topPositions: "🏆 Top {n} Holdings",
    positionHoverTip: "💡 Hover over a position to see more information",
    sectorDistribution: "📊 Sector Distribution",
    sectorsByWeight: "📈 Sectors by Weight",
    
    // Simulator
    configureSimulation: "Configure Your Simulation",
    initialInvestment: "Initial Investment",
    monthlyContribution: "Monthly Contribution",
    simulationResults: "Simulation Results",
    withFund: "With {fund}",
    withBenchmark: "With {benchmark}",
    difference: "Difference",
    inYourFavor: "in your favor",
    historicalGrowth: "📈 Historical Growth",
    periodReturns: "📊 Returns by Period",
    period: "Period",
    fund: "Fund",
    benchmark: "Benchmark",
    diff: "Difference",
    
    // Retirement
    retirementAnalysis: "🏖️ Retirement Analysis",
    yearsUntilRetirement: "years until retirement",
    currentAge: "Current Age",
    retirementAge: "Retirement Age",
    currentSavings: "Current Savings",
    monthlySavings: "Monthly Savings",
    monthlyExpense: "Monthly Expense in Retirement",
    lifeExpectancy: "Life Expectancy",
    projectedCapital: "Projected Capital at Retirement",
    yearsInRetirement: "years in retirement",
    maxSustainableWithdrawal: "Max Sustainable Withdrawal",
    monthly: "monthly",
    requiredMonthlySavings: "Required Monthly Savings",
    toReach: "To reach",
    atRetirement: "at retirement",
    retirementProjection: "📈 Retirement Projection",
    
    // Risk Profile
    discoverProfile: "Discover Your Investor Profile",
    discoverProfileDesc: "Answer a few questions so we can recommend the most suitable investment strategy for you.",
    estimatedTime: "⏱️ Estimated time: 3-5 minutes",
    startEvaluation: "Start Evaluation",
    yourGoal: "1. Your Goal",
    riskProfileStep: "2. Risk Profile",
    recommendation: "3. Recommendation",
    investmentGoal: "What is your main investment goal?",
    selectGoalDesc: "Select the goal that best describes your financial objectives.",
    saveForRetirement: "Save for retirement",
    saveForRetirementDesc: "I plan to let this money grow until retirement.",
    majorExpense: "Upcoming major expense",
    majorExpenseDesc: "I plan to use this money for a major expense (education, health, etc.)",
    somethingSpecial: "Something special in the future",
    somethingSpecialDesc: "I have a large expense planned like a house, car, or wedding.",
    emergencyFund: "Emergency fund",
    emergencyFundDesc: "This money is a safety net for emergencies.",
    buildWealth: "Build long-term wealth",
    buildWealthDesc: "I don't have a specific plan, I just want to invest and grow my money.",
    generateIncome: "Generate income",
    generateIncomeDesc: "I plan to withdraw money from this account regularly.",
    howMuchInvest: "How much would you like to invest initially?",
    howMuchInvestDesc: "The investment amount helps us build a portfolio suited to your goals.",
    yearsToWithdraw: "In how many years will you need to withdraw this money?",
    yearsToWithdrawDesc: "Your time horizon affects how much risk your portfolio can handle.",
    yearsUntilWithdraw: "Years until withdrawal",
    monthlyContributionQ: "How much do you want to contribute monthly?",
    monthlyContributionQDesc: "Regular contributions help grow your investment. (Optional)",
    knowledgeLevel: "What is your understanding of stocks, bonds, and ETFs?",
    knowledgeLevelDesc: "This helps us personalize recommendations.",
    none: "None",
    noneDesc: "I have no investment experience",
    some: "Some",
    someDesc: "I know the basics",
    good: "Good",
    goodDesc: "I have investment experience",
    extensive: "Extensive",
    extensiveDesc: "I am an experienced investor",
    riskPerception: "When you hear \"risk\" related to your finances, what's the first thing that comes to mind?",
    riskPerceptionDesc: "There is no right or wrong answer.",
    worry: "I worry I could be left with nothing",
    understand: "I understand it's an inherent part of investing",
    opportunity: "I see opportunity for great returns",
    thrill: "I think of the thrill of investing",
    experiencedLoss: "Have you experienced a 20% or more decline in your investments in one year?",
    experiencedLossDesc: "Your past experience helps us understand your risk tolerance.",
    yes: "Yes",
    no: "No",
    lossReaction: "What did you do when you experienced that 20% decline?",
    lossReactionDesc: "Your past reaction predicts your future behavior.",
    soldAll: "Sold everything",
    soldSome: "Sold some",
    didNothing: "Did nothing",
    rebalanced: "Rebalanced investments",
    boughtMore: "Bought more",
    volatilityTolerance: "How much investment fluctuation would you be comfortable with in 1 year?",
    volatilityToleranceDesc: "Assuming a $100,000 investment",
    potentialLoss: "Potential loss",
    potentialGain: "Potential gain",
    decisionApproach: "How would you describe your approach to making important financial decisions?",
    decisionApproachDesc: "Last question before seeing your result.",
    avoidDecisions: "I try to avoid making decisions",
    reluctant: "I reluctantly make decisions",
    confident: "I confidently make decisions and don't look back",
    yourInvestorProfile: "Your Investor Profile",
    veryConservative: "Very Conservative",
    conservative: "Conservative",
    moderate: "Moderate",
    growth: "Growth",
    aggressive: "Aggressive",
    recommendedAllocation: "📊 Recommended Asset Allocation",
    stocks: "Stocks",
    bonds: "Bonds",
    realEstate: "Real Estate",
    metals: "Metals",
    cash: "Cash",
    profileSummary: "📋 Profile Summary",
    goal: "Goal",
    horizon: "Horizon",
    years: "years",
    riskTolerance: "Risk tolerance",
    veryLow: "Very Low",
    low: "Low",
    high: "High",
    veryHigh: "Very High",
    startOver: "🔄 Start Over",
    goToSimulator: "📊 Go to Simulator",
    back: "Back",
    continue: "Continue",
    
    // Glossary
    glossaryTitle: "📚 Financial Terms Glossary",
    glossaryDesc: "Definitions of metrics used in portfolio analysis",
    
    // Common
    of: "of",
    monthsTrackRecord: "months track record"
  }
};

export default function App() {
  const [selectedFund, setSelectedFund] = useState('LEMA Global Fund');
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [activeTab, setActiveTab] = useState('simulator');
  const [language, setLanguage] = useState('es'); // Estado para idioma
  
  // Estados para Análisis de Retiro
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySavings, setMonthlySavings] = useState(10000);
  const [monthlyRetirementExpense, setMonthlyRetirementExpense] = useState(30000);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);

  // Estados para Cuestionario de Perfil de Riesgo
  const [riskStep, setRiskStep] = useState(0);
  const [riskAnswers, setRiskAnswers] = useState({
    goal: null,
    initialInvestmentRisk: '',
    timeHorizon: '',
    monthlyContributionRisk: '',
    knowledgeLevel: null,
    riskPerception: null,
    experiencedLoss: null,
    lossReaction: null,
    volatilityTolerance: null,
    decisionApproach: null
  });
  const [riskProfile, setRiskProfile] = useState(null);

  // Traducciones activas
  const t = translations[language];

  const fund = fundsStats[selectedFund];
  const composition = portfolioComposition[selectedFund];

  // Función para traducir meses
  const translateMonth = (monthStr) => {
    if (language === 'en') return monthStr;
    const monthMap = {
      'Jan': 'Ene', 'Feb': 'Feb', 'Mar': 'Mar', 'Apr': 'Abr', 'May': 'May', 'Jun': 'Jun',
      'Jul': 'Jul', 'Aug': 'Ago', 'Sep': 'Sep', 'Oct': 'Oct', 'Nov': 'Nov', 'Dec': 'Dic',
      'Inicio': 'Inicio'
    };
    for (const [en, es] of Object.entries(monthMap)) {
      if (monthStr.includes(en)) return monthStr.replace(en, es);
    }
    return monthStr;
  };

  // Simulación histórica
  const simulationData = useMemo(() => {
    const returns = fund.returns;
    let fundValue = initialInvestment;
    let benchmarkValue = initialInvestment;
    let totalContributed = initialInvestment;
    
    const data = [{ month: language === 'es' ? 'Inicio' : 'Start', fundValue: initialInvestment, benchmarkValue: initialInvestment, totalContributed: initialInvestment }];

    returns.forEach((r) => {
      fundValue = fundValue * (1 + r.fund) + monthlyContribution;
      benchmarkValue = benchmarkValue * (1 + r.benchmark) + monthlyContribution;
      totalContributed += monthlyContribution;
      data.push({ month: translateMonth(r.month), fundValue: Math.round(fundValue), benchmarkValue: Math.round(benchmarkValue), totalContributed, difference: Math.round(fundValue - benchmarkValue) });
    });

    return data;
  }, [selectedFund, initialInvestment, monthlyContribution, language]);

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
    
    // Calcular el ahorro mensual necesario para alcanzar el objetivo de retiro deseado
    // Necesitamos encontrar el capital necesario para sostener monthlyRetirementExpense durante yearsInRetirement
    let requiredBalanceAtRetirement;
    if (monthlyReturn > 0 && monthsInRetirement > 0) {
      const pvFactor = (1 - Math.pow(1 + monthlyReturn, -monthsInRetirement)) / monthlyReturn;
      requiredBalanceAtRetirement = monthlyRetirementExpense * pvFactor;
    } else {
      requiredBalanceAtRetirement = monthlyRetirementExpense * monthsInRetirement;
    }
    
    // Calcular cuánto se necesita ahorrar mensualmente para llegar a ese capital
    // Fórmula de valor futuro de anualidad: FV = PMT * [((1+r)^n - 1) / r] + PV * (1+r)^n
    // Despejamos PMT: PMT = (FV - PV * (1+r)^n) / [((1+r)^n - 1) / r]
    let requiredMonthlySavings;
    if (monthlyReturn > 0 && monthsToRetirement > 0) {
      const fvFactor = (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn;
      const pvGrowth = currentSavings * Math.pow(1 + monthlyReturn, monthsToRetirement);
      requiredMonthlySavings = (requiredBalanceAtRetirement - pvGrowth) / fvFactor;
    } else {
      requiredMonthlySavings = (requiredBalanceAtRetirement - currentSavings) / monthsToRetirement;
    }
    requiredMonthlySavings = Math.max(0, requiredMonthlySavings); // No puede ser negativo
    
    return { accumulationData, withdrawalData, balanceAtRetirement: Math.round(balanceAtRetirement), finalBalance: Math.round(finalBalance), canSustain, yearsUntilDepleted: canSustain ? yearsInRetirement : Math.round(yearsUntilDepleted * 10) / 10, maxMonthlyWithdrawal: Math.round(maxMonthlyWithdrawal), totalContributed: currentSavings + (monthlySavings * monthsToRetirement), annualReturn, requiredMonthlySavings: Math.round(requiredMonthlySavings), requiredBalanceAtRetirement: Math.round(requiredBalanceAtRetirement) };
  }, [selectedFund, currentAge, retirementAge, currentSavings, monthlySavings, monthlyRetirementExpense, lifeExpectancy, fund.annualized]);

  const lastData = simulationData[simulationData.length - 1];
  const difference = lastData.fundValue - lastData.benchmarkValue;
  const percentGainFund = (lastData.fundValue / lastData.totalContributed - 1);
  const fullRetirementData = [...retirementProjection.accumulationData, ...retirementProjection.withdrawalData.slice(1)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="py-6 px-4 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo y Título */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <span className="text-xl md:text-2xl font-bold text-white">L</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">LEMA Capital</h1>
                <p className="text-slate-400 text-xs md:text-sm">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="flex justify-center gap-2">
              <button 
                onClick={() => setLanguage('es')} 
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${language === 'es' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'}`}
              >
                🇲🇽 ES
              </button>
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${language === 'en' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'}`}
              >
                🇺🇸 EN
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <button onClick={() => setActiveTab('risk-profile')} className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'risk-profile' ? 'bg-teal-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{t.riskProfile}</button>
          <button onClick={() => setActiveTab('portfolio')} className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'portfolio' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{t.portfolio}</button>
          <button onClick={() => setActiveTab('simulator')} className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'simulator' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{t.simulator}</button>
          <button onClick={() => setActiveTab('retirement')} className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'retirement' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{t.retirement}</button>
          <button onClick={() => setActiveTab('glossary')} className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeTab === 'glossary' ? 'bg-rose-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{t.glossary}</button>
        </div>

        {/* Fund Selector */}
        <div className="flex justify-center gap-1 md:gap-2 mb-4 flex-wrap px-2">
          {Object.keys(fundsStats).map((fundName) => (
            <button key={fundName} onClick={() => setSelectedFund(fundName)} className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg font-medium transition-all text-[10px] md:text-sm whitespace-nowrap ${selectedFund === fundName ? 'text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`} style={selectedFund === fundName ? { backgroundColor: fundsStats[fundName].color } : {}}>
              {fundName}
            </button>
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-slate-400 text-sm">{language === 'es' ? fund.description : fund.descriptionEn} • {fund.n_months} {t.monthsTrackRecord}</p>
        </div>

        {/* ==================== PERFIL DE RIESGO ==================== */}
        {activeTab === 'risk-profile' && (
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span className={riskStep >= 1 ? 'text-teal-400 font-medium' : ''}>1. Tu Objetivo</span>
                <span className={riskStep >= 5 ? 'text-teal-400 font-medium' : ''}>{language === 'es' ? '2. Perfil de Riesgo' : '2. Risk Profile'}</span>
                <span className={riskStep >= 11 ? 'text-teal-400 font-medium' : ''}>{language === 'es' ? '3. Recomendación' : '3. Recommendation'}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500" style={{ width: `${Math.min((riskStep / 11) * 100, 100)}%` }}></div>
              </div>
            </div>

            {/* Step 0: Inicio */}
            {riskStep === 0 && (
              <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm border border-slate-700 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold mb-4">{language === 'es' ? 'Descubre tu Perfil de Inversionista' : 'Discover Your Investor Profile'}</h2>
                <p className="text-slate-400 mb-6">{language === 'es' ? 'Responde algunas preguntas para que podamos recomendarte la estrategia de inversión más adecuada para ti.' : 'Answer a few questions so we can recommend the most suitable investment strategy for you.'}</p>
                <p className="text-sm text-slate-500 mb-8">{language === 'es' ? '⏱️ Tiempo estimado: 3-5 minutos' : '⏱️ Estimated time: 3-5 minutes'}</p>
                <button onClick={() => setRiskStep(1)} className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg font-medium hover:from-teal-600 hover:to-emerald-600 transition-all">
                  {language === 'es' ? 'Comenzar Evaluación' : 'Start Evaluation'}
                </button>
              </div>
            )}

            {/* Step 1: Objetivo de inversión */}
            {riskStep === 1 && (
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-2">{language === 'es' ? '¿Cuál es tu objetivo principal de inversión?' : 'What is your main investment goal?'}</h2>
                <p className="text-slate-400 text-sm mb-6">{language === 'es' ? 'Selecciona el objetivo que mejor describe tus metas financieras.' : 'Select the goal that best describes your financial objectives.'}</p>
                <div className="space-y-3">
                  {(language === 'es' ? [
                    { id: 'retirement', icon: '🏖️', title: 'Ahorrar para el retiro', desc: 'Planeo dejar crecer este dinero hasta mi jubilación.' },
                    { id: 'major-expense', icon: '🎓', title: 'Gasto importante próximo', desc: 'Planeo usar este dinero para un gasto mayor (educación, salud, etc.)' },
                    { id: 'special', icon: '🏠', title: 'Algo especial en el futuro', desc: 'Tengo un gasto grande planeado como casa, auto o boda.' },
                    { id: 'emergency', icon: '☔', title: 'Fondo de emergencia', desc: 'Este dinero es una red de seguridad para imprevistos.' },
                    { id: 'wealth', icon: '📈', title: 'Crecer mi patrimonio', desc: 'No tengo un plan específico, solo quiero invertir y crecer mi dinero.' },
                    { id: 'income', icon: '💰', title: 'Generar ingresos', desc: 'Planeo retirar dinero de esta cuenta regularmente.' }
                  ] : [
                    { id: 'retirement', icon: '🏖️', title: 'Save for retirement', desc: 'I plan to let this money grow until retirement.' },
                    { id: 'major-expense', icon: '🎓', title: 'Upcoming major expense', desc: 'I plan to use this money for a major expense (education, health, etc.)' },
                    { id: 'special', icon: '🏠', title: 'Something special in the future', desc: 'I have a large expense planned like a house, car, or wedding.' },
                    { id: 'emergency', icon: '☔', title: 'Emergency fund', desc: 'This money is a safety net for emergencies.' },
                    { id: 'wealth', icon: '📈', title: 'Build my wealth', desc: 'I don\'t have a specific plan, I just want to invest and grow my money.' },
                    { id: 'income', icon: '💰', title: 'Generate income', desc: 'I plan to withdraw money from this account regularly.' }
                  ]).map((option) => (
                    <button key={option.id} onClick={() => { setRiskAnswers({...riskAnswers, goal: option.id}); setRiskStep(2); }} className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-teal-500 hover:bg-slate-700/50 ${riskAnswers.goal === option.id ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600'}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{option.icon}</span>
                        <div>
                          <p className="font-medium">{option.title}</p>
                          <p className="text-sm text-slate-400">{option.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Inversión inicial */}
            {riskStep === 2 && (
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-2">{language === 'es' ? '¿Cuánto te gustaría invertir inicialmente?' : 'How much would you like to invest initially?'}</h2>
                <p className="text-slate-400 text-sm mb-6">{language === 'es' ? 'El monto de inversión nos ayuda a construir un portafolio adecuado a tus objetivos.' : 'The investment amount helps us build a portfolio suited to your goals.'}</p>
                <div className="mb-6">
                  <label className="block text-slate-400 text-sm mb-2">{language === 'es' ? 'Inversión inicial' : 'Initial investment'}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={riskAnswers.initialInvestmentRisk} onChange={(e) => setRiskAnswers({...riskAnswers, initialInvestmentRisk: e.target.value})} placeholder="100,000" className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-8 text-white focus:border-teal-500 focus:outline-none" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setRiskStep(1)} className="px-6 py-2 border border-slate-600 rounded-lg hover:bg-slate-700">{language === 'es' ? 'Atrás' : 'Back'}</button>
                  <button onClick={() => riskAnswers.initialInvestmentRisk && setRiskStep(3)} disabled={!riskAnswers.initialInvestmentRisk} className="flex-1 px-6 py-2 bg-teal-600 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">{language === 'es' ? 'Continuar' : 'Continue'}</button>
                </div>
              </div>
            )}

            {/* Step 3: Horizonte de tiempo */}
            {riskStep === 3 && (
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-2">{language === 'es' ? '¿En cuántos años necesitarás retirar este dinero?' : 'In how many years will you need to withdraw this money?'}</h2>
                <p className="text-slate-400 text-sm mb-6">{language === 'es' ? 'Tu horizonte de tiempo afecta cuánto riesgo puede manejar tu portafolio.' : 'Your time horizon affects how much risk your portfolio can handle.'}</p>
                <div className="mb-6">
                  <label className="block text-slate-400 text-sm mb-2">{language === 'es' ? 'Años hasta retirar fondos' : 'Years until withdrawal'}</label>
                  <input type="number" value={riskAnswers.timeHorizon} onChange={(e) => setRiskAnswers({...riskAnswers, timeHorizon: e.target.value})} placeholder="10" min="1" max="50" className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:border-teal-500 focus:outline-none" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setRiskStep(2)} className="px-6 py-2 border border-slate-600 rounded-lg hover:bg-slate-700">{language === 'es' ? 'Atrás' : 'Back'}</button>
                  <button onClick={() => riskAnswers.timeHorizon && setRiskStep(4)} disabled={!riskAnswers.timeHorizon} className="flex-1 px-6 py-2 bg-teal-600 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">{language === 'es' ? 'Continuar' : 'Continue'}</button>
                </div>
              </div>
            )}

            {/* Step 4: Aportación mensual */}
            {riskStep === 4 && (
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-2">{language === 'es' ? '¿Cuánto deseas aportar mensualmente?' : 'How much do you want to contribute monthly?'}</h2>
                <p className="text-slate-400 text-sm mb-6">{language === 'es' ? 'Las aportaciones regulares ayudan a hacer crecer tu inversión. (Opcional)' : 'Regular contributions help grow your investment. (Optional)'}</p>
                <div className="mb-6">
                  <label className="block text-slate-400 text-sm mb-2">{language === 'es' ? 'Aportación mensual' : 'Monthly contribution'}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={riskAnswers.monthlyContributionRisk} onChange={(e) => setRiskAnswers({...riskAnswers, monthlyContributionRisk: e.target.value})} placeholder="5,000" className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-8 text-white focus:border-teal-500 focus:outline-none" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setRiskStep(3)} className="px-6 py-2 border border-slate-600 rounded-lg hover:bg-slate-700">{language === 'es' ? 'Atrás' : 'Back'}</button>
                  <button onClick={() => setRiskStep(5)} className="flex-1 px-6 py-2 bg-teal-600 rounded-lg font-medium hover:bg-teal-700">{language === 'es' ? 'Continuar' : 'Continue'}</button>
                </div>
              </div>
            )}

            {/* Step 5: Conocimiento de inversiones */}
            {riskStep === 5 && (
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-2">{language === 'es' ? '¿Cuál es tu conocimiento sobre acciones, bonos y ETFs?' : 'What is your knowledge about stocks, bonds, and ETFs?'}</h2>
                <p className="text-slate-400 text-sm mb-6">{language === 'es' ? 'Esto nos ayuda a personalizar las recomendaciones.' : 'This helps us personalize recommendations.'}</p>
                <div className="space-y-3">
                  {(language === 'es' ? [
                    { id: 'none', label: 'Ninguno', desc: 'No tengo experiencia en inversiones' },
                    { id: 'some', label: 'Algo', desc: 'Conozco los conceptos básicos' },
                    { id: 'good', label: 'Bueno', desc: 'Tengo experiencia invirtiendo' },
                    { id: 'extensive', label: 'Extenso', desc: 'Soy un inversionista experimentado' }
                  ] : [
                    { id: 'none', label: 'None', desc: 'I have no investment experience' },
                    { id: 'some', label: 'Some', desc: 'I know the basics' },
                    { id: 'good', label: 'Good', desc: 'I have investment experience' },
                    { id: 'extensive', label: 'Extensive', desc: 'I am an experienced investor' }
                  ]).map((option) => (
                    <button key={option.id} onClick={() => { setRiskAnswers({...riskAnswers, knowledgeLevel: option.id}); setRiskStep(6); }} className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-teal-500 hover:bg-slate-700/50 ${riskAnswers.knowledgeLevel === option.id ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600'}`}>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-slate-400">{option.desc}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => setRiskStep(4)} className="mt-4 px-6 py-2 border border-slate-600 rounded-lg hover:bg-slate-700">{language === 'es' ? 'Atrás' : 'Back'}</button>
              </div>
            )}

            {/* Step 6: Percepción del riesgo */}
            {riskStep === 6 && (
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-2">{language === 'es' ? 'Cuando escuchas "riesgo" relacionado con tus finanzas, ¿qué es lo primero que piensas?' : 'When you hear "risk" related to your finances, what\'s the first thing you think?'}</h2>
                <p className="text-slate-400 text-sm mb-6">{language === 'es' ? 'No hay respuesta correcta o incorrecta.' : 'There is no right or wrong answer.'}</p>
                <div className="space-y-3">
                  {(language === 'es' ? [
                    { id: 'worry', label: 'Me preocupa quedarme sin nada', score: 1 },
                    { id: 'understand', label: 'Entiendo que es parte inherente del proceso de inversión', score: 2 },
                    { id: 'opportunity', label: 'Veo oportunidad de grandes rendimientos', score: 3 },
                    { id: 'thrill', label: 'Pienso en la emoción de invertir', score: 4 }
                  ] : [
                    { id: 'worry', label: 'I worry I could be left with nothing', score: 1 },
                    { id: 'understand', label: 'I understand it\'s an inherent part of investing', score: 2 },
                    { id: 'opportunity', label: 'I see opportunity for great returns', score: 3 },
                    { id: 'thrill', label: 'I think of the thrill of investing', score: 4 }
                  ]).map((option) => (
                    <button key={option.id} onClick={() => { setRiskAnswers({...riskAnswers, riskPerception: option.id}); setRiskStep(7); }} className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-teal-500 hover:bg-slate-700/50 ${riskAnswers.riskPerception === option.id ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600'}`}>
                      <p className="font-medium">{option.label}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => setRiskStep(5)} className="mt-4 px-6 py-2 border border-slate-600 rounded-lg hover:bg-slate-700">{language === 'es' ? 'Atrás' : 'Back'}</button>
              </div>
            )}

            {/* Step 7: Experiencia con pérdidas */}
            {riskStep === 7 && (
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-2">{language === 'es' ? '¿Has experimentado una caída del 20% o más en el valor de tus inversiones en un año?' : 'Have you experienced a 20% or more decline in your investments in one year?'}</h2>
                <p className="text-slate-400 text-sm mb-6">{language === 'es' ? 'Tu experiencia pasada nos ayuda a entender tu tolerancia al riesgo.' : 'Your past experience helps us understand your risk tolerance.'}</p>
                <div className="space-y-3">
                  {(language === 'es' ? [
                    { id: 'yes', label: 'Sí' },
                    { id: 'no', label: 'No' }
                  ] : [
                    { id: 'yes', label: 'Yes' },
                    { id: 'no', label: 'No' }
                  ]).map((option) => (
                    <button key={option.id} onClick={() => { setRiskAnswers({...riskAnswers, experiencedLoss: option.id}); setRiskStep(option.id === 'yes' ? 8 : 9); }} className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-teal-500 hover:bg-slate-700/50 ${riskAnswers.experiencedLoss === option.id ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600'}`}>
                      <p className="font-medium">{option.label}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => setRiskStep(6)} className="mt-4 px-6 py-2 border border-slate-600 rounded-lg hover:bg-slate-700">{language === 'es' ? 'Atrás' : 'Back'}</button>
              </div>
            )}

            {/* Step 8: Reacción a pérdidas (solo si respondió Sí) */}
            {riskStep === 8 && (
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-2">{language === 'es' ? '¿Qué hiciste cuando experimentaste esa caída del 20%?' : 'What did you do when you experienced that 20% decline?'}</h2>
                <p className="text-slate-400 text-sm mb-6">{language === 'es' ? 'Tu reacción pasada predice tu comportamiento futuro.' : 'Your past reaction predicts your future behavior.'}</p>
                <div className="space-y-3">
                  {(language === 'es' ? [
                    { id: 'sold-all', label: 'Vendí todo', score: 1 },
                    { id: 'sold-some', label: 'Vendí algo', score: 2 },
                    { id: 'nothing', label: 'No hice nada', score: 3 },
                    { id: 'rebalanced', label: 'Rebalanceé mis inversiones', score: 4 },
                    { id: 'bought-more', label: 'Compré más', score: 5 }
                  ] : [
                    { id: 'sold-all', label: 'I sold everything', score: 1 },
                    { id: 'sold-some', label: 'I sold some', score: 2 },
                    { id: 'nothing', label: 'I did nothing', score: 3 },
                    { id: 'rebalanced', label: 'I rebalanced my investments', score: 4 },
                    { id: 'bought-more', label: 'I bought more', score: 5 }
                  ]).map((option) => (
                    <button key={option.id} onClick={() => { setRiskAnswers({...riskAnswers, lossReaction: option.id}); setRiskStep(9); }} className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-teal-500 hover:bg-slate-700/50 ${riskAnswers.lossReaction === option.id ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600'}`}>
                      <p className="font-medium">{option.label}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => setRiskStep(7)} className="mt-4 px-6 py-2 border border-slate-600 rounded-lg hover:bg-slate-700">{language === 'es' ? 'Atrás' : 'Back'}</button>
              </div>
            )}

            {/* Step 9: Tolerancia a la volatilidad */}
            {riskStep === 9 && (
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-2">{language === 'es' ? '¿Con cuánta fluctuación te sentirías cómodo en 1 año?' : 'How much fluctuation would you be comfortable with in 1 year?'}</h2>
                <p className="text-slate-400 text-sm mb-6">{language === 'es' ? 'Asumiendo una inversión de $100,000' : 'Assuming a $100,000 investment'}</p>
                <div className="space-y-3">
                  {(language === 'es' ? [
                    { id: 'very-low', label: '-10% a +15%', desc: 'Pérdida potencial: $10,000 | Ganancia potencial: $15,000', score: 1 },
                    { id: 'low', label: '-15% a +25%', desc: 'Pérdida potencial: $15,000 | Ganancia potencial: $25,000', score: 2 },
                    { id: 'moderate', label: '-25% a +35%', desc: 'Pérdida potencial: $25,000 | Ganancia potencial: $35,000', score: 3 },
                    { id: 'high', label: '-30% a +45%', desc: 'Pérdida potencial: $30,000 | Ganancia potencial: $45,000', score: 4 },
                    { id: 'very-high', label: '-35% a +50%', desc: 'Pérdida potencial: $35,000 | Ganancia potencial: $50,000', score: 5 },
                    { id: 'aggressive', label: '-40% a +55%', desc: 'Pérdida potencial: $40,000 | Ganancia potencial: $55,000', score: 6 },
                    { id: 'very-aggressive', label: '-45% a +60%', desc: 'Pérdida potencial: $45,000 | Ganancia potencial: $60,000', score: 7 }
                  ] : [
                    { id: 'very-low', label: '-10% to +15%', desc: 'Potential loss: $10,000 | Potential gain: $15,000', score: 1 },
                    { id: 'low', label: '-15% to +25%', desc: 'Potential loss: $15,000 | Potential gain: $25,000', score: 2 },
                    { id: 'moderate', label: '-25% to +35%', desc: 'Potential loss: $25,000 | Potential gain: $35,000', score: 3 },
                    { id: 'high', label: '-30% to +45%', desc: 'Potential loss: $30,000 | Potential gain: $45,000', score: 4 },
                    { id: 'very-high', label: '-35% to +50%', desc: 'Potential loss: $35,000 | Potential gain: $50,000', score: 5 },
                    { id: 'aggressive', label: '-40% to +55%', desc: 'Potential loss: $40,000 | Potential gain: $55,000', score: 6 },
                    { id: 'very-aggressive', label: '-45% to +60%', desc: 'Potential loss: $45,000 | Potential gain: $60,000', score: 7 }
                  ]).map((option) => (
                    <button key={option.id} onClick={() => { setRiskAnswers({...riskAnswers, volatilityTolerance: option.id}); setRiskStep(10); }} className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-teal-500 hover:bg-slate-700/50 ${riskAnswers.volatilityTolerance === option.id ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600'}`}>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-slate-400">{option.desc}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => setRiskStep(riskAnswers.experiencedLoss === 'yes' ? 8 : 7)} className="mt-4 px-6 py-2 border border-slate-600 rounded-lg hover:bg-slate-700">{language === 'es' ? 'Atrás' : 'Back'}</button>
              </div>
            )}

            {/* Step 10: Enfoque en decisiones */}
            {riskStep === 10 && (
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-xl font-semibold mb-2">{language === 'es' ? '¿Cómo describirías tu enfoque al tomar decisiones financieras importantes?' : 'How would you describe your approach to making important financial decisions?'}</h2>
                <p className="text-slate-400 text-sm mb-6">{language === 'es' ? 'Última pregunta antes de ver tu resultado.' : 'Last question before seeing your result.'}</p>
                <div className="space-y-3">
                  {(language === 'es' ? [
                    { id: 'avoid', label: 'Trato de evitar tomar decisiones', score: 1 },
                    { id: 'reluctant', label: 'Las tomo con reluctancia', score: 2 },
                    { id: 'confident', label: 'Las tomo con confianza y no miro atrás', score: 3 }
                  ] : [
                    { id: 'avoid', label: 'I try to avoid making decisions', score: 1 },
                    { id: 'reluctant', label: 'I make them reluctantly', score: 2 },
                    { id: 'confident', label: 'I make them confidently and don\'t look back', score: 3 }
                  ]).map((option) => (
                    <button key={option.id} onClick={() => { 
                      setRiskAnswers({...riskAnswers, decisionApproach: option.id}); 
                      // Calcular perfil de riesgo
                      const answers = {...riskAnswers, decisionApproach: option.id};
                      let score = 0;
                      const timeHorizon = parseInt(answers.timeHorizon) || 10;
                      score += timeHorizon >= 20 ? 5 : timeHorizon >= 10 ? 4 : timeHorizon >= 5 ? 3 : 2;
                      score += answers.knowledgeLevel === 'extensive' ? 4 : answers.knowledgeLevel === 'good' ? 3 : answers.knowledgeLevel === 'some' ? 2 : 1;
                      score += answers.riskPerception === 'thrill' ? 4 : answers.riskPerception === 'opportunity' ? 3 : answers.riskPerception === 'understand' ? 2 : 1;
                      if (answers.lossReaction) {
                        score += answers.lossReaction === 'bought-more' ? 5 : answers.lossReaction === 'rebalanced' ? 4 : answers.lossReaction === 'nothing' ? 3 : answers.lossReaction === 'sold-some' ? 2 : 1;
                      } else {
                        score += 3;
                      }
                      score += answers.volatilityTolerance === 'very-aggressive' ? 7 : answers.volatilityTolerance === 'aggressive' ? 6 : answers.volatilityTolerance === 'very-high' ? 5 : answers.volatilityTolerance === 'high' ? 4 : answers.volatilityTolerance === 'moderate' ? 3 : answers.volatilityTolerance === 'low' ? 2 : 1;
                      score += option.id === 'confident' ? 3 : option.id === 'reluctant' ? 2 : 1;
                      
                      let profile;
                      if (score >= 24) profile = 'aggressive';
                      else if (score >= 20) profile = 'growth';
                      else if (score >= 15) profile = 'moderate';
                      else if (score >= 10) profile = 'conservative';
                      else profile = 'very-conservative';
                      
                      setRiskProfile(profile);
                      setRiskStep(11);
                    }} className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-teal-500 hover:bg-slate-700/50 ${riskAnswers.decisionApproach === option.id ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600'}`}>
                      <p className="font-medium">{option.label}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => setRiskStep(9)} className="mt-4 px-6 py-2 border border-slate-600 rounded-lg hover:bg-slate-700">{language === 'es' ? 'Atrás' : 'Back'}</button>
              </div>
            )}

            {/* Step 11: Resultado */}
            {riskStep === 11 && riskProfile && (
              <div className="space-y-6">
                {/* Perfil */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-8 backdrop-blur-sm border border-slate-700 text-center">
                  <div className="text-5xl mb-4">
                    {riskProfile === 'very-conservative' ? '🛡️' : riskProfile === 'conservative' ? '🏦' : riskProfile === 'moderate' ? '⚖️' : riskProfile === 'growth' ? '📈' : '🚀'}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{language === 'es' ? 'Tu Perfil de Inversionista' : 'Your Investor Profile'}</h2>
                  <p className="text-3xl font-bold mb-4" style={{ color: riskProfile === 'very-conservative' ? '#60A5FA' : riskProfile === 'conservative' ? '#34D399' : riskProfile === 'moderate' ? '#FBBF24' : riskProfile === 'growth' ? '#F97316' : '#EF4444' }}>
                    {language === 'es' 
                      ? (riskProfile === 'very-conservative' ? 'Muy Conservador' : riskProfile === 'conservative' ? 'Conservador' : riskProfile === 'moderate' ? 'Moderado' : riskProfile === 'growth' ? 'Crecimiento' : 'Agresivo')
                      : (riskProfile === 'very-conservative' ? 'Very Conservative' : riskProfile === 'conservative' ? 'Conservative' : riskProfile === 'moderate' ? 'Moderate' : riskProfile === 'growth' ? 'Growth' : 'Aggressive')}
                  </p>
                  <p className="text-slate-400">
                    {language === 'es' 
                      ? (riskProfile === 'very-conservative' ? 'Priorizas la preservación del capital sobre todo. Prefieres rendimientos estables aunque sean menores.' :
                         riskProfile === 'conservative' ? 'Buscas estabilidad con algo de crecimiento. Aceptas volatilidad limitada para obtener mejores rendimientos.' :
                         riskProfile === 'moderate' ? 'Buscas un balance entre crecimiento y estabilidad. Aceptas fluctuaciones a cambio de mejores rendimientos a largo plazo.' :
                         riskProfile === 'growth' ? 'Te enfocas en el crecimiento de tu patrimonio. Aceptas mayor volatilidad por mayores rendimientos potenciales.' :
                         'Buscas máximos rendimientos y estás cómodo con alta volatilidad. Entiendes que puedes tener pérdidas significativas.')
                      : (riskProfile === 'very-conservative' ? 'You prioritize capital preservation above all. You prefer stable returns even if lower.' :
                         riskProfile === 'conservative' ? 'You seek stability with some growth. You accept limited volatility for better returns.' :
                         riskProfile === 'moderate' ? 'You seek balance between growth and stability. You accept fluctuations for better long-term returns.' :
                         riskProfile === 'growth' ? 'You focus on growing your wealth. You accept higher volatility for greater potential returns.' :
                         'You seek maximum returns and are comfortable with high volatility. You understand you may have significant losses.')}
                  </p>
                </div>

                {/* Asignación recomendada */}
                <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                  <h3 className="text-xl font-semibold mb-4">📊 {language === 'es' ? 'Asignación de Activos Recomendada' : 'Recommended Asset Allocation'}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    {(() => {
                      // Asignaciones basadas en:
                      // - Crypto: Ray Dalio (1-2%), Paul Tudor Jones (1-2%), Fidelity (1-5%), BlackRock (1-2%)
                      // - Conservadores: 0-1% (riesgo muy alto para su perfil)
                      // - Moderados: 2-3% (beneficio diversificación con riesgo controlado)
                      // - Agresivos: 3-5% (máximo recomendado por institucionales serios)
                      const allocations = {
                        'very-conservative': { stocks: 20, bonds: 50, realEstate: 10, gold: 10, crypto: 0, cash: 10 },
                        'conservative': { stocks: 35, bonds: 35, realEstate: 14, gold: 10, crypto: 1, cash: 5 },
                        'moderate': { stocks: 48, bonds: 24, realEstate: 12, gold: 8, crypto: 3, cash: 5 },
                        'growth': { stocks: 67, bonds: 11, realEstate: 10, gold: 5, crypto: 4, cash: 3 },
                        'aggressive': { stocks: 80, bonds: 4, realEstate: 5, gold: 3, crypto: 5, cash: 3 }
                      };
                      const alloc = allocations[riskProfile];
                      return [
                        { name: language === 'es' ? 'Renta Variable' : 'Stocks', value: alloc.stocks, color: '#3B82F6', icon: '📈' },
                        { name: language === 'es' ? 'Renta Fija' : 'Bonds', value: alloc.bonds, color: '#10B981', icon: '🏦' },
                        { name: language === 'es' ? 'Bienes Raíces' : 'Real Estate', value: alloc.realEstate, color: '#8B5CF6', icon: '🏠' },
                        { name: language === 'es' ? 'Metales' : 'Metals', value: alloc.gold, color: '#F59E0B', icon: '🥇' },
                        { name: 'Crypto (BTC/ETH)', value: alloc.crypto, color: '#F97316', icon: '₿' },
                        { name: language === 'es' ? 'Efectivo' : 'Cash', value: alloc.cash, color: '#6B7280', icon: '💵' }
                      ].map((asset) => (
                        <div key={asset.name} className="text-center">
                          <div className="text-3xl mb-1">{asset.icon}</div>
                          <p className="text-2xl font-bold" style={{ color: asset.color }}>{asset.value}%</p>
                          <p className="text-xs text-slate-400">{asset.name}</p>
                        </div>
                      ));
                    })()}
                  </div>
                  
                  {/* Gráfico de pie visual */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-48 h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={(() => {
                              const allocations = {
                                'very-conservative': { stocks: 20, bonds: 50, realEstate: 10, gold: 10, crypto: 0, cash: 10 },
                                'conservative': { stocks: 35, bonds: 35, realEstate: 14, gold: 10, crypto: 1, cash: 5 },
                                'moderate': { stocks: 48, bonds: 24, realEstate: 12, gold: 8, crypto: 3, cash: 5 },
                                'growth': { stocks: 67, bonds: 11, realEstate: 10, gold: 5, crypto: 4, cash: 3 },
                                'aggressive': { stocks: 80, bonds: 4, realEstate: 5, gold: 3, crypto: 5, cash: 3 }
                              };
                              const alloc = allocations[riskProfile];
                              return [
                                { name: 'Renta Variable', value: alloc.stocks },
                                { name: 'Renta Fija', value: alloc.bonds },
                                { name: 'Bienes Raíces', value: alloc.realEstate },
                                { name: 'Metales', value: alloc.gold },
                                { name: 'Crypto', value: alloc.crypto },
                                { name: 'Efectivo', value: alloc.cash }
                              ].filter(item => item.value > 0);
                            })()}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            innerRadius={40}
                          >
                            <Cell fill="#3B82F6" />
                            <Cell fill="#10B981" />
                            <Cell fill="#8B5CF6" />
                            <Cell fill="#F59E0B" />
                            {riskProfile !== 'very-conservative' && <Cell fill="#F97316" />}
                            <Cell fill="#6B7280" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Descripción de la estrategia */}
                  <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-slate-300">
                      {language === 'es' 
                        ? (riskProfile === 'very-conservative' ? 
                            '💡 Esta estrategia prioriza la protección del capital con 50% en renta fija y solo 20% en acciones. Ideal para horizontes cortos o quienes no toleran pérdidas.' :
                           riskProfile === 'conservative' ? 
                            '💡 Un balance entre seguridad y crecimiento moderado. La renta fija y variable se equilibran para reducir volatilidad mientras se busca algo de rendimiento.' :
                           riskProfile === 'moderate' ? 
                            '💡 La clásica cartera balanceada 50/50. Ofrece exposición al crecimiento de los mercados con colchón de renta fija para reducir volatilidad.' :
                           riskProfile === 'growth' ? 
                            '💡 Portafolio orientado al crecimiento con 70% en renta variable. Acepta mayor volatilidad a cambio de mayor potencial de rendimiento a largo plazo.' :
                            '💡 Máxima exposición a renta variable (85%). Para inversionistas con horizontes largos que pueden tolerar caídas significativas buscando máximos rendimientos.')
                        : (riskProfile === 'very-conservative' ? 
                            '💡 This strategy prioritizes capital protection with 50% in bonds and only 20% in stocks. Ideal for short horizons or those who cannot tolerate losses.' :
                           riskProfile === 'conservative' ? 
                            '💡 A balance between security and moderate growth. Fixed income and equities are balanced to reduce volatility while seeking some returns.' :
                           riskProfile === 'moderate' ? 
                            '💡 The classic balanced 50/50 portfolio. Offers exposure to market growth with a fixed income cushion to reduce volatility.' :
                           riskProfile === 'growth' ? 
                            '💡 Growth-oriented portfolio with 70% in equities. Accepts higher volatility in exchange for greater long-term return potential.' :
                            '💡 Maximum equity exposure (85%). For investors with long horizons who can tolerate significant declines seeking maximum returns.')}
                    </p>
                  </div>

                  {/* Resumen de respuestas */}
                  <div className="border-t border-slate-700 pt-4">
                    <h4 className="font-medium mb-3">📋 {language === 'es' ? 'Resumen de tu perfil' : 'Your Profile Summary'}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-slate-400">{language === 'es' ? 'Objetivo:' : 'Goal:'}</div>
                      <div>{language === 'es' 
                        ? (riskAnswers.goal === 'retirement' ? 'Retiro' : riskAnswers.goal === 'wealth' ? 'Crecer patrimonio' : riskAnswers.goal === 'emergency' ? 'Fondo de emergencia' : riskAnswers.goal === 'income' ? 'Generar ingresos' : 'Gasto especial')
                        : (riskAnswers.goal === 'retirement' ? 'Retirement' : riskAnswers.goal === 'wealth' ? 'Build wealth' : riskAnswers.goal === 'emergency' ? 'Emergency fund' : riskAnswers.goal === 'income' ? 'Generate income' : 'Special expense')}</div>
                      <div className="text-slate-400">{language === 'es' ? 'Inversión inicial:' : 'Initial investment:'}</div>
                      <div>${Number(riskAnswers.initialInvestmentRisk).toLocaleString()}</div>
                      <div className="text-slate-400">{language === 'es' ? 'Horizonte:' : 'Horizon:'}</div>
                      <div>{riskAnswers.timeHorizon} {language === 'es' ? 'años' : 'years'}</div>
                      <div className="text-slate-400">{language === 'es' ? 'Aportación mensual:' : 'Monthly contribution:'}</div>
                      <div>${Number(riskAnswers.monthlyContributionRisk || 0).toLocaleString()}</div>
                      <div className="text-slate-400">{language === 'es' ? 'Tolerancia al riesgo:' : 'Risk tolerance:'}</div>
                      <div className="capitalize">{language === 'es' 
                        ? (riskProfile === 'very-conservative' ? 'Muy Baja' : riskProfile === 'conservative' ? 'Baja' : riskProfile === 'moderate' ? 'Moderada' : riskProfile === 'growth' ? 'Alta' : 'Muy Alta')
                        : (riskProfile === 'very-conservative' ? 'Very Low' : riskProfile === 'conservative' ? 'Low' : riskProfile === 'moderate' ? 'Moderate' : riskProfile === 'growth' ? 'High' : 'Very High')}</div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-4">
                  <button onClick={() => { setRiskStep(0); setRiskAnswers({ goal: null, initialInvestmentRisk: '', timeHorizon: '', monthlyContributionRisk: '', knowledgeLevel: null, riskPerception: null, experiencedLoss: null, lossReaction: null, volatilityTolerance: null, decisionApproach: null }); setRiskProfile(null); }} className="flex-1 px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-700 font-medium">
                    🔄 {language === 'es' ? 'Volver a Empezar' : 'Start Over'}
                  </button>
                  <button onClick={() => { setInitialInvestment(Number(riskAnswers.initialInvestmentRisk) || 100000); setMonthlyContribution(Number(riskAnswers.monthlyContributionRisk) || 5000); setActiveTab('simulator'); }} className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg font-medium hover:from-teal-600 hover:to-emerald-600">
                    📊 {language === 'es' ? 'Ir al Simulador' : 'Go to Simulator'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== PORTAFOLIO (Estadísticas + Composición) ==================== */}
        {activeTab === 'portfolio' && (
          <>
            {/* Gráfica: Valor de inversión desde el inicio */}
            <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-center">
                {language === 'es' 
                  ? `💰 Valor de $100,000 invertidos desde el inicio` 
                  : `💰 Value of $100,000 Invested Since Inception`}
              </h2>
              <p className="text-xs text-slate-500 text-center mb-4">
                {language === 'es' 
                  ? `${fund.n_months} meses de track record • Sin aportaciones adicionales` 
                  : `${fund.n_months} months track record • No additional contributions`}
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={(() => {
                  const baseInvestment = 100000;
                  let fundValue = baseInvestment;
                  let benchValue = baseInvestment;
                  let minValue = baseInvestment;
                  let maxValue = baseInvestment;
                  const chartData = [{ 
                    month: language === 'es' ? 'Inicio' : 'Start', 
                    fund: baseInvestment, 
                    benchmark: baseInvestment 
                  }];
                  fund.returns.forEach((r) => {
                    fundValue = fundValue * (1 + r.fund);
                    benchValue = benchValue * (1 + r.benchmark);
                    minValue = Math.min(minValue, fundValue, benchValue);
                    maxValue = Math.max(maxValue, fundValue, benchValue);
                    chartData.push({ 
                      month: translateMonth(r.month), 
                      fund: Math.round(fundValue), 
                      benchmark: Math.round(benchValue) 
                    });
                  });
                  // Guardar min/max para el dominio del eje Y
                  chartData.minValue = Math.floor(minValue * 0.95 / 10000) * 10000; // 5% abajo, redondeado
                  chartData.maxValue = Math.ceil(maxValue * 1.05 / 10000) * 10000; // 5% arriba, redondeado
                  return chartData;
                })()}>
                  <defs>
                    <linearGradient id="fundGradPortfolio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={fund.color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={fund.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} interval="preserveStartEnd" />
                  <YAxis 
                    stroke="#9CA3AF" 
                    fontSize={10} 
                    tickFormatter={(v) => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`}
                    domain={[dataMin => Math.floor(dataMin * 0.92 / 10000) * 10000, dataMax => Math.ceil(dataMax * 1.05 / 10000) * 10000]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }} 
                    formatter={(value, name) => {
                      const label = name === 'fund' ? selectedFund : fund.benchmark;
                      return [formatCurrency(value), label];
                    }}
                    labelFormatter={(label) => <span style={{fontWeight: 'bold', fontSize: '14px'}}>{label}</span>}
                  />
                  <Legend formatter={(value) => value === 'fund' ? selectedFund : fund.benchmark} />
                  <Area type="monotone" dataKey="benchmark" name="benchmark" stroke="#94A3B8" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="fund" name="fund" stroke={fund.color} fill="url(#fundGradPortfolio)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="text-center">
                  <p className="text-slate-400">{selectedFund}</p>
                  <p className="text-xl font-bold" style={{ color: fund.color }}>
                    {formatCurrency(100000 * (1 + fund.cumulative))}
                  </p>
                  <p className={`text-sm ${fund.cumulative >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {fund.cumulative >= 0 ? '+' : ''}{(fund.cumulative * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400">{fund.benchmark}</p>
                  <p className="text-xl font-bold text-slate-300">
                    {formatCurrency(100000 * (1 + fund.returns.reduce((acc, r) => (1 + acc) * (1 + r.benchmark) - 1, 0)))}
                  </p>
                  <p className={`text-sm ${fund.returns.reduce((acc, r) => (1 + acc) * (1 + r.benchmark) - 1, 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {fund.returns.reduce((acc, r) => (1 + acc) * (1 + r.benchmark) - 1, 0) >= 0 ? '+' : ''}{(fund.returns.reduce((acc, r) => (1 + acc) * (1 + r.benchmark) - 1, 0) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Rendimientos */}
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-xl font-semibold mb-2 text-center">📈 {t.returns}</h2>
              <p className="text-xs text-slate-500 text-center mb-4">{t.hoverTip}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[[t.lastMonth, fund.last_month], [t.last3m, fund.last_3m], [t.last6m, fund.last_6m], [t.last12m, fund.last_12m], [t.cumulative, fund.cumulative], [t.annualized, fund.annualized]].map(([label, value], idx) => (
                  <div key={idx} className={`group relative bg-slate-700/50 rounded-lg p-4 text-center cursor-help ${idx === 5 ? 'border-2' : ''}`} style={idx === 5 ? { borderColor: fund.color } : {}}>
                    <p className="text-slate-400 text-xs mb-1 flex items-center justify-center gap-1">{label} <span className="text-slate-600">ⓘ</span></p>
                    <p className={`text-xl font-bold ${value >= 0 ? 'text-emerald-400' : 'text-red-400'}`} style={idx === 5 ? { color: fund.color } : {}}>{formatPercent(value)}</p>
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-52 text-left">
                      <p className="text-xs text-slate-300 leading-relaxed">{metricDescriptions[label]}</p>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-600 rotate-45"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Métricas de Riesgo y Alpha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h3 className="text-lg font-semibold mb-4">{t.riskMetrics}</h3>
                <div className="space-y-3">
                  {[
                    [t.volatilityAnnual, formatPercentPlain(fund.std_annual), ''],
                    ['Vol. ' + fund.benchmark, formatPercentPlain(fund.std_bench_annual), 'text-slate-500'],
                    [t.maxDrawdown, formatPercentPlain(fund.max_drawdown), 'text-red-400'],
                    [t.sharpeRatio, fund.sharpe.toFixed(2), fund.sharpe >= 1 ? 'text-emerald-400' : fund.sharpe >= 0.5 ? 'text-amber-400' : ''],
                    [t.beta, fund.beta.toFixed(2), ''],
                    [t.correlation, fund.correlation.toFixed(2), '']
                  ].map(([label, value, cls], idx) => {
                    const baseLabel = label.includes('Vol.') ? 'Volatilidad' : label.includes('Beta') ? 'Beta' : label;
                    const desc = metricDescriptions[baseLabel];
                    return (
                      <div key={idx} className="group relative flex justify-between items-center cursor-help hover:bg-slate-700/30 rounded px-2 py-1 -mx-2">
                        <span className="text-slate-400 flex items-center gap-1">{label} {desc && <span className="text-slate-600 text-xs">ⓘ</span>}</span>
                        <span className={`font-medium ${cls || ''}`}>{value}</span>
                        {desc && (
                          <div className="absolute left-0 right-0 bottom-full mb-2 p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
                            <div className="absolute -bottom-2 left-6 w-3 h-3 bg-slate-900 border-r border-b border-slate-600 rotate-45"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <h3 className="text-lg font-semibold mb-4">{t.alphaConsistency}</h3>
                <div className="space-y-3">
                  {[
                    [t.alpha, formatPercent(fund.alpha), fund.alpha >= 0 ? 'text-emerald-400' : 'text-red-400'],
                    [t.bestMonth, formatPercent(fund.best_month), 'text-emerald-400'],
                    [t.worstMonth, formatPercent(fund.worst_month), 'text-red-400'],
                    [t.positiveMonths, `${fund.positive_months} ${t.of} ${fund.n_months}`, ''],
                    [t.winRate, formatPercentPlain(fund.win_rate, 1), fund.win_rate >= 0.6 ? 'text-emerald-400' : 'text-amber-400'],
                    [t.positions, fund.n_holdings || 'N/A', '']
                  ].map(([label, value, cls], idx) => {
                    const desc = metricDescriptions[label];
                    return (
                      <div key={idx} className="group relative flex justify-between items-center cursor-help hover:bg-slate-700/30 rounded px-2 py-1 -mx-2">
                        <span className="text-slate-400 flex items-center gap-1">{label} {desc && <span className="text-slate-600 text-xs">ⓘ</span>}</span>
                        <span className={`font-medium ${cls || ''}`}>{value}</span>
                        {desc && (
                          <div className="absolute left-0 right-0 bottom-full mb-2 p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
                            <div className="absolute -bottom-2 left-6 w-3 h-3 bg-slate-900 border-r border-b border-slate-600 rotate-45"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Capture Ratios */}
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h3 className="text-lg font-semibold mb-4">{t.marketCapture}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative text-center cursor-help">
                  <p className="text-slate-400 text-sm mb-2 flex items-center justify-center gap-1">{t.upsideCapture} <span className="text-slate-600">ⓘ</span></p>
                  <p className="text-3xl font-bold" style={{ color: fund.upside_capture >= 1 ? '#10B981' : fund.color }}>{formatPercentPlain(fund.upside_capture, 1)}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.whenUp.replace('{benchmark}', fund.benchmark).replace('{value}', formatPercentPlain(fund.upside_capture, 0))}</p>
                  <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
                    <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${Math.min(fund.upside_capture * 100, 100)}%` }}></div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64 text-left">
                    <p className="text-xs text-slate-300 leading-relaxed">{metricDescriptions["Captura en Alzas (Upside)"]}</p>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-600 rotate-45"></div>
                  </div>
                </div>
                <div className="group relative text-center cursor-help">
                  <p className="text-slate-400 text-sm mb-2 flex items-center justify-center gap-1">{t.downsideCapture} <span className="text-slate-600">ⓘ</span></p>
                  <p className="text-3xl font-bold" style={{ color: fund.downside_capture <= 0.5 ? '#10B981' : '#EF4444' }}>{formatPercentPlain(fund.downside_capture, 1)}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {fund.downside_capture < 0 
                      ? t.whenDownInverse.replace('{benchmark}', fund.benchmark)
                      : t.whenDown.replace('{benchmark}', fund.benchmark).replace('{value}', formatPercentPlain(fund.downside_capture, 0))}
                  </p>
                  <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
                    <div className="h-3 rounded-full" style={{ width: `${Math.min(Math.abs(fund.downside_capture) * 100, 100)}%`, backgroundColor: fund.downside_capture <= 0.5 ? '#10B981' : '#EF4444' }}></div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64 text-left">
                    <p className="text-xs text-slate-300 leading-relaxed">{metricDescriptions["Captura en Bajas (Downside)"]}</p>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-600 rotate-45"></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                <p className="text-sm text-slate-400">
                  💡 <strong>{t.interpretation}:</strong> {fund.downside_capture < 0 
                    ? (language === 'es' ? '¡Excelente! El portafolio tiene correlación inversa al mercado en bajas - sube cuando el mercado cae.' : 'Excellent! The portfolio has inverse correlation to the market in downturns - it rises when the market falls.')
                    : fund.upside_capture >= 1 && fund.downside_capture < 0.7 
                    ? (language === 'es' ? 'Excelente perfil: captura más ganancias y menos pérdidas que el mercado.' : 'Excellent profile: captures more gains and fewer losses than the market.')
                    : fund.downside_capture < 0.7 
                    ? (language === 'es' ? 'Buena protección a la baja: cuando el mercado cae, este portafolio cae menos.' : 'Good downside protection: when the market falls, this portfolio falls less.')
                    : (language === 'es' ? 'El portafolio tiende a seguir al mercado de cerca.' : 'The portfolio tends to follow the market closely.')}
                </p>
              </div>
            </div>

            {/* Holdings y Sectores */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Top 10 Holdings */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-lg md:text-xl font-semibold mb-4">{t.topPositions.replace('{n}', composition.holdings.length)}</h2>
                <p className="text-xs text-slate-500 mb-4">{t.positionHoverTip}</p>
                <div className="space-y-3">
                  {composition.holdings.map((holding, idx) => {
                    const description = companyDescriptions[holding.name] || companyDescriptions["default"];
                    const isLastItems = idx >= composition.holdings.length - 3;
                    return (
                      <div key={idx} className="group relative">
                        <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:bg-slate-700/50 rounded-lg p-2 -m-2 transition-all">
                          <span className="text-slate-500 w-5 md:w-6 text-xs md:text-sm flex-shrink-0">{holding.rank}.</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1 gap-2">
                              <span className="text-xs md:text-sm truncate group-hover:text-white transition-colors">{holding.name}</span>
                              <span className="font-medium text-xs md:text-sm flex-shrink-0" style={{ color: fund.color }}>{holding.weight.toFixed(2)}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-1.5 md:h-2">
                              <div className="h-1.5 md:h-2 rounded-full transition-all" style={{ width: `${Math.min(holding.weight * 3, 100)}%`, backgroundColor: fund.color, opacity: 1 - (idx * 0.07) }}></div>
                            </div>
                          </div>
                        </div>
                        <div className={`absolute left-0 right-0 ${isLastItems ? 'bottom-full mb-1' : 'top-full mt-1'} p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
                          <div className="flex items-start gap-2">
                            <span className="text-lg">ℹ️</span>
                            <div>
                              <p className="font-medium text-sm text-white mb-1">{holding.name}</p>
                              <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
                            </div>
                          </div>
                          <div className={`absolute ${isLastItems ? '-bottom-2 border-r border-b' : '-top-2 border-l border-t'} left-6 w-3 h-3 bg-slate-900 border-slate-600 transform rotate-45`}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Total del Top 10 */}
                <div className="mt-5 bg-slate-700/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📊</span>
                      <span className="text-sm font-medium text-slate-300">{language === 'es' ? 'Concentración Top 10' : 'Top 10 Concentration'}</span>
                    </div>
                    <span className="font-bold text-lg" style={{ color: fund.color }}>
                      {composition.holdings.reduce((sum, h) => sum + h.weight, 0).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Sector Allocation */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700">
                <h2 className="text-lg md:text-xl font-semibold mb-2">{t.sectorDistribution}</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie 
                      data={composition.sectors.map(s => ({...s, sectorTranslated: t.sectors[s.sector] || s.sector}))} 
                      dataKey="weight" 
                      nameKey="sectorTranslated" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={120}
                      innerRadius={50}
                      paddingAngle={1}
                      label={({ weight, cx, cy, midAngle, outerRadius }) => {
                        // Solo mostrar etiqueta si el sector es > 7%
                        if (weight < 7) return null;
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius * 0.75;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
                            {`${weight.toFixed(0)}%`}
                          </text>
                        );
                      }}
                      labelLine={false}
                    >
                      {composition.sectors.map((entry, index) => (<Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} />))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value.toFixed(1)}%`, name]} contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {composition.sectors.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs py-0.5">
                      <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: SECTOR_COLORS[idx % SECTOR_COLORS.length] }}></div>
                      <span className="text-slate-400 truncate flex-1">{t.sectors[s.sector] || s.sector}</span>
                      <span className="font-medium text-white">{s.weight.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sector Bar Chart */}
            <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700">
              <h2 className="text-lg md:text-xl font-semibold mb-4">{t.sectorsByWeight}</h2>
              <ResponsiveContainer width="100%" height={Math.max(composition.sectors.length * 45, 280)}>
                <BarChart data={composition.sectors.map(s => ({...s, sectorTranslated: t.sectors[s.sector] || s.sector}))} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" fontSize={10} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="sectorTranslated" stroke="#9CA3AF" fontSize={9} width={90} tick={{ fontSize: 9 }} />
                  <Tooltip formatter={(value) => `${value.toFixed(2)}%`} contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }} />
                  <Bar dataKey="weight" fill={fund.color} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ==================== SIMULADOR ==================== */}
        {activeTab === 'simulator' && (
          <>
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-lg font-semibold mb-4 text-center">{t.configureSimulation}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 mb-2 text-sm">{t.initialInvestment}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)} className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-8 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex gap-2 mt-2">{[50000, 100000, 500000, 1000000].map((amt) => (<button key={amt} onClick={() => setInitialInvestment(amt)} className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded">{amt >= 1000000 ? `${amt/1000000}M` : `${amt/1000}K`}</button>))}</div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-2 text-sm">{t.monthlyContribution}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)} className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-8 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex gap-2 mt-2">{[0, 5000, 10000, 25000].map((amt) => (<button key={amt} onClick={() => setMonthlyContribution(amt)} className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded">{amt === 0 ? (language === 'es' ? 'Sin aport.' : 'No contr.') : `${amt/1000}K`}</button>))}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"><p className="text-slate-400 text-xs">{language === 'es' ? 'Total Aportado' : 'Total Contributed'}</p><p className="text-xl font-bold text-slate-300">{formatCurrency(lastData.totalContributed)}</p></div>
              <div className="bg-slate-800/50 rounded-xl p-4 border-2" style={{ borderColor: fund.color }}><p className="text-slate-400 text-xs">{language === 'es' ? 'Con' : 'With'} {selectedFund.split(' ')[0]}</p><p className="text-xl font-bold" style={{ color: fund.color }}>{formatCurrency(lastData.fundValue)}</p><p className="text-xs text-emerald-400">{formatPercent(percentGainFund)}</p></div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"><p className="text-slate-400 text-xs">{language === 'es' ? 'Con' : 'With'} {fund.benchmark}</p><p className="text-xl font-bold text-slate-400">{formatCurrency(lastData.benchmarkValue)}</p></div>
              <div className={`rounded-xl p-4 border ${difference >= 0 ? 'bg-emerald-900/30 border-emerald-700' : 'bg-red-900/30 border-red-700'}`}><p className="text-slate-400 text-xs">{language === 'es' ? 'Diferencia' : 'Difference'}</p><p className={`text-xl font-bold ${difference >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{difference >= 0 ? '+' : ''}{formatCurrency(difference)}</p></div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-lg font-semibold mb-4">{language === 'es' ? 'Evolución de tu Inversión' : 'Investment Growth'}</h2>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={simulationData}>
                  <defs><linearGradient id="fundGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={fund.color} stopOpacity={0.3}/><stop offset="95%" stopColor={fund.color} stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} interval="preserveStartEnd" />
                  <YAxis stroke="#9CA3AF" fontSize={10} tickFormatter={(v) => `$${formatNumber(v/1000)}K`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }} 
                    formatter={(value, name) => {
                      const labels = {
                        totalContributed: language === 'es' ? 'Aportado' : 'Contributed',
                        benchmarkValue: fund.benchmark,
                        fundValue: selectedFund
                      };
                      return [formatCurrency(value), labels[name] || name];
                    }}
                    labelFormatter={(label) => <span style={{fontWeight: 'bold', fontSize: '14px'}}>{label}</span>}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="totalContributed" name={language === 'es' ? 'Aportado' : 'Contributed'} stroke="#475569" fill="transparent" strokeDasharray="5 5" />
                  <Area type="monotone" dataKey="benchmarkValue" name={fund.benchmark} stroke="#94A3B8" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="fundValue" name={selectedFund} stroke={fund.color} fill="url(#fundGrad)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Tabla de Rendimientos Comparativa */}
            <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700">
              <h2 className="text-lg font-semibold mb-4">📊 {language === 'es' ? 'Rentabilidad por Periodo' : 'Returns by Period'}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-3 px-4 text-slate-400">{language === 'es' ? 'Periodo' : 'Period'}</th>
                      <th className="text-right py-3 px-4" style={{ color: fund.color }}>{selectedFund}</th>
                      <th className="text-right py-3 px-4 text-slate-400">{fund.benchmark}</th>
                      <th className="text-right py-3 px-4 text-slate-400">{language === 'es' ? 'Diferencia' : 'Difference'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      // Calcular rendimientos del benchmark
                      const benchReturns = fund.returns.map(r => r.benchmark);
                      const bench_last_month = benchReturns[benchReturns.length - 1] || 0;
                      const bench_last_3m = benchReturns.slice(-3).reduce((acc, r) => (1 + acc) * (1 + r) - 1, 0);
                      const bench_last_12m = benchReturns.slice(-12).reduce((acc, r) => (1 + acc) * (1 + r) - 1, 0);
                      const bench_cumulative = benchReturns.reduce((acc, r) => (1 + acc) * (1 + r) - 1, 0);
                      const bench_annualized = Math.pow(1 + bench_cumulative, 12 / benchReturns.length) - 1;
                      
                      const rows = language === 'es' ? [
                        ['Rendimiento Anualizado', fund.annualized, bench_annualized],
                        ['Rendimiento Acumulado', fund.cumulative, bench_cumulative],
                        ['Último Mes', fund.last_month, bench_last_month],
                        ['LTM (Últimos 12 Meses)', fund.last_12m, bench_last_12m],
                        ['Últimos 3 Meses', fund.last_3m, bench_last_3m],
                        ['YTD (Año a la Fecha)', fund.ytd || fund.last_12m, fund.bench_ytd || bench_last_12m],
                      ] : [
                        ['Annualized Return', fund.annualized, bench_annualized],
                        ['Cumulative Return', fund.cumulative, bench_cumulative],
                        ['Last Month', fund.last_month, bench_last_month],
                        ['LTM (Last 12 Months)', fund.last_12m, bench_last_12m],
                        ['Last 3 Months', fund.last_3m, bench_last_3m],
                        ['YTD (Year to Date)', fund.ytd || fund.last_12m, fund.bench_ytd || bench_last_12m],
                      ];
                      
                      return rows.map(([label, fundVal, benchVal], idx) => {
                        const diff = fundVal - benchVal;
                        return (
                          <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                            <td className="py-3 px-4 text-slate-300">{label}</td>
                            <td className={`text-right py-3 px-4 font-medium ${fundVal >= 0 ? '' : 'text-red-400'}`} style={fundVal >= 0 ? { color: fund.color } : {}}>{formatPercentPlain(fundVal)}</td>
                            <td className="text-right py-3 px-4 text-slate-400">{formatPercentPlain(benchVal)}</td>
                            <td className={`text-right py-3 px-4 font-medium ${diff >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{formatPercent(diff)}</td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-4 text-center">{language === 'es' ? 'Creación del Portafolio' : 'Portfolio Inception'}: {fund.returns[0]?.month} • Track Record: {fund.n_months} {language === 'es' ? 'meses' : 'months'}</p>
            </div>
          </>
        )}

        {/* ==================== ANÁLISIS DE RETIRO ==================== */}
        {activeTab === 'retirement' && (
          <>
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-lg font-semibold mb-4 text-center">🏖️ {language === 'es' ? 'Configura tu Plan de Retiro' : 'Configure Your Retirement Plan'}</h2>
              <p className="text-center text-slate-400 text-sm mb-4">{language === 'es' ? 'Usando rendimiento anualizado de' : 'Using annualized return of'} {formatPercentPlain(fund.annualized)} ({selectedFund})</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(language === 'es' ? [['Tu edad actual', currentAge, setCurrentAge], ['Edad de retiro', retirementAge, setRetirementAge], ['Expectativa de vida', lifeExpectancy, setLifeExpectancy], ['Ahorro actual', currentSavings, setCurrentSavings], ['Ahorro mensual', monthlySavings, setMonthlySavings], ['Gasto mensual en retiro', monthlyRetirementExpense, setMonthlyRetirementExpense]] : [['Current age', currentAge, setCurrentAge], ['Retirement age', retirementAge, setRetirementAge], ['Life expectancy', lifeExpectancy, setLifeExpectancy], ['Current savings', currentSavings, setCurrentSavings], ['Monthly savings', monthlySavings, setMonthlySavings], ['Monthly expense in retirement', monthlyRetirementExpense, setMonthlyRetirementExpense]]).map(([label, value, setter], idx) => (
                  <div key={idx}>
                    <label className="block text-slate-400 mb-1 text-sm">{label}</label>
                    <input type="number" value={value} onChange={(e) => setter(Number(e.target.value) || 0)} className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-white" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"><p className="text-slate-400 text-xs">{language === 'es' ? 'Años hasta retiro' : 'Years to retirement'}</p><p className="text-2xl font-bold text-blue-400">{retirementAge - currentAge}</p></div>
              <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-700"><p className="text-slate-400 text-xs">{language === 'es' ? 'Capital al retirarte' : 'Capital at retirement'}</p><p className="text-2xl font-bold text-emerald-400">{formatCurrency(retirementProjection.balanceAtRetirement)}</p></div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-amber-700"><p className="text-slate-400 text-xs">{language === 'es' ? 'Retiro máximo sostenible' : 'Max sustainable withdrawal'}</p><p className="text-2xl font-bold text-amber-400">{formatCurrency(retirementProjection.maxMonthlyWithdrawal)}</p><p className="text-xs text-slate-500">/{language === 'es' ? 'mes' : 'mo'}</p></div>
              <div className={`rounded-xl p-4 border ${retirementProjection.canSustain ? 'bg-emerald-900/30 border-emerald-700' : 'bg-red-900/30 border-red-700'}`}><p className="text-slate-400 text-xs">{language === 'es' ? 'Estado' : 'Status'}</p><p className={`text-2xl font-bold ${retirementProjection.canSustain ? 'text-emerald-400' : 'text-red-400'}`}>{retirementProjection.canSustain ? (language === 'es' ? '✓ Viable' : '✓ Viable') : (language === 'es' ? '⚠ Ajustar' : '⚠ Adjust')}</p></div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-lg font-semibold mb-4">{language === 'es' ? 'Proyección de Patrimonio' : 'Wealth Projection'}</h2>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={fullRetirementData}>
                  <defs><linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9CA3AF" fontSize={10} />
                  <YAxis stroke="#9CA3AF" fontSize={10} tickFormatter={(v) => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${formatNumber(v/1000)}K`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }} formatter={(v) => [formatCurrency(v), language === 'es' ? 'Patrimonio' : 'Wealth']} labelFormatter={(l) => `${language === 'es' ? 'Edad' : 'Age'}: ${l}`} />
                  <ReferenceLine x={retirementAge} stroke="#F59E0B" strokeDasharray="5 5" />
                  <Area type="monotone" dataKey="balance" stroke="#10B981" fill="url(#retGrad)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Resumen detallado del Plan de Retiro */}
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-xl font-semibold mb-4">📋 {language === 'es' ? 'Resumen de tu Plan de Retiro' : 'Your Retirement Plan Summary'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-emerald-400 mb-3">{language === 'es' ? 'Fase de Acumulación' : 'Accumulation Phase'}</h3>
                  <div className="space-y-2 text-sm">
                    {(language === 'es' ? [['Ahorro inicial:', formatCurrency(currentSavings)], ['Aportación mensual:', formatCurrency(monthlySavings)], ['Años de ahorro:', `${retirementAge - currentAge} años`], ['Total aportado:', formatCurrency(retirementProjection.totalContributed)], ['Rendimiento anual usado:', formatPercentPlain(fund.annualized), 'text-emerald-400']] : [['Initial savings:', formatCurrency(currentSavings)], ['Monthly contribution:', formatCurrency(monthlySavings)], ['Years saving:', `${retirementAge - currentAge} years`], ['Total contributed:', formatCurrency(retirementProjection.totalContributed)], ['Annual return used:', formatPercentPlain(fund.annualized), 'text-emerald-400']]).map(([label, value, cls], idx) => (
                      <div key={idx} className="flex justify-between"><span className="text-slate-400">{label}</span><span className={cls || ''}>{value}</span></div>
                    ))}
                    <div className="flex justify-between border-t border-slate-600 pt-2 mt-2"><span className="text-slate-300 font-medium">{language === 'es' ? 'Capital al retiro:' : 'Capital at retirement:'}</span><span className="text-emerald-400 font-bold">{formatCurrency(retirementProjection.balanceAtRetirement)}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-amber-400 mb-3">{language === 'es' ? 'Fase de Retiro' : 'Retirement Phase'}</h3>
                  <div className="space-y-2 text-sm">
                    {(language === 'es' ? [['Edad de retiro:', `${retirementAge} años`], ['Retiro mensual deseado:', formatCurrency(monthlyRetirementExpense)], ['Años en retiro:', `${lifeExpectancy - retirementAge} años`], ['Retiro máximo sostenible:', `${formatCurrency(retirementProjection.maxMonthlyWithdrawal)}/mes`, 'text-amber-400'], ['Duración del capital:', retirementProjection.canSustain ? `Hasta los ${lifeExpectancy} años ✓` : `${retirementProjection.yearsUntilDepleted} años`, retirementProjection.canSustain ? 'text-emerald-400' : 'text-red-400']] : [['Retirement age:', `${retirementAge} years`], ['Desired monthly withdrawal:', formatCurrency(monthlyRetirementExpense)], ['Years in retirement:', `${lifeExpectancy - retirementAge} years`], ['Max sustainable withdrawal:', `${formatCurrency(retirementProjection.maxMonthlyWithdrawal)}/mo`, 'text-amber-400'], ['Capital duration:', retirementProjection.canSustain ? `Until age ${lifeExpectancy} ✓` : `${retirementProjection.yearsUntilDepleted} years`, retirementProjection.canSustain ? 'text-emerald-400' : 'text-red-400']]).map(([label, value, cls], idx) => (
                      <div key={idx} className="flex justify-between"><span className="text-slate-400">{label}</span><span className={cls || ''}>{value}</span></div>
                    ))}
                    <div className="flex justify-between border-t border-slate-600 pt-2 mt-2"><span className="text-slate-300 font-medium">{language === 'es' ? `Capital al final (${lifeExpectancy} años):` : `Capital at end (age ${lifeExpectancy}):`}</span><span className={`font-bold ${retirementProjection.canSustain ? 'text-emerald-400' : 'text-red-400'}`}>{formatCurrency(retirementProjection.finalBalance)}</span></div>
                  </div>
                </div>
              </div>
              {retirementProjection.canSustain ? (
                <div className="mt-6 p-4 bg-emerald-900/30 border border-emerald-700 rounded-lg">
                  <p className="text-emerald-400 font-medium">✓ {language === 'es' ? 'Tu plan es viable' : 'Your plan is viable'}</p>
                  <p className="text-slate-400 text-sm mt-2">{language === 'es' ? `Podrás retirarte a los ${retirementAge} años con un gasto mensual de ${formatCurrency(monthlyRetirementExpense)} y aún te quedarán ${formatCurrency(retirementProjection.finalBalance)} a los ${lifeExpectancy} años.` : `You can retire at age ${retirementAge} with monthly expenses of ${formatCurrency(monthlyRetirementExpense)} and still have ${formatCurrency(retirementProjection.finalBalance)} left at age ${lifeExpectancy}.`}</p>
                </div>
              ) : (
                <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
                  <p className="text-red-400 font-medium">⚠️ {language === 'es' ? 'Tu plan actual no es sostenible' : 'Your current plan is not sustainable'}</p>
                  <p className="text-slate-400 text-sm mt-2">{language === 'es' ? `Con un retiro de ${formatCurrency(monthlyRetirementExpense)} mensuales, tu capital se agotaría a los ${retirementAge + Math.floor(retirementProjection.yearsUntilDepleted)} años.` : `With a withdrawal of ${formatCurrency(monthlyRetirementExpense)} monthly, your capital would be depleted by age ${retirementAge + Math.floor(retirementProjection.yearsUntilDepleted)}.`}</p>
                  <p className="text-slate-400 text-sm mt-1"><strong>{language === 'es' ? 'Opciones:' : 'Options:'}</strong> {language === 'es' ? `Aumenta tu ahorro mensual, reduce el gasto en retiro a ${formatCurrency(retirementProjection.maxMonthlyWithdrawal)}, o retrasa tu edad de retiro.` : `Increase monthly savings, reduce retirement expense to ${formatCurrency(retirementProjection.maxMonthlyWithdrawal)}, or delay retirement age.`}</p>
                  <div className="mt-3 p-3 bg-amber-900/30 border border-amber-700 rounded-lg">
                    <p className="text-amber-400 text-sm font-medium">💡 {language === 'es' ? `Para lograr tu objetivo de ${formatCurrency(monthlyRetirementExpense)}/mes en retiro:` : `To achieve your goal of ${formatCurrency(monthlyRetirementExpense)}/month in retirement:`}</p>
                    <p className="text-slate-300 text-sm mt-1">{language === 'es' ? `Necesitas aportar` : `You need to contribute`} <strong className="text-amber-400">{formatCurrency(retirementProjection.requiredMonthlySavings)}</strong> {language === 'es' ? `mensuales (actualmente aportas ${formatCurrency(monthlySavings)}).` : `monthly (currently contributing ${formatCurrency(monthlySavings)}).`}</p>
                    <p className="text-slate-500 text-xs mt-1">{language === 'es' ? `Esto te permitiría acumular ${formatCurrency(retirementProjection.requiredBalanceAtRetirement)} al momento del retiro, suficiente para sostener tu gasto deseado hasta los ${lifeExpectancy} años.` : `This would allow you to accumulate ${formatCurrency(retirementProjection.requiredBalanceAtRetirement)} at retirement, enough to sustain your desired expense until age ${lifeExpectancy}.`}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ==================== GLOSARIO ==================== */}
        {activeTab === 'glossary' && (
          <>
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-center">📚 {language === 'es' ? 'Glosario de Términos' : 'Glossary of Terms'}</h2>
              <p className="text-slate-400 text-center text-sm mb-6">{language === 'es' ? 'Definiciones claras para entender mejor tu inversión' : 'Clear definitions to better understand your investment'}</p>
              
              {language === 'es' ? (
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
              ) : (
              /* ENGLISH GLOSSARY */
              <div className="space-y-4">
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">📈 Returns</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Cumulative Return</p>
                      <p className="text-slate-400 text-sm mt-1">Total gain or loss since portfolio inception. If it's 91%, it means $100,000 invested became $191,000.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Annualized Return</p>
                      <p className="text-slate-400 text-sm mt-1">Average return per year, considering compound interest. Allows comparison of investments with different time periods.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Last 3M / 6M / 12M</p>
                      <p className="text-slate-400 text-sm mt-1">Cumulative return in the last 3, 6, or 12 months. Shows recent portfolio performance.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Benchmark</p>
                      <p className="text-slate-400 text-sm mt-1">Reference index against which the portfolio is compared (e.g., IPC Mexico, S&P 500). Used to evaluate if the manager adds value.</p>
                    </div>
                  </div>
                </div>
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">⚠️ Risk Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Volatility (Std. Deviation)</p>
                      <p className="text-slate-400 text-sm mt-1">Measures how much returns vary. Higher volatility = more risk. 12% volatility means returns typically vary ±12% around the average.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Max Drawdown</p>
                      <p className="text-slate-400 text-sm mt-1">Maximum decline from peak to trough. A -10% drawdown means at the worst moment, the portfolio fell 10% from its high.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Beta</p>
                      <p className="text-slate-400 text-sm mt-1">Market sensitivity. Beta = 1 means it moves like the market. Beta = 0.6 means if market rises 10%, portfolio rises ~6%.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Correlation</p>
                      <p className="text-slate-400 text-sm mt-1">How related portfolio movements are to the market. Ranges from -1 to 1. Near 1 = move together. Near 0 = independent movements.</p>
                    </div>
                  </div>
                </div>
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">🎯 Market Capture</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg border-l-4 border-emerald-500">
                      <p className="font-medium text-white">Upside Capture</p>
                      <p className="text-slate-400 text-sm mt-1">What percentage of market gains the portfolio captures. <strong className="text-emerald-400">100% or more is excellent</strong> - means when market rises, portfolio rises equal or more.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg border-l-4 border-amber-500">
                      <p className="font-medium text-white">Downside Capture</p>
                      <p className="text-slate-400 text-sm mt-1">What percentage of market declines the portfolio suffers. <strong className="text-amber-400">Less than 70% is excellent</strong> - means protection when market falls.</p>
                    </div>
                  </div>
                </div>
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-semibold text-amber-400 mb-3">🏆 Risk-Adjusted Returns</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Alpha</p>
                      <p className="text-slate-400 text-sm mt-1">Extra return generated by the manager vs. benchmark. <strong className="text-emerald-400">Positive alpha = manager adds value.</strong></p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Sharpe Ratio</p>
                      <p className="text-slate-400 text-sm mt-1">Return obtained per unit of risk. <strong className="text-emerald-400">Above 1 is excellent</strong>, 0.5-1 is good, below 0.5 is average.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Win Rate</p>
                      <p className="text-slate-400 text-sm mt-1">Percentage of months with positive returns. 60% win rate means 6 out of 10 months the portfolio made money.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Track Record</p>
                      <p className="text-slate-400 text-sm mt-1">Portfolio return history. More months = more reliable statistics. Minimum 36 months recommended for solid conclusions.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-rose-400 mb-3">🧮 Simulator & Retirement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Compound Interest</p>
                      <p className="text-slate-400 text-sm mt-1">Gains generate more gains. The "snowball effect" that makes your investment grow exponentially over time.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Monthly Contributions</p>
                      <p className="text-slate-400 text-sm mt-1">Investing a fixed amount each month. This strategy (DCA) reduces the risk of buying everything at a bad time.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">Max Sustainable Withdrawal</p>
                      <p className="text-slate-400 text-sm mt-1">Maximum amount you can withdraw monthly without depleting your capital before your life expectancy.</p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="font-medium text-white">4% Rule</p>
                      <p className="text-slate-400 text-sm mt-1">General rule: you can withdraw ~4% annually from your retirement portfolio without depleting it in 30 years (assuming historical returns).</p>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-xs">
          <p>⚠️ {language === 'es' ? 'Los rendimientos pasados no garantizan rendimientos futuros. Esta simulación es solo ilustrativa.' : 'Past performance does not guarantee future returns. This simulation is for illustrative purposes only.'}</p>
          <p className="mt-2">© 2025 LEMA Capital Asset Management</p>
        </div>
      </div>
    </div>
  );
}
