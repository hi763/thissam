import { useState, useEffect, useRef } from "react";
 
const NEWS_DATA = [
  {
    id: 1,
    headline: "서울시, 2027년부터 대중교통 전면 무료화 추진 확정",
    source: "서울뉴스타임",
    date: "2026.04.08",
    logo: "SN",
    body: "서울시는 8일 시의회 본회의에서 대중교통 무료화 조례안을 통과시켰다고 발표했다. 오세훈 시장은 \"시민 교통비 부담을 완전히 없애겠다\"고 밝혔으며, 연간 소요 예산은 약 2조 3천억 원으로 추산된다. 해당 정책은 2027년 1월 1일부터 지하철·버스 전 노선에 적용될 예정이다.",
    clues: ["확정", "조례안을 통과", "오세훈 시장은"],
    isReal: false,
    explanation: "실제로 서울시는 이런 정책을 확정·발표한 적이 없습니다. 출처 매체 '서울뉴스타임'은 공식 언론사가 아니며, 구체적인 예산 수치가 신뢰성 있는 출처 없이 제시되어 있습니다.",
    difficulty: "중",
  },
  {
    id: 2,
    headline: "WHO, 스마트폰 하루 2시간 이상 사용 시 청소년 수면장애 위험 3배",
    source: "연합헬스뉴스",
    date: "2026.03.21",
    logo: "YH",
    body: "세계보건기구(WHO)가 발표한 최신 보고서에 따르면 하루 2시간 이상 스마트폰을 사용하는 14~18세 청소년은 그렇지 않은 또래보다 수면장애 발생 위험이 약 3배 높은 것으로 나타났다. 연구에는 42개국 12만 명이 참여했으며 블루라이트와 멜라토닌 억제가 주요 원인으로 지목됐다.",
    clues: ["WHO", "42개국 12만 명", "블루라이트"],
    isReal: true,
    explanation: "WHO 및 다수 학술 연구에서 청소년 스마트폰 과사용과 수면 장애의 상관관계가 실제로 보고되고 있습니다. 구체적 수치는 연구마다 다르지만 핵심 주장은 과학적 근거가 있습니다.",
    difficulty: "하",
  },
  {
    id: 3,
    headline: "국내 연구팀, 암세포만 선택 파괴하는 나노로봇 임상시험 성공",
    source: "사이언스코리아데일리",
    date: "2026.04.02",
    logo: "SK",
    body: "KAIST 바이오나노연구팀이 개발한 DNA 나노로봇이 3상 임상시험에서 기존 항암제 대비 부작용 없이 암세포 제거율 94%를 달성했다고 발표했다. 연구팀은 이 기술이 2028년 상용화될 수 있다고 밝혔으며, 네이처 메디신 최신호에 게재됐다.",
    clues: ["3상 임상시험", "94%", "네이처 메디신"],
    isReal: false,
    explanation: "DNA 나노로봇 연구는 실제 진행 중이지만, 3상 임상에서 94% 성공률을 거뒀다는 주장은 현 기술 수준을 크게 과장한 것입니다. '네이처 메디신 최신호'에 해당 논문이 실제로 게재됐는지 확인이 필요합니다.",
    difficulty: "상",
  },
  {
    id: 4,
    headline: "기후변화로 한반도 여름 평균기온 1980년 대비 1.8°C 상승",
    source: "기상청 공식 보도자료",
    date: "2026.03.15",
    logo: "KM",
    body: "기상청이 발표한 '2025 한반도 기후변화 분석 보고서'에 따르면 최근 10년(2015~2024) 여름철 평균기온이 1980년대 평균보다 1.8°C 상승한 것으로 나타났다. 특히 서울·대구 등 대도시의 열섬 효과가 상승폭을 키운 요인으로 분석됐다.",
    clues: ["기상청 공식", "보고서", "1980년대 평균"],
    isReal: true,
    explanation: "기상청은 매년 기후변화 분석 보고서를 발표하며, 한반도 기온 상승 추세는 공신력 있는 데이터로 꾸준히 확인되고 있습니다. 출처가 명확하고 구체적인 연도와 비교 기준이 제시되어 있습니다.",
    difficulty: "하",
  },
  {
    id: 5,
    headline: "미국 연구진, 커피 하루 4잔 이상 마시면 IQ 7포인트 상승 확인",
    source: "헬스인사이더",
    date: "2026.04.05",
    logo: "HI",
    body: "하버드 의과대학 연구팀이 성인 8,000명을 대상으로 6개월간 진행한 연구에서 매일 커피를 4잔 이상 마신 그룹의 IQ 테스트 점수가 평균 7포인트 향상됐다는 결과를 발표했다. 카페인이 신경 시냅스 생성을 촉진한다는 메커니즘도 함께 제시됐다.",
    clues: ["IQ 7포인트", "6개월", "하버드 의과대학"],
    isReal: false,
    explanation: "IQ는 단기간의 음식 섭취로 유의미하게 변하지 않습니다. '하버드 의과대학'이라는 권위 있는 기관명을 사용했지만 실제 논문 링크·저널명이 없습니다. 카페인이 집중력에 일시적 영향을 줄 수 있지만 IQ 상승과는 다른 개념입니다.",
    difficulty: "중",
  },
];

