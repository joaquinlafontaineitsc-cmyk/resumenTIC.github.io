    // --- UTILITY FUNCTIONS ---

        // Label Wrapping Function (16 chars max per line)
        function wrapLabel(label) {
            if (label.length <= 16) return label;
            const words = label.split(' ');
            const lines = [];
            let currentLine = words[0];

            for (let i = 1; i < words.length; i++) {
                if (currentLine.length + 1 + words[i].length <= 16) {
                    currentLine += ' ' + words[i];
                } else {
                    lines.push(currentLine);
                    currentLine = words[i];
                }
            }
            lines.push(currentLine);
            return lines;
        }

        // Common Tooltip Config
        const commonTooltipConfig = {
            callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    if (Array.isArray(label)) {
                        return label.join(' ');
                    } else {
                        return label;
                    }
                }
            }
        };

        // Month Mapper
        const monthMap = {
            1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
            7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic'
        };

        // --- CHART CONFIGURATIONS ---

        // 1. HERO CHART (Pie - Project Types)
        const ctxHero = document.getElementById('heroChart').getContext('2d');
        new Chart(ctxHero, {
            type: 'doughnut',
            data: {
                labels: ['Infraestructura', 'Desarrollo SW', 'Seguridad'],
                datasets: [{
                    data: [45, 35, 20], // Estimated weight based on Gantt count
                    backgroundColor: ['#4338ca', '#06b6d4', '#f59e0b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: commonTooltipConfig
                }
            }
        });

        // 2. GANTT CHART (Horizontal Bar)
        // Data derived from "proyectos_gantt.md"
        const ganttData = [
            // Infraestructura
            { label: 'Veeam Backup & Replication', start: 1, end: 1.9, type: 'Infra' }, // NEW: Enero
            { label: 'Licencias Adobe CC', start: 1, end: 1.9, type: 'Infra' },
            { label: 'Renovación Office 365', start: 7, end: 7.9, type: 'Infra' },
            { label: 'Power BI', start: 7, end: 7.9, type: 'Infra' },
            { label: 'Soft. Especializado', start: 8, end: 11, type: 'Infra' },
            { label: 'Compra Computadoras', start: 3, end: 7, type: 'Infra' },
            { label: 'Impresoras', start: 3, end: 4, type: 'Infra' },
            { label: 'UPS Trifásicos', start: 3, end: 8, type: 'Infra' }, // Purchase to install
            { label: 'Pantallas (Compra)', start: 5, end: 7, type: 'Infra' },
            { label: 'Pantallas (Instalación)', start: 10, end: 11, type: 'Infra' },
            { label: 'Reestruct. Red y Seguridad', start: 9, end: 11.9, type: 'Infra' }, // NEW: Licitacion Sep-Nov
            
            // Desarrollos
            { label: 'Portal Web Principal', start: 1, end: 2, type: 'Dev' },
            { label: 'Dashboard Estudiantes', start: 1, end: 1.9, type: 'Dev' },
            { label: 'InfraMap', start: 1, end: 1.9, type: 'Dev' },
            { label: 'Recepción Docs', start: 1, end: 1.9, type: 'Dev' },
            { label: 'Plataforma Pago SIRITE', start: 2, end: 10, type: 'Dev' }, // NEW: Feb-Oct
            { label: 'Plug-in Transparencia', start: 3, end: 3.9, type: 'Dev' },
            { label: 'Mapa Origen Est.', start: 4, end: 4.9, type: 'Dev' },
            { label: 'Gestión Inventario', start: 5, end: 5.9, type: 'Dev' },
            { label: 'Académusoft (U. Pamplona)', start: 6, end: 8, type: 'Dev' }, // NEW: Jun-Aug
            { label: 'Ejecución Presup.', start: 6, end: 6.9, type: 'Dev' },
            { label: 'Hub Pagos Banreservas', start: 1, end: 11.9, type: 'Dev' }, // NEW: Ene-Nov
            { label: 'Intranet Admin', start: 8, end: 8.9, type: 'Dev' },
            { label: 'Carrusel Multi.', start: 8, end: 8.9, type: 'Dev' },
            { label: 'Reserva Auditorio', start: 9, end: 9.9, type: 'Dev' },
            { label: 'LabMap', start: 9, end: 9.9, type: 'Dev' },
            { label: 'Kiosko Preguntas', start: 10, end: 10.9, type: 'Dev' },
            { label: 'ITSC SALUD', start: 12, end: 12.9, type: 'Dev' },
            { label: 'Sistema Eval. Desempeño', start: 1, end: 12, type: 'Dev' },

            // Seguridad
            { label: 'Video Vigilancia', start: 6, end: 11, type: 'Sec' }, // June to November start
            { label: 'Firma Digital', start: 6, end: 11, type: 'Sec' }, // June to November deploy
            { label: 'Control Biométrico', start: 8, end: 8.9, type: 'Sec' }, // Agosto
            { label: 'NORTIC A2', start: 11, end: 11.9, type: 'Sec' } // Noviembre
        ];

        const ganttLabels = ganttData.map(d => wrapLabel(d.label));
        const ganttFloatingData = ganttData.map(d => [d.start, d.end]);
        const ganttColors = ganttData.map(d => {
            if(d.type === 'Infra') return '#4338ca'; // Indigo
            if(d.type === 'Dev') return '#06b6d4'; // Cyan
            return '#f59e0b'; // Amber
        });

        const ctxGantt = document.getElementById('ganttChart').getContext('2d');
        new Chart(ctxGantt, {
            type: 'bar',
            data: {
                labels: ganttLabels,
                datasets: [{
                    label: 'Duración del Proyecto',
                    data: ganttFloatingData,
                    backgroundColor: ganttColors,
                    borderRadius: 4,
                    barPercentage: 0.6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        min: 1,
                        max: 12,
                        grid: { color: '#e2e8f0' },
                        ticks: {
                            callback: function(value) {
                                return monthMap[value] || '';
                            }
                        }
                    },
                    y: {
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: commonTooltipConfig
                }
            }
        });

        // 3. LAB COMPUTERS CHART
        const labDataRaw = [
           { label: 'Diseño Gráfico 3', value: 27 },
            { label: 'Manufactura', value: 26 },
            { label: 'Fotografía', value: 23 },
            { label: 'Informática 1', value: 21 },
            { label: 'Informática 2', value: 21 },
            { label: 'Informática 3', value: 21 },
            { label: 'Redes', value: 21 },
            { label: 'Gaming', value: 21 },
            { label: 'Diseño Gráfico 1', value: 21 },
            { label: 'Industria del mueble', value: 17 },
            { label: 'Máquinas', value: 16 },
            { label: 'Electricidad', value: 6 } // New entry with 6 new computers
        ];
        
        const labLabels = labDataRaw.map(d => wrapLabel(d.label));
        const labValues = labDataRaw.map(d => d.value);

        const ctxLab = document.getElementById('labComputersChart').getContext('2d');
        new Chart(ctxLab, {
            type: 'bar',
            data: {
                labels: labLabels,
                datasets: [{
                    label: 'Nuevas Computadoras',
                    data: labValues,
                    backgroundColor: '#4338ca',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                },
                plugins: {
                    tooltip: commonTooltipConfig,
                    legend: { display: false }
                }
            }
        });

        // 4. SCREENS STATUS (Doughnut)
        const ctxScreensStatus = document.getElementById('screensStatusChart').getContext('2d');
        new Chart(ctxScreensStatus, {
            type: 'doughnut',
            data: {
                labels: ['Instaladas (Fase 1)', 'Pendientes (Fase 2 - 2026)'],
                datasets: [{
                    data: [50, 50],
                    backgroundColor: ['#10b981', '#cbd5e1'], // Emerald vs Slate 300
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: commonTooltipConfig,
                    legend: { position: 'bottom' }
                }
            }
        });

        // 5. SCREENS BY BUILDING (Bar)
        // Data from PDF Page 4
        const buildingData = [
 { label: 'Edificio A', value: 10 },
            { label: 'Edificio B', value: 7 },
            { label: 'Edificio D', value: 7 },
            { label: 'Edificio E', value: 3 },
            { label: 'Edificio G2', value: 8 },
            { label: 'Edificio G1', value: 1 },
            { label: 'Edificio H', value: 1 },
            { label: 'Edificio I', value: 2 },
            { label: 'Edificio J', value: 3 },
            { label: 'Edificio K', value: 6 },
            { label: 'Edificio M', value: 2 }
        ];

        const ctxScreenBuild = document.getElementById('screensBuildingChart').getContext('2d');
        new Chart(ctxScreenBuild, {
            type: 'bar',
            data: {
                labels: buildingData.map(d => d.label),
                datasets: [{
                    label: 'Pantallas Instaladas',
                    data: buildingData.map(d => d.value),
                    backgroundColor: '#06b6d4', // Cyan
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                },
                plugins: {
                    tooltip: commonTooltipConfig,
                    legend: { display: false }
                }
            }
        });
