document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired: main.js started'); // Log 1

    // --- DOM Elements ---
    const chartContainer = document.getElementById('chart-container');
    const curriculumList = document.getElementById('curriculum-list');
    const lessonTitle = document.getElementById('lesson-title');
    const lessonDescription = document.getElementById('lesson-description');

    if (!chartContainer) {
        console.error('Error: chart-container element not found!');
        return;
    }
    if (!curriculumList) {
        console.error('Error: curriculum-list element not found!');
        return;
    }
    if (!lessonTitle) {
        console.error('Error: lesson-title element not found!');
        return;
    }
    if (!lessonDescription) {
        console.error('Error: lesson-description element not found!');
        return;
    }


    let chart;
    let candlestickSeries;

    try {
        console.log('Attempting to create Lightweight Chart...'); // Log 2
        const chartOptions = {
            layout: {
                background: { color: '#131722' },
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { color: '#363a45' },
                horzLines: { color: '#363a45' },
            },
            timeScale: {
                borderColor: '#363a45',
            },
        };
        chart = LightweightCharts.createChart(chartContainer, chartOptions);
        candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderDownColor: '#ef5350',
            borderUpColor: '#26a69a',
            wickDownColor: '#ef5350',
            wickUpColor: '#26a69a',
        });
        console.log('Lightweight Chart created successfully.'); // Log 3
    } catch (error) {
        console.error('Error initializing Lightweight Chart:', error);
        console.error('lightweight-charts.standalone.production.js가 올바르게 로드되었는지 확인하세요.');
        return; // Stop further execution if chart fails to initialize
    }

    // Helper function to generate some simple candlestick data
    function generateSimpleCandleData(startDate, count, basePrice, priceRange, volatility) {
        const data = [];
        let currentDate = new Date(startDate);
        let lastClose = basePrice;

        for (let i = 0; i < count; i++) {
            const open = lastClose + (Math.random() - 0.5) * volatility;
            const close = open + (Math.random() - 0.5) * priceRange;
            const high = Math.max(open, close) + Math.random() * volatility;
            const low = Math.min(open, close) - Math.random() * volatility;

            data.push({
                time: currentDate.toISOString().slice(0, 10),
                open: parseFloat(open.toFixed(2)),
                high: parseFloat(high.toFixed(2)),
                low: parseFloat(low.toFixed(2)),
                close: parseFloat(close.toFixed(2)),
            });

            currentDate.setDate(currentDate.getDate() + 1);
            lastClose = close;
        }
        return data;
    }

    // --- Curriculum Data ---
    const curriculum = [
        // 1단계: 시장의 본질과 기초 (Foundation)
        {
            id: 'step1-foundation-intro',
            title: '1단계: 시장의 본질과 기초 (Foundation)',
            description: '차트를 보기 전, 가격이 움직이는 원리와 환경을 이해하는 단계입니다.',
            data: generateSimpleCandleData('2023-01-01', 5, 100, 10, 5) // General price movement
        },
        {
            id: 'step1-candlestick-anatomy',
            title: '캔들의 해부학',
            description: '시가, 고가, 저가, 종가의 의미와 캔들 몸통/꼬리가 나타내는 매수·매도세의 심리.',
            data: [
                { time: '2023-01-01', open: 100, high: 105, low: 98, close: 103 }, // Bullish candle
                { time: '2023-01-02', open: 103, high: 107, low: 101, close: 101 }, // Bearish candle with upper wick
                { time: '2023-01-03', open: 101, high: 104, low: 99, close: 102 }, // Small body, long wicks
                { time: '2023-01-04', open: 102, high: 103, low: 97, close: 99 },
                { time: '2023-01-05', open: 99, high: 101, low: 96, close: 100 },
            ]
        },
        {
            id: 'step1-chart-types',
            title: '차트의 종류',
            description: '봉 차트(Candlestick), 선 차트(Line), 로그 차트 vs 일반 차트의 차이와 활용법.',
            data: generateSimpleCandleData('2023-01-01', 10, 100, 10, 5) // General price movement
        },
        {
            id: 'step1-volume',
            title: '거래량(Volume)의 이해',
            description: '가격 변동의 신뢰도를 확인하는 가장 중요한 지표.',
            data: generateSimpleCandleData('2023-01-01', 10, 100, 10, 5) // General price movement, volume not directly shown on LW-Charts without custom series
        },
        {
            id: 'step1-dow-theory',
            title: '다우 이론(Dow Theory)',
            description: '추세의 시작과 끝을 정의하는 기술적 분석의 근간.',
            data: generateSimpleCandleData('2023-01-01', 15, 90, 20, 10) // Illustrating a trend
        },
        {
            id: 'step1-fractal-structure',
            title: '프랙탈 구조',
            description: '상위 프레임(주봉/일봉)과 하위 프레임(시간봉/분봉)의 유기적 관계.',
            data: generateSimpleCandleData('2023-01-01', 20, 100, 15, 8) // General price movement
        },

        // 2단계: 구조적 분석 (Market Structure)
        {
            id: 'step2-market-structure-intro',
            title: '2단계: 구조적 분석 (Market Structure)',
            description: '지지와 저항, 그리고 추세를 통해 시장의 지도를 그리는 단계입니다.',
            data: generateSimpleCandleData('2023-02-01', 5, 110, 10, 5)
        },
        {
            id: 'step2-support-resistance',
            title: '지지와 저항 (S/R)',
            description: '수평 매물대, 의미 있는 가격대(Round Number), 지저 전환(Flip) 원리.',
            data: [
                { time: '2023-02-01', open: 100, high: 105, low: 98, close: 103 },
                { time: '2023-02-02', open: 103, high: 104, low: 100, close: 101 },
                { time: '2023-02-03', open: 101, high: 102, low: 99, close: 100 }, // Support around 100
                { time: '2023-02-04', open: 100, high: 105, low: 99, close: 104 },
                { time: '2023-02-05', open: 104, high: 107, low: 103, close: 106 }, // Resistance around 106
                { time: '2023-02-06', open: 106, high: 108, low: 105, close: 107 },
                { time: '2023-02-07', open: 107, high: 110, low: 106, close: 109 },
                { time: '2023-02-08', open: 109, high: 110, low: 107, close: 108 },
                { time: '2023-02-09', open: 108, high: 112, low: 107, close: 111 }, // Break through resistance
                { time: '2023-02-10', open: 111, high: 112, low: 109, close: 110 }, // Old resistance becomes new support
            ]
        },
        {
            id: 'step2-trendlines-channels',
            title: '추세선과 채널',
            description: '올바른 추세선 작도법, 가속 추세선과 추세 이탈의 신호.',
            data: generateSimpleCandleData('2023-02-01', 15, 100, 15, 7) // Illustrating a trend
        },
        {
            id: 'step2-moving-averages',
            title: '이동평균선 (MA/EMA)',
            description: '정배열과 역배열, 골든/데드크로스, 이평선 이격도를 활용한 회귀 본능.',
            data: generateSimpleCandleData('2023-02-01', 20, 100, 10, 5) // Placeholder for MA concepts
        },
        {
            id: 'step2-trend-reversal-continuation',
            title: '추세의 반전과 지속',
            description: '고점과 저점의 갱신 여부를 통한 추세 판단 (HH, HL, LH, LL).',
            data: [
                { time: '2023-02-01', open: 100, high: 105, low: 98, close: 103 }, // HL, HH
                { time: '2023-02-02', open: 103, high: 107, low: 102, close: 105 },
                { time: '2023-02-03', open: 105, high: 109, low: 104, close: 108 },
                { time: '2023-02-04', open: 108, high: 110, low: 106, close: 107 }, // Lower High
                { time: '2023-02-05', open: 107, high: 108, low: 102, close: 103 }, // Lower Low
                { time: '2023-02-06', open: 103, high: 104, low: 99, close: 100 },
            ]
        },

        // 3단계: 패턴 분석 및 보조지표 (Technical Tools)
        {
            id: 'step3-technical-tools-intro',
            title: '3단계: 패턴 분석 및 보조지표 (Technical Tools)',
            description: '반복되는 형상을 포착하고 수학적 도구로 확률을 보정하는 단계입니다.',
            data: generateSimpleCandleData('2023-03-01', 5, 120, 10, 5)
        },
        {
            id: 'step3-chart-patterns-reversal',
            title: '차트 패턴: 반전형',
            description: '헤드앤숄더, 더블 탑/바텀, 쐐기형(Wedge).',
            data: [ // Simplified Double Top pattern
                { time: '2023-03-01', open: 100, high: 105, low: 98, close: 103 },
                { time: '2023-03-02', open: 103, high: 107, low: 102, close: 106 },
                { time: '2023-03-03', open: 106, high: 110, low: 105, close: 108 }, // First Top
                { time: '2023-03-04', open: 108, high: 109, low: 103, close: 104 },
                { time: '2023-03-05', open: 104, high: 107, low: 102, close: 106 },
                { time: '2023-03-06', open: 106, high: 110, low: 105, close: 108.5 }, // Second Top (similar height)
                { time: '2023-03-07', open: 108.5, high: 109, low: 100, close: 101 },
                { time: '2023-03-08', open: 101, high: 102, low: 97, close: 98 },
            ]
        },
        {
            id: 'step3-chart-patterns-continuation',
            title: '차트 패턴: 지속형',
            description: '깃발형(Flag), 삼각수렴(Triangle)의 종류와 분출 방향.',
            data: [ // Simplified Flag pattern
                { time: '2023-03-01', open: 100, high: 105, low: 99, close: 104 }, // Pole
                { time: '2023-03-02', open: 104, high: 108, low: 103, close: 107 },
                { time: '2023-03-03', open: 107, high: 109, low: 106, close: 108 },
                { time: '2023-03-04', open: 108, high: 108.5, low: 106.5, close: 107.5 }, // Flag consolidation
                { time: '2023-03-05', open: 107.5, high: 108.0, low: 106.0, close: 106.5 },
                { time: '2023-03-06', open: 106.5, high: 107.0, low: 105.0, close: 106.0 },
                { time: '2023-03-07', open: 106.0, high: 112, low: 105, close: 111 }, // Breakout
                { time: '2023-03-08', open: 111, high: 114, low: 110, close: 113 },
            ]
        },
        {
            id: 'step3-oscillator-rsi',
            title: '오실레이터 활용: RSI',
            description: '과매수/과매도 구간 및 다이버전스(Divergence) 심화 학습.',
            data: generateSimpleCandleData('2023-03-01', 10, 100, 10, 5) // Placeholder
        },
        {
            id: 'step3-oscillator-macd',
            title: '오실레이터 활용: MACD',
            description: '추세의 강도와 모멘텀 변화 포착.',
            data: generateSimpleCandleData('2023-03-01', 10, 100, 10, 5) // Placeholder
        },
        {
            id: 'step3-fibonacci',
            title: '피보나치 되돌림 (Fibonacci Retracement)',
            description: '황금 비율을 이용한 조정폭 예측 및 타점 선정.',
            data: [ // Illustrating a retracement
                { time: '2023-03-01', open: 100, high: 105, low: 98, close: 103 },
                { time: '2023-03-02', open: 103, high: 107, low: 102, close: 106 },
                { time: '2023-03-03', open: 106, high: 110, low: 105, close: 109 },
                { time: '2023-03-04', open: 109, high: 112, low: 108, close: 111 }, // Peak
                { time: '2023-03-05', open: 111, high: 110, low: 106, close: 107 }, // Retracement start
                { time: '2023-03-06', open: 107, high: 108, low: 104, close: 105 },
                { time: '2023-03-07', open: 105, high: 106, low: 103, close: 104 }, // Potential Fib level
                { time: '2023-03-08', open: 104, high: 108, low: 103, close: 107 }, // Bounce
            ]
        },

        // 4단계: 심화 이론 (Advanced Concepts)
        {
            id: 'step4-advanced-concepts-intro',
            title: '4단계: 심화 이론 (Advanced Concepts)',
            description: '단순한 기법을 넘어 시장의 메커니즘을 깊게 파고드는 단계입니다.',
            data: generateSimpleCandleData('2023-04-01', 5, 130, 10, 5)
        },
        {
            id: 'step4-elliott-wave',
            title: '엘리어트 파동 이론',
            description: '파동의 기본 법칙과 각 파동별 특징 (절단, 연장 파동 포함).',
            data: generateSimpleCandleData('2023-04-01', 20, 100, 15, 7) // Placeholder for complex waves
        },
        {
            id: 'step4-ichimoku',
            title: '일목균형표',
            description: '구름대를 활용한 지지/저항 및 시간론적 접근.',
            data: generateSimpleCandleData('2023-04-01', 15, 100, 10, 5) // Placeholder
        },
        {
            id: 'step4-smc',
            title: '스마트 머니 컨셉 (SMC)',
            description: '유동성(Liquidity), 오더블록(Order Block), 불균형(Imbalance) 구간 분석.',
            data: generateSimpleCandleData('2023-04-01', 10, 100, 10, 5) // Placeholder
        },
        {
            id: 'step4-wyckoff',
            title: '와이코프 이론 (Wyckoff)',
            description: '매집과 분산의 과정을 통해 세력의 움직임 읽기.',
            data: generateSimpleCandleData('2023-04-01', 20, 90, 20, 10) // Placeholder
        },

        // 5단계: 리스크 관리와 전략 수립 (Risk Management)
        {
            id: 'step5-risk-management-intro',
            title: '5단계: 리스크 관리와 전략 수립 (Risk Management)',
            description: '돈을 버는 것보다 잃지 않는 법을 배우는 가장 중요한 단계입니다.',
            data: generateSimpleCandleData('2023-05-01', 5, 140, 10, 5)
        },
        {
            id: 'step5-money-management',
            title: '자금 관리의 수학',
            description: '손익비(Risk-Reward Ratio) 계산법, 승률과 기댓값의 이해.',
            data: generateSimpleCandleData('2023-05-01', 10, 100, 10, 5) // Placeholder
        },
        {
            id: 'step5-position-sizing',
            title: '포지션 사이징',
            description: '계좌 대비 적정 진입 비중 결정 (켈리 공식 등).',
            data: generateSimpleCandleData('2023-05-01', 10, 100, 10, 5) // Placeholder
        },
        {
            id: 'step5-stoploss',
            title: '손절(Stop-loss)의 기술',
            description: '구조적 손절가 잡기와 트레일링 스톱 활용법.',
            data: generateSimpleCandleData('2023-05-01', 10, 100, 10, 5) // Placeholder
        },
        {
            id: 'step5-trading-journal',
            title: '매매 일지 작성법',
            description: '감정을 배제하고 통계적으로 접근하는 법 (복기 프로세스).',
            data: generateSimpleCandleData('2023-05-01', 10, 100, 10, 5) // Placeholder
        },

        // 6단계: 실전 트레이딩 및 심리 (Execution & Psychology)
        {
            id: 'step6-execution-psychology-intro',
            title: '6단계: 실전 트레이딩 및 심리 (Execution & Psychology)',
            description: '이론을 실전에 적용하며 발생하는 심리적 변수를 통제하는 단계입니다.',
            data: generateSimpleCandleData('2023-06-01', 5, 150, 10, 5)
        },
        {
            id: 'step6-backtesting',
            title: '백테스팅(Backtesting)',
            description: '과거 차트를 통한 전략의 유효성 검증 방법.',
            data: generateSimpleCandleData('2023-06-01', 10, 100, 10, 5) // Placeholder
        },
        {
            id: 'step6-trading-sessions',
            title: '거래 시간대별 특성',
            description: '아시아, 유럽, 뉴욕 세션별 변동성 이해.',
            data: generateSimpleCandleData('2023-06-01', 10, 100, 10, 5) // Placeholder
        },
        {
            id: 'step6-fomo-control',
            title: '뇌동매매 제어',
            description: 'FOMO(고립 공포감)와 복수 매매를 방지하는 마인드셋.',
            data: generateSimpleCandleData('2023-06-01', 10, 100, 10, 5) // Placeholder
        },
        {
            id: 'step6-routine-building',
            title: '루틴 만들기',
            description: '시장 분석 - 시나리오 설정 - 진입 - 대응 - 복기로 이어지는 사이클.',
            data: generateSimpleCandleData('2023-06-01', 10, 100, 10, 5) // Placeholder
        },
    ];

    // --- Functions ---
    function loadLesson(lessonId) {
        // Find lesson
        const lesson = curriculum.find(l => l.id === lessonId);
        if (!lesson) {
            console.warn(`Lesson with ID ${lessonId} not found.`);
            return;
        }

        // Update chart
        candlestickSeries.setData(lesson.data);
        chart.timeScale().fitContent();

        // Update details panel
        lessonTitle.textContent = lesson.title;
        lessonDescription.textContent = lesson.description;

        // Update active class in curriculum list
        document.querySelectorAll('#curriculum-list li').forEach(li => {
            li.classList.toggle('active', li.dataset.id === lessonId);
        });
    }

    function populateCurriculum() {
        curriculum.forEach(lesson => {
            const li = document.createElement('li');
            li.textContent = lesson.title;
            li.dataset.id = lesson.id;
            li.addEventListener('click', () => loadLesson(lesson.id));
            curriculumList.appendChild(li);
        });
    }

    // --- Initial Load & Event Listeners ---
    console.log('Before populateCurriculum and initial load.'); // Log 4
    populateCurriculum();
    console.log('Curriculum populated.'); // Log 5

    if (curriculum.length > 0) {
        loadLesson(curriculum[0].id); // Load the first lesson by default
        console.log('First lesson loaded.'); // Log 6
    } else {
        console.log('Curriculum is empty.');
    }

    // Handle window resizing
    new ResizeObserver(entries => {
        if (entries.length > 0) {
            const { width, height } = entries[0].contentRect;
            chart.resize(width, height);
        }
    }).observe(chartContainer);

    console.log('main.js finished execution.'); // Log 7
});