const DIFFICULTY_COLOR = {
  하: { bg: "#dcfce7", text: "#166534" },
  중: { bg: "#fef9c3", text: "#854d0e" },
  상: { bg: "#fee2e2", text: "#991b1b" },
};

async function getFeedback(headline, verdict, reasoning) {
  const prompt = `당신은 미디어 리터러시 교육 전문가입니다. 중학생이 뉴스 기사를 판별하고 작성한 근거를 논증 구조 관점에서 친절하게 피드백해 주세요.

[기사 제목]
${headline}

[학생의 판별]
${verdict === "fake" ? "가짜 뉴스라고 판별함" : "진짜 뉴스라고 판별함"}

[학생이 제시한 근거]
${reasoning}

다음 형식으로 피드백해 주세요 (각 항목은 1~2문장):
1. **논증 강점**: 잘 짚어낸 부분
2. **보완할 점**: 더 탄탄한 근거가 될 수 있는 방향
3. **팩트체크 팁**: 이런 기사를 검증할 때 쓸 수 있는 실용적인 방법 1가지
4. **한 줄 총평**: 격려의 말`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "피드백을 불러오지 못했습니다.";
}

function parseFeedback(text) {
  return text
    .split("\n")
    .filter((l) => l.trim())
    .map((line, i) => {
      const match = line.match(/^\d+\.\s+\*\*(.+?)\*\*[:\s]+(.+)/);
      if (match) return { label: match[1], content: match[2], key: i };
      const plain = line.replace(/\*\*/g, "").trim();
      return plain ? { label: null, content: plain, key: i } : null;
    })
    .filter(Boolean);
}

