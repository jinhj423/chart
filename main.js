document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired: main.js started'); // Log 1

    // --- DOM Elements ---
    const chartContainer = document.getElementById('chart-container');
    const curriculumList = document.getElementById('curriculum-list');
    const lessonTitle = document.getElementById('lesson-title');
    const lessonDescription = document.getElementById('lesson-description');

    // --- Early checks for critical DOM elements needed for initial rendering ---
    if (!curriculumList) {
        console.error('Error: curriculum-list element not found! Cannot populate curriculum. Script will stop.');
        return; // This element is critical for the curriculum list, stop if not found.
    }
    // Other elements (chartContainer, lessonTitle, lessonDescription) are less critical for initial display of curriculum list
    // and will be checked again later for chart/details updates.

    // Helper function to generate some simple candlestick data
    function generateSimpleCandleData(startDate, count, basePrice, priceRange, volatility) {
        const data = [];
        let currentDate = new Date(startDate);
        let lastClose = basePrice;

        for (let i = 0; i < count; i++) {
            const open = lastClose + (Math.random() - 0.5) * volatility;
            const close = open + (Math.random() - 0.5) * priceRange;
            const high = Math.max(open, close, open + Math.random() * volatility); // Ensure high is at least open/close
            const low = Math.min(open, close, open - Math.random() * volatility); // Ensure low is at most open/close

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

    // --- Curriculum Data (Hierarchical Structure with user-provided content) ---
    const curriculum = [
        {
            id: 'step1-foundation',
            title: '1단계: 시장의 본질과 기초 (Market Foundation)',
            type: 'step',
            description: '목표: 차트가 단순한 그림이 아니라 \'심리의 기록\'임을 이해시키기.',
            lessons: [
                {
                    id: 'step1-1-candlestick-secret',
                    title: '1.1 캔들의 해부학과 매매 심리',
                    description: `
                        <p><strong>개요:</strong> 차트의 가장 작은 단위인 캔들을 통해 매수세와 매도세의 싸움을 읽어내는 법을 배웁니다.</p>
                        <h3>캔들의 4요소:</h3>
                        <ul>
                            <li><strong>시가 (Open):</strong> 해당 시간대 시작 가격</li>
                            <li><strong>종가 (Close):</strong> 해당 시간대 종료 가격 (심리적 합의점)</li>
                            <li><strong>고가 (High):</strong> 매수세가 도달한 최고점 (탐욕의 끝)</li>
                            <li><strong>저가 (Low):</strong> 매도세가 도달한 최저점 (공포의 끝)</li>
                        </ul>
                        <h3>몸통(Body) vs 꼬리(Wick):</h3>
                        <ul>
                            <li><strong>긴 몸통:</strong> 한쪽 세력이 시장을 완전히 장악했음을 의미.</li>
                            <li><strong>긴 꼬리:</strong> 특정 가격대에서 강력한 반대 세력이 등장하여 가격을 '거절(Rejection)'했음을 의미.</li>
                        </ul>
                        <p><strong>핵심 원리:</strong> 종가가 고가 근처에서 마감되면 매수세가 강력한 것이고, 중간에 마감되면 불확실성(Doji)을 의미합니다.</p>
                    `,
                    data: generateSimpleCandleData('2023-01-01', 10, 100, 10, 5)
                },
                {
                    id: 'step1-2-chart-environment', // Renamed ID
                    title: '1.2 차트 환경 설정: 로그(Log)와 일반(Linear)', // Renamed Title
                    description: `
                        <p><strong>개요:</strong> 특히 변동성이 큰 자산(비트코인 등)을 분석할 때 반드시 알아야 할 시각적 기준입니다.</p>
                        <h3>일반 차트 (Linear):</h3>
                        <ul>
                            <li>가격의 절대적인 수치 변화를 보여줍니다.</li>
                            <li>단기 단타 매매에 적합합니다.</li>
                        </ul>
                        <h3>로그 차트 (Log):</h3>
                        <ul>
                            <li>가격의 <strong>'상승률(%)'</strong>을 기준으로 보여줍니다.</li>
                            <li>예: 1,000원에서 2,000원(100% 상승)과 10,000원에서 11,000원(10% 상승)의 간격을 다르게 표시.</li>
                        </ul>
                        <p><strong>왜 로그 차트인가?</strong> 장기 추세선을 그을 때 로그 차트를 쓰지 않으면 각도가 왜곡되어 잘못된 지지/저항을 잡게 됩니다.</p>
                    `,
                    data: generateSimpleCandleData('2023-01-01', 10, 105, 12, 6)
                },
                {
                    id: 'step1-3-volume-fuel', // Renamed ID
                    title: '1.3 거래량(Volume): 가격의 연료', // Renamed Title
                    description: `
                        <p><strong>개요:</strong> 가격 변동이 \'진짜\'인지 \'가짜\'인지를 판별하는 유일한 보조 데이터입니다.</p>
                        <ul>
                            <li><strong>확인(Confirmation):</strong> 가격이 오를 때 거래량이 동반되어야 그 상승은 신뢰할 수 있습니다.</li>
                            <li><strong>다이버전스(Divergence):</strong> 가격은 오르는데 거래량이 줄어든다면, 이는 세력의 이탈이나 동력 부족으로 곧 하락할 수 있다는 신호입니다.</li>
                            <li><strong>클라이맥스(Climax):</strong> 역대급 거래량이 터지며 긴 꼬리가 달릴 때, 그것은 추세의 끝(항복 또는 매집 완료)일 확률이 매우 높습니다.</li>
                        </ul>
                    `,
                    data: generateSimpleCandleData('2023-01-01', 10, 110, 8, 4)
                },
                {
                    id: 'step1-4-dow-theory-practice',
                    title: '1.4 다우 이론 (Dow Theory)',
                    description: `
                        <p><strong>개요:</strong> 100년 넘게 검증된 기술적 분석의 바이블입니다.</p>
                        <h3>추세의 정의:</h3>
                        <ul>
                            <li><strong>상승 추세:</strong> 저점이 높아지고(HL), 고점이 높아지는(HH) 상태.</li>
                            <li><strong>하락 추세:</strong> 고점이 낮아지고(LH), 저점이 낮아지는(LL) 상태.</li>
                        </ul>
                        <h3>추세의 3단계:</h3>
                        <ul>
                            <li><strong>매집 단계 (Accumulation):</strong> 스마트 머니가 조용히 사는 시기.</li>
                            <li><strong>공동 참여 단계 (Public Participation):</strong> 추세가 확인되어 대중이 붙는 시기 (가장 긴 상승).</li>
                            <li><strong>과열/분산 단계 (Excess/Distribution):</strong> 세력이 물량을 넘기고 개미들이 환희에 찬 시기.</li>
                        </ul>
                    `,
                    data: generateSimpleCandleData('2023-01-01', 15, 90, 20, 10) // Illustrating a trend change
                },
                {
                    id: 'step1-5-fractal-mtf', // Renamed ID
                    title: '1.5 프랙탈(Fractal)과 다중 타임프레임', // Renamed Title
                    description: `
                        <p><strong>개요:</strong> 차트는 큰 그림 속에 작은 그림이 반복되는 구조입니다.</p>
                        <h3>프랙탈 구조:</h3>
                        <ul>
                            <li>1일봉의 큰 캔들 하나 안에는 24개의 1시간봉이 있고, 그 안에는 다시 수많은 분봉이 존재합니다.</li>
                        </ul>
                        <h3>상위 프레임 우선의 원칙:</h3>
                        <ul>
                            <li>15분봉이 상승장이어도 일봉이 하락장이면, 결국 가격은 일봉의 흐름을 따라 하락할 확률이 높습니다.</li>
                        </ul>
                        <h3>실전 적용:</h3>
                        <ul>
                            <li><strong>거시(큰 그림):</strong> 일봉/4시간봉으로 '길(추세)'을 찾는다.</li>
                            <li><strong>미시(타점):</strong> 15분봉/5분봉으로 '진입로(타점)'를 찾는다.</li>
                        </ul>
                    `,
                    data: generateSimpleCandleData('2023-01-01', 20, 100, 15, 8)
                },
            ]
        },
        {
            id: 'step2-market-structure',
            title: '2단계: 구조적 분석 (Market Structure)',
            type: 'step',
            description: '목표: 시장의 큰 흐름을 읽고 \'유리한 자리\'를 선별하기.',
            lessons: [
                {
                    id: 'step2-1-support-resistance-layers',
                    title: '2.1 지지/저항의 층위',
                    description: '단순 선 긋기가 아닌 \'매물대(Volume Profile)\' 기반의 구역(Zone) 설정. 지지선이 저항선으로 바뀌는 \'Flip\' 현상의 메커니즘.',
                    data: [
                        { time: '2023-02-01', open: 100, high: 105, low: 98, close: 103 },
                        { time: '2023-02-02', open: 103, high: 104, low: 100, close: 101 },
                        { time: '2023-02-03', open: 101, high: 102, low: 99, close: 100 },
                        { time: '2023-02-04', open: 100, high: 105, low: 99, close: 104 },
                        { time: '2023-02-05', open: 104, high: 107, low: 103, close: 106 },
                        { time: '2023-02-06', open: 106, high: 108, low: 105, close: 107 },
                        { time: '2023-02-07', open: 107, high: 110, low: 106, close: 109 },
                        { time: '2023-02-08', open: 109, high: 110, low: 107, close: 108 },
                        { time: '2023-02-09', open: 108, high: 112, low: 107, close: 111 },
                        { time: '2023-02-10', open: 111, high: 112, low: 109, close: 110 },
                    ]
                },
                {
                    id: 'step2-2-trendlines-channels',
                    title: '2.2 추세선과 채널',
                    description: '3점 이상의 접점 확인, 가속 추세선과 감속 추세선의 활용, 채널 돌파 시 목표가 산정법.',
                    data: generateSimpleCandleData('2023-02-01', 15, 100, 15, 7)
                },
                {
                    id: 'step2-3-multi-timeframe-analysis',
                    title: '2.3 다중 프레임 분석(MTF)',
                    description: '주봉으로 방향을 보고, 4시간봉으로 구조를 파악하며, 15분봉으로 타점을 잡는 \'Top-Down\' 분석법 프로세스화.',
                    data: generateSimpleCandleData('2023-02-01', 20, 105, 10, 5)
                },
                {
                    id: 'step2-4-market-structure-shift',
                    title: '2.4 시장 구조의 파괴(MSS/BMS)',
                    description: '단순 돌파가 아닌, 구조적 저점/고점이 깨지는 \'Market Structure Shift\'를 통한 추세 전환 포착.',
                    data: [
                        { time: '2023-02-01', open: 100, high: 105, low: 98, close: 103 },
                        { time: '2023-02-02', open: 103, high: 107, low: 102, close: 105 },
                        { time: '2023-02-03', open: 105, high: 109, low: 104, close: 108 },
                        { time: '2023-02-04', open: 108, high: 110, low: 106, close: 107 }, // Lower High (Potential MSS)
                        { time: '2023-02-05', open: 107, high: 108, low: 102, close: 103 }, // Lower Low (MSS confirmed)
                        { time: '2023-02-06', open: 103, high: 104, low: 99, close: 100 },
                    ]
                },
            ]
        },
        {
            id: 'step3-technical-tools',
            title: '3단계: 기술적 도구 (Technical Tools)',
            type: 'step',
            description: '목표: 주관적 판단을 보조할 객관적 수치(데이터) 활용.',
            lessons: [
                {
                    id: 'step3-1-indicators-reinterpretation-rsi',
                    title: '3.1 보조지표의 재해석: RSI',
                    description: '70/30 돌파보다 \'히든 다이버전스\'와 \'RSI 추세선\' 활용법 강조.',
                    data: generateSimpleCandleData('2023-03-01', 10, 100, 10, 5)
                },
                {
                    id: 'step3-1-indicators-reinterpretation-ma',
                    title: '3.1 보조지표의 재해석: 이동평균선',
                    description: '20/50/200 이평선을 활용한 이격도 매매 및 \'그랜빌의 법칙\' 실전 적용.',
                    data: generateSimpleCandleData('2023-03-01', 15, 105, 12, 6)
                },
                {
                    id: 'step3-2-fibonacci-master',
                    title: '3.2 피보나치 마스터',
                    description: '0.618, 0.786(Deep Retracement) 구간에서의 반등 확률과 익절 타겟(Extension) 설정법.',
                    data: [
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
                {
                    id: 'step3-3-pattern-trading-trap',
                    title: '3.3 패턴 매매의 함정',
                    description: '헤드앤숄더, 삼각수렴 등이 왜 실패하는지(Fakeout), \'실패한 패턴\'을 역으로 이용하는 전략.',
                    data: generateSimpleCandleData('2023-03-01', 10, 110, 10, 5)
                },
            ]
        },
        {
            id: 'step4-advanced-concepts',
            title: '4단계: 심화 이론 (SMC & Advanced)',
            type: 'step',
            description: '목표: 기관과 세력의 움직임(Smart Money)을 추적하는 안목 기르기.',
            lessons: [
                {
                    id: 'step4-1-smc-orderblock',
                    title: '4.1 스마트 머니 컨셉(SMC) 심화: 오더블록',
                    description: '세력의 대량 주문이 머물러 있는 가격대 식별.',
                    data: generateSimpleCandleData('2023-04-01', 10, 100, 10, 5)
                },
                {
                    id: 'step4-1-smc-imbalance',
                    title: '4.1 스마트 머니 컨셉(SMC) 심화: 불균형(Imbalance/FVG)',
                    description: '급격한 가격 변동으로 생긴 공백이 채워지는 원리 활용.',
                    data: generateSimpleCandleData('2023-04-01', 10, 105, 12, 6)
                },
                {
                    id: 'step4-1-smc-liquidity',
                    title: '4.1 스마트 머니 컨셉(SMC) 심화: 유동성(Liquidity)',
                    description: '개미들의 손절 물량이 모인 곳(SL Hunting)을 찾아내는 \'Liquidity Sweep\' 전략.',
                    data: generateSimpleCandleData('2023-04-01', 10, 110, 8, 4)
                },
                {
                    id: 'step4-2-wyckoff-theory',
                    title: '4.2 와이코프 이론',
                    description: '매집(Accumulation)과 분산(Distribution)의 9단계 과정 및 스프링(Spring) 현상 포착.',
                    data: generateSimpleCandleData('2023-04-01', 20, 90, 20, 10)
                },
                {
                    id: 'step4-3-elliott-wave-practice',
                    title: '4.3 엘리어트 파동 실전',
                    description: '복잡한 카운팅보다 \'3파의 연장\'과 \'4파의 조정 양상\'을 통한 손익비 좋은 구간 선별.',
                    data: generateSimpleCandleData('2023-04-01', 20, 95, 15, 8)
                },
            ]
        },
        {
            id: 'step5-risk-management',
            title: '5단계: 리스크 관리 (Risk Management)',
            type: 'step',
            description: '목표: \'잃지 않는 매매\'를 위한 시스템 구축 (가장 중요).',
            lessons: [
                {
                    id: 'step5-1-rr-winrate-correlation',
                    title: '5.1 손익비와 승률의 상관관계',
                    description: '승률 40%로도 수익을 내는 \'기댓값\' 계산법 교육.',
                    data: generateSimpleCandleData('2023-05-01', 10, 100, 10, 5)
                },
                {
                    id: 'step5-2-position-sizing',
                    title: '5.2 포지션 사이징',
                    description: '계좌의 1~2%만 리스크로 거는 법, 레버리지와 격리/교차 매매의 올바른 사용법.',
                    data: generateSimpleCandleData('2023-05-01', 10, 105, 12, 6)
                },
                {
                    id: 'step5-3-stoploss-tech',
                    title: '5.3 손절(Stop-loss)의 기술',
                    description: '구조적 손절가 잡기와 트레일링 스톱 활용법.',
                    data: generateSimpleCandleData('2023-05-01', 10, 110, 8, 4)
                },
                {
                    id: 'step5-4-trading-journal',
                    title: '5.4 매매 일지 자동화',
                    description: '진입 근거, 감정 상태, 복기를 포함한 노션(Notion) 또는 엑셀 일지 템플릿 제공.',
                    data: generateSimpleCandleData('2023-05-01', 10, 115, 10, 5)
                },
                {
                    id: 'step5-5-trading-plan-checklist',
                    title: '5.5 트레이딩 플랜(Checklist)',
                    description: '진입 전 5가지 필수 체크리스트(추세 확인, 구조 확인, 지표 일치 등) 작성법.',
                    data: generateSimpleCandleData('2023-05-01', 10, 120, 12, 6)
                },
            ]
        },
        {
            id: 'step6-execution-automation',
            title: '6단계: 실전 및 자동화 (Execution & Automation)',
            type: 'step',
            description: '목표: 이론을 실제 수익으로 연결하고 효율성 극대화.',
            lessons: [
                {
                    id: 'step6-1-backtesting-methodology',
                    title: '6.1 백테스팅 방법론',
                    description: '\'TradingView Replay\' 기능을 활용한 과거 차트 검증 및 통계 추출법.',
                    data: generateSimpleCandleData('2023-06-01', 10, 100, 10, 5)
                },
                {
                    id: 'step6-2-pine-script-basics',
                    title: '6.2 파인 스크립트(Pine Script) 기초',
                    description: '나만의 지표를 만들거나 조건에 맞는 알람(Alert)을 설정하여 차트를 24시간 보지 않아도 되는 환경 구축.',
                    data: generateSimpleCandleData('2023-06-01', 10, 105, 12, 6)
                },
                {
                    id: 'step6-3-market-cycles-timezones',
                    title: '6.3 시장의 사이클과 시간대',
                    description: '뉴욕장 개장, FOMC 발표 등 변동성이 터지는 시간대별 대응 전략.',
                    data: generateSimpleCandleData('2023-06-01', 10, 110, 8, 4)
                },
                {
                    id: 'step6-4-mindset',
                    title: '6.4 마인드셋',
                    description: '손실 후 \'복수 매매\' 방지법 및 트레이딩을 \'비즈니스\'로 접근하는 태도 정립.',
                    data: generateSimpleCandleData('2023-06-01', 10, 115, 10, 5)
                },
            ]
        },
    ];

    // --- Functions ---
    // Note: chartInstance and candlestickSeriesInstance must be declared outside loadLesson to be accessible.
    // They are initialized within the DOMContentLoaded scope but potentially outside loadLesson scope for initial load.
    let chartInstance;
    let candlestickSeriesInstance;

    function loadLesson(lessonId) {
        // Find lesson within the hierarchical structure
        let foundLesson = null;
        for (const step of curriculum) {
            if (step.lessons) {
                foundLesson = step.lessons.find(lesson => lesson.id === lessonId);
                if (foundLesson) break;
            }
        }

        if (!foundLesson) {
            console.warn(`Lesson with ID ${lessonId} not found.`);
            return;
        }

        // Update details panel
        if (lessonTitle) lessonTitle.textContent = foundLesson.title;
        if (lessonDescription) lessonDescription.innerHTML = foundLesson.description; // Changed to innerHTML

        // Update active class in curriculum list (remove from all, then add to the clicked one)
        document.querySelectorAll('#curriculum-list li.lesson-item').forEach(li => {
            li.classList.remove('active');
        });
        const activeLi = document.querySelector(`#curriculum-list li.lesson-item[data-id="${lessonId}"]`);
        if (activeLi) {
            activeLi.classList.add('active');
        }

        // Update chart only if it exists and initialized
        if (chartInstance && candlestickSeriesInstance) {
            candlestickSeriesInstance.setData(foundLesson.data);
            chartInstance.timeScale().fitContent();
        } else {
             console.warn('Chart or candlestickSeries not initialized. Cannot update chart data on lesson click.');
        }
    }

    function populateCurriculum() {
        curriculum.forEach(step => {
            if (step.type === 'step') {
                const stepHeader = document.createElement('li');
                stepHeader.classList.add('step-header');
                stepHeader.textContent = step.title;
                stepHeader.dataset.id = step.id; // Optional, if steps themselves are clickable to show intro
                curriculumList.appendChild(stepHeader);

                const subLessonList = document.createElement('ul');
                subLessonList.classList.add('sub-lesson-list', 'collapsed'); // Start collapsed
                curriculumList.appendChild(subLessonList);

                stepHeader.addEventListener('click', () => {
                    subLessonList.classList.toggle('collapsed');
                    stepHeader.classList.toggle('expanded');
                });

                if (step.lessons) {
                    step.lessons.forEach(lesson => {
                        const li = document.createElement('li');
                        li.classList.add('lesson-item');
                        li.textContent = lesson.title;
                        li.dataset.id = lesson.id;
                        li.addEventListener('click', (event) => {
                            event.stopPropagation(); // Prevent stepHeader click from firing
                            loadLesson(lesson.id);
                        });
                        subLessonList.appendChild(li);
                    });
                }
            }
        });
    }

    // --- Initial Load & Event Listeners ---
    console.log('Before populateCurriculum and initial load of text content.'); // Log 4
    populateCurriculum();
    console.log('Curriculum populated.'); // Log 5

    // Get the ID of the first actual lesson for initial load
    let firstLessonId = null;
    let firstLesson = null;
    if (curriculum.length > 0 && curriculum[0].lessons && curriculum[0].lessons.length > 0) {
        firstLesson = curriculum[0].lessons[0];
        firstLessonId = firstLesson.id;
    }

    if (firstLessonId) {
        // Set initial lesson details text content, even if chart isn't ready
        if (lessonTitle) lessonTitle.textContent = firstLesson.title;
        if (lessonDescription) lessonDescription.innerHTML = firstLesson.description; // Changed to innerHTML
        // Mark the first lesson as active initially
        const activeLi = document.querySelector(`#curriculum-list li.lesson-item[data-id="${firstLessonId}"]`);
        if (activeLi) activeLi.classList.add('active');

        console.log('Initial lesson details text content set for:', firstLessonId);
    } else {
        console.log('Curriculum is empty or no lessons found. No initial lesson details to set.');
    }


    // --- Chart Initialization ---
    // Only attempt chart initialization if chartContainer exists
    if (chartContainer) {
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
            chartInstance = LightweightCharts.createChart(chartContainer, chartOptions);
            candlestickSeriesInstance = chartInstance.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderDownColor: '#ef5350',
                borderUpColor: '#26a69a',
                wickDownColor: '#ef5350',
                wickUpColor: '#26a69a',
            });
            console.log('Lightweight Chart created successfully.'); // Log 3

            // If chart is successfully created AND there's a first lesson, load its data
            if (firstLesson) { // Use firstLesson object directly
                candlestickSeriesInstance.setData(firstLesson.data);
                chartInstance.timeScale().fitContent();
                console.log('First lesson chart data loaded.'); // Log 6
            } else {
                console.log('Curriculum is empty or no lessons found. No chart data to load.');
            }

            // Handle window resizing (uses 'chartInstance' variable, so it must be after chart init attempt)
            new ResizeObserver(entries => {
                if (entries.length > 0 && chartInstance) { // Ensure chartInstance is still valid
                    const { width, height } = entries[0].contentRect;
                    chartInstance.resize(width, height);
                }
            }).observe(chartContainer);

        } catch (error) {
            console.error('Error initializing Lightweight Chart:', error);
            console.error('lightweight-charts.standalone.production.js가 올바르게 로드되었는지 확인하세요.');
            // Do NOT return here. The curriculum list should still be visible.
        }
    } else {
        console.warn('chart-container element not found. Chart will not be initialized.');
    }

    console.log('main.js finished execution.'); // Log 7
});