export default function App() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("verdict"); // verdict | reasoning | feedback | result
  const [verdict, setVerdict] = useState(null);
  const [reasoning, setReasoning] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const [highlightedClue, setHighlightedClue] = useState(null);
  const [showClueHint, setShowClueHint] = useState(false);
  const textareaRef = useRef(null);
  const news = NEWS_DATA[idx];
  const total = NEWS_DATA.length;

  useEffect(() => {
    setPhase("verdict");
    setVerdict(null);
    setReasoning("");
    setFeedback("");
    setHighlightedClue(null);
    setShowClueHint(false);
  }, [idx]);

  function selectVerdict(v) {
    setVerdict(v);
    setPhase("reasoning");
    setTimeout(() => textareaRef.current?.focus(), 100);
  }

  async function submitReasoning() {
    if (reasoning.trim().length < 20) return;
    setLoading(true);
    setPhase("feedback");
    const fb = await getFeedback(news.headline, verdict, reasoning);
    setFeedback(fb);
    const correct = (verdict === "fake") === !news.isReal;
    setScores((s) => [...s, { id: news.id, correct, verdict }]);
    setLoading(false);
  }

  function nextNews() {
    if (idx + 1 >= total) { setPhase("result"); return; }
    setIdx((i) => i + 1);
  }

  const totalCorrect = scores.filter((s) => s.correct).length;

  if (phase === "result") {
    const pct = Math.round((totalCorrect / total) * 100);
    const grade = pct >= 90 ? "S" : pct >= 70 ? "A" : pct >= 50 ? "B" : "C";
    const gradeMsg = {
      S: "완벽한 탐정! 가짜뉴스를 꿰뚫는 눈이 있네요.",
      A: "우수한 분석력! 조금만 더 연습하면 완벽해요.",
      B: "좋은 시작이에요. 단서를 더 꼼꼼히 살펴봐요.",
      C: "미디어 리터러시, 함께 키워나가요!",
    };
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif", padding: "2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ fontSize: 80, fontWeight: 800, color: "#f0f", letterSpacing: -4, lineHeight: 1, fontVariantNumeric: "tabular-nums", textShadow: "0 0 40px #f0f6" }}>{grade}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "16px 0 8px" }}>{pct}점 · {totalCorrect}/{total} 정답</div>
          <div style={{ fontSize: 15, color: "#aaa", marginBottom: 40 }}>{gradeMsg[grade]}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
            {scores.map((s, i) => {
              const n = NEWS_DATA.find((x) => x.id === s.id);
              return (
                <div key={i} style={{ background: s.correct ? "#0d2d1a" : "#2d0d0d", border: `1px solid ${s.correct ? "#22c55e33" : "#ef444433"}`, borderRadius: 12, padding: "12px 14px", textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: s.correct ? "#86efac" : "#fca5a5", fontWeight: 600, marginBottom: 4 }}>{s.correct ? "정답" : "오답"}</div>
                  <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.5 }}>{n?.headline.slice(0, 28)}...</div>
                </div>
              );
            })}
          </div>
          <button onClick={() => { setIdx(0); setScores([]); setPhase("verdict"); }} style={{ background: "#f0f", color: "#fff", border: "none", borderRadius: 10, padding: "14px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            다시 도전
          </button>
        </div>
      </div>
    );
  }

  const highlighted = highlightedClue !== null ? news.clues[highlightedClue] : null;

  function renderBody(text) {
    if (!highlighted) return text;
    const parts = text.split(highlighted);
    return parts.map((part, i) =>
      i < parts.length - 1 ? (
        <span key={i}>{part}<mark style={{ background: "#fbbf24", color: "#1a1a1a", borderRadius: 3, padding: "0 2px" }}>{highlighted}</mark></span>
      ) : <span key={i}>{part}</span>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif", padding: "0 0 4rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 1.25rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 0 1rem", borderBottom: "1px solid #1e1e2e" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "#f0f", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>가짜뉴스 탐정단</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {NEWS_DATA.map((_, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < idx ? "#22c55e" : i === idx ? "#f0f" : "#2a2a3a", transition: "background 0.3s" }} />
            ))}
          </div>
        </div>

        {/* News Card */}
        <div style={{ marginTop: "1.5rem", background: "#111118", border: "1px solid #1e1e2e", borderRadius: 16, overflow: "hidden" }}>
          {/* Source bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", background: "#13131e", borderBottom: "1px solid #1e1e2e" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 6, background: "#1e1e2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#888", letterSpacing: 0.5 }}>{news.logo}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#ccc" }}>{news.source}</div>
                <div style={{ fontSize: 11, color: "#555" }}>{news.date}</div>
              </div>
            </div>
            <div style={{ ...DIFFICULTY_COLOR[news.difficulty], fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>난이도 {news.difficulty}</div>
          </div>

          <div style={{ padding: "1.25rem 1.25rem 0.75rem" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.4, marginBottom: 12, letterSpacing: -0.3 }}>{news.headline}</div>
            <div style={{ fontSize: 14, color: "#888", lineHeight: 1.75 }}>{renderBody(news.body)}</div>
          </div>

          {/* Clue hint toggle */}
          <div style={{ padding: "0 1.25rem 1rem" }}>
            <button onClick={() => setShowClueHint(!showClueHint)} style={{ fontSize: 12, color: "#555", background: "none", border: "1px solid #2a2a3a", borderRadius: 8, padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              {showClueHint ? "단서 숨기기" : "단서 힌트 보기"}
            </button>
            {showClueHint && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                {news.clues.map((clue, i) => (
                  <button key={i} onClick={() => setHighlightedClue(highlightedClue === i ? null : i)} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 20, cursor: "pointer", border: "1px solid", borderColor: highlightedClue === i ? "#fbbf24" : "#2a2a3a", background: highlightedClue === i ? "#2a2000" : "#1a1a24", color: highlightedClue === i ? "#fbbf24" : "#777", fontWeight: 600, transition: "all 0.15s" }}>
                    "{clue}"
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Phase: Verdict */}
        {phase === "verdict" && (
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ fontSize: 13, color: "#555", marginBottom: 12, textAlign: "center" }}>이 뉴스는 진짜일까요, 가짜일까요?</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button onClick={() => selectVerdict("real")} style={{ background: "#0d2d1a", border: "1.5px solid #22c55e33", borderRadius: 14, padding: "20px", cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#22c55e"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#22c55e33"}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>✓</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#86efac" }}>진짜 뉴스</div>
                <div style={{ fontSize: 12, color: "#4ade80aa", marginTop: 4 }}>사실에 근거한 보도</div>
              </button>
              <button onClick={() => selectVerdict("fake")} style={{ background: "#2d0d0d", border: "1.5px solid #ef444433", borderRadius: 14, padding: "20px", cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#ef4444"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#ef444433"}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>✗</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fca5a5" }}>가짜 뉴스</div>
                <div style={{ fontSize: 12, color: "#f87171aa", marginTop: 4 }}>허위·과장된 정보</div>
              </button>
            </div>
          </div>
        )}

        {/* Phase: Reasoning */}
        {phase === "reasoning" && (
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: verdict === "real" ? "#22c55e22" : "#ef444422", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: verdict === "real" ? "#86efac" : "#fca5a5" }}>
                {verdict === "real" ? "✓" : "✗"}
              </div>
              <span style={{ fontSize: 13, color: "#888" }}>{verdict === "real" ? "진짜 뉴스라고 판단했습니다" : "가짜 뉴스라고 판단했습니다"}</span>
            </div>
            <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", borderBottom: "1px solid #1e1e2e", fontSize: 12, color: "#555" }}>판별 근거를 작성하세요 (20자 이상)</div>
              <textarea ref={textareaRef} value={reasoning} onChange={e => setReasoning(e.target.value)} placeholder="왜 그렇게 생각했나요? 기사의 어떤 부분이 의심스럽거나 신뢰할 수 있다고 느꼈나요?" style={{ width: "100%", minHeight: 120, background: "transparent", border: "none", outline: "none", padding: "14px", fontSize: 14, color: "#ddd", lineHeight: 1.7, resize: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderTop: "1px solid #1e1e2e" }}>
                <span style={{ fontSize: 12, color: reasoning.length >= 20 ? "#22c55e" : "#555" }}>{reasoning.length}자</span>
                <button onClick={submitReasoning} disabled={reasoning.trim().length < 20} style={{ background: reasoning.trim().length >= 20 ? "#f0f" : "#1e1e2e", color: reasoning.trim().length >= 20 ? "#fff" : "#444", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: reasoning.trim().length >= 20 ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
                  AI 피드백 받기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Phase: Feedback */}
        {phase === "feedback" && (
          <div style={{ marginTop: "1.5rem" }}>
            {/* Verdict result */}
            {scores.length > 0 && (() => {
              const last = scores[scores.length - 1];
              return (
                <div style={{ background: last.correct ? "#0d2d1a" : "#2d0d0d", border: `1px solid ${last.correct ? "#22c55e44" : "#ef444444"}`, borderRadius: 12, padding: "14px 18px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 22 }}>{last.correct ? "🎯" : "💡"}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: last.correct ? "#86efac" : "#fca5a5" }}>{last.correct ? "정답!" : "오답"} — 이 기사는 {news.isReal ? "진짜" : "가짜"} 뉴스입니다.</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 3, lineHeight: 1.5 }}>{news.explanation}</div>
                  </div>
                </div>
              );
            })()}

            {/* AI Feedback */}
            <div style={{ background: "#0d0d1a", border: "1px solid #2a2a4a", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "10px 16px", background: "#13132a", borderBottom: "1px solid #2a2a4a", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 20, height: 20, background: "#7c3aed", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa" }}>Claude AI 논증 피드백</span>
              </div>
              <div style={{ padding: "1rem 1.25rem", minHeight: 80 }}>
                {loading ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#555", fontSize: 13 }}>
                    <div style={{ width: 16, height: 16, border: "2px solid #2a2a4a", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    AI가 논증 구조를 분석 중...
                  </div>
                ) : (
                  <div>
                    {parseFeedback(feedback).map((item) => (
                      <div key={item.key} style={{ marginBottom: 12 }}>
                        {item.label && <div style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", marginBottom: 3 }}>{item.label}</div>}
                        <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.7 }}>{item.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button onClick={nextNews} style={{ width: "100%", marginTop: 14, background: "#f0f", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 800, color: "#fff", cursor: "pointer", letterSpacing: -0.3 }}>
              {idx + 1 < total ? `다음 기사 (${idx + 2}/${total}) →` : "결과 보기 →"}
            </button>
          </div>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
