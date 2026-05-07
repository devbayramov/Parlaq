import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Question {
  id: string;
  domain: string;
  domainTitle: string;
  text: string;
}

type Phase = "before_gate" | "gate" | "work_questions" | "after_gate" | "result";

// ─── Questions ────────────────────────────────────────────────────────────────
const beforeGateQuestions: Question[] = [
  // D1 — Anlama və ünsiyyət
  { id: "D1.1", domain: "D1", domainTitle: "Anlama və ünsiyyət", text: "On dəqiqə müddətində bir şeyə cəmləşmək?" },
  { id: "D1.2", domain: "D1", domainTitle: "Anlama və ünsiyyət", text: "Vacib işləri xatırlamaq?" },
  { id: "D1.3", domain: "D1", domainTitle: "Anlama və ünsiyyət", text: "Gündəlik həyatda problemləri təhlil etmək və həll yolları tapmaq?" },
  { id: "D1.4", domain: "D1", domainTitle: "Anlama və ünsiyyət", text: "Yeni bir şey öyrənmək, məsələn, yeni yerə getməyi öyrənmək?" },
  { id: "D1.5", domain: "D1", domainTitle: "Anlama və ünsiyyət", text: "Ümumiyyətlə, insanların nə dediyini başa düşmək?" },
  { id: "D1.6", domain: "D1", domainTitle: "Anlama və ünsiyyət", text: "Söhbət başlamaq və davam etdirmək?" },
  // D2 — Hərəkət etmək
  { id: "D2.1", domain: "D2", domainTitle: "Hərəkət etmək", text: "Uzun müddət ayaq üstə durmaq, məsələn, 30 dəqiqə?" },
  { id: "D2.2", domain: "D2", domainTitle: "Hərəkət etmək", text: "Oturduqdan sonra ayağa qalxmaq?" },
  { id: "D2.3", domain: "D2", domainTitle: "Hərəkət etmək", text: "Evinizdə hərəkət etmək?" },
  { id: "D2.4", domain: "D2", domainTitle: "Hərəkət etmək", text: "Evdən çıxmaq?" },
  { id: "D2.5", domain: "D2", domainTitle: "Hərəkət etmək", text: "Uzaq məsafə yeriyib getmək, məsələn, bir kilometr (və ya ekvivalent)?" },
  // D3 — Özünə qulluq
  { id: "D3.1", domain: "D3", domainTitle: "Özünə qulluq", text: "Bütün bədəni yuymaq?" },
  { id: "D3.2", domain: "D3", domainTitle: "Özünə qulluq", text: "Geyinmək?" },
  { id: "D3.3", domain: "D3", domainTitle: "Özünə qulluq", text: "Yemək yemək?" },
  { id: "D3.4", domain: "D3", domainTitle: "Özünə qulluq", text: "Bir neçə gün müddətinə tək qalmaq?" },
  // D4 — İnsanlarla münasibət
  { id: "D4.1", domain: "D4", domainTitle: "İnsanlarla münasibət", text: "Tanımadığınız insanlarla münasibət qurmaq?" },
  { id: "D4.2", domain: "D4", domainTitle: "İnsanlarla münasibət", text: "Dostluğu davam etdirmək?" },
  { id: "D4.3", domain: "D4", domainTitle: "İnsanlarla münasibət", text: "Sizə yaxın olan insanlarla yaxşı münasibətdə olmaq?" },
  { id: "D4.4", domain: "D4", domainTitle: "İnsanlarla münasibət", text: "Yeni dostlar qazanmaq?" },
  { id: "D4.5", domain: "D4", domainTitle: "İnsanlarla münasibət", text: "Cinsi fəaliyyət?" },
  // D5a — Həyat fəaliyyəti: Ev işləri
  { id: "D5.1", domain: "D5a", domainTitle: "Həyat fəaliyyəti — Ev işləri", text: "Ev məsuliyyətlərinizi yerinə yetirmək?" },
  { id: "D5.2", domain: "D5a", domainTitle: "Həyat fəaliyyəti — Ev işləri", text: "Ən vacib ev işlərini yaxşı yerinə yetirmək?" },
  { id: "D5.3", domain: "D5a", domainTitle: "Həyat fəaliyyəti — Ev işləri", text: "Etməli olduğunuz bütün ev işlərini başa çatdırmaq?" },
  { id: "D5.4", domain: "D5a", domainTitle: "Həyat fəaliyyəti — Ev işləri", text: "Ev işlərini lazımi sürətdə bitirmək?" },
];

const workQuestions: Question[] = [
  { id: "D5.5", domain: "D5b", domainTitle: "Həyat fəaliyyəti — İş/Məktəb", text: "Gündəlik iş/məktəb fəaliyyətləriniz?" },
  { id: "D5.6", domain: "D5b", domainTitle: "Həyat fəaliyyəti — İş/Məktəb", text: "Ən vacib iş/məktəb tapşırıqlarını yaxşı yerinə yetirmək?" },
  { id: "D5.7", domain: "D5b", domainTitle: "Həyat fəaliyyəti — İş/Məktəb", text: "Etməli olduğunuz bütün işləri başa çatdırmaq?" },
  { id: "D5.8", domain: "D5b", domainTitle: "Həyat fəaliyyəti — İş/Məktəb", text: "İşinizi lazımi sürətdə bitirmək?" },
];

const afterGateQuestions: Question[] = [
  { id: "D6.1", domain: "D6", domainTitle: "Cəmiyyətə qatılım", text: "İcma fəaliyyətlərinə (məsələn, bayramlar, dini və ya digər fəaliyyətlər) digər insanlar kimi qatılmaqda problem yaşadınızmı?" },
  { id: "D6.2", domain: "D6", domainTitle: "Cəmiyyətə qatılım", text: "Ətrafınızdakı maneələr və ya əngəllər səbəbindən problem yaşadınızmı?" },
  { id: "D6.3", domain: "D6", domainTitle: "Cəmiyyətə qatılım", text: "Başqalarının münasibəti və hərəkətləri səbəbindən ləyaqətlə yaşamaqda problem yaşadınızmı?" },
  { id: "D6.4", domain: "D6", domainTitle: "Cəmiyyətə qatılım", text: "Sağlamlıq vəziyyətinizə və ya onun nəticələrinə nə qədər vaxt ayırdınız?" },
  { id: "D6.5", domain: "D6", domainTitle: "Cəmiyyətə qatılım", text: "Sağlamlıq vəziyyətiniz sizi emosional cəhətdən nə qədər etkilədi?" },
  { id: "D6.6", domain: "D6", domainTitle: "Cəmiyyətə qatılım", text: "Sağlamlığınız siz və ya ailənizdə maliyyə resurslarına nə qədər yük oldu?" },
  { id: "D6.7", domain: "D6", domainTitle: "Cəmiyyətə qatılım", text: "Sağlamlıq problemləriniz səbəbindən ailənizdə nə qədər problem yaşandı?" },
  { id: "D6.8", domain: "D6", domainTitle: "Cəmiyyətə qatılım", text: "Özünüz üçün istirahət və ya zövq almaq üçün bir şey etməkdə nə qədər problem yaşadınız?" },
];

const answerOptions = [
  { value: 1, label: "Yoxdur" },
  { value: 2, label: "Yüngül" },
  { value: 3, label: "Orta" },
  { value: 4, label: "Ağır" },
  { value: 5, label: "Həddindən artıq / Edə bilmirəm" },
];

// Domain definitions for result display
const domainDefs = [
  { key: "D1", title: "Anlama və ünsiyyət", count: 6 },
  { key: "D2", title: "Hərəkət etmək", count: 5 },
  { key: "D3", title: "Özünə qulluq", count: 4 },
  { key: "D4", title: "İnsanlarla münasibət", count: 5 },
  { key: "D5a", title: "Ev işləri", count: 4 },
  { key: "D5b", title: "İş/Məktəb", count: 4 },
  { key: "D6", title: "Cəmiyyətə qatılım", count: 8 },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────
function calcScore(answers: Record<string, number>, hasWork: boolean) {
  const answeredValues = Object.values(answers);
  const sum32or36 = answeredValues.reduce((s, v) => s + v, 0);

  let total36: number;
  if (hasWork) {
    // All 36 items answered
    total36 = sum32or36;
  } else {
    // D5b (4 items) skipped — prorate using mean of the 32 answered items
    const mean = sum32or36 / 32;
    total36 = sum32or36 + mean * 4;
  }

  // Official WHO simple-scoring formula: ((Total − 36) / 144) × 100
  const pct = ((total36 - 36) / 144) * 100;
  return {
    rawSum: sum32or36,
    total36: Math.round(total36 * 10) / 10,
    pct: Math.max(0, Math.min(100, pct)),
    prorated: !hasWork,
  };
}

function getLevel(pct: number) {
  if (pct <= 4) return { emoji: "🟢", color: "#1E8449", bg: "#D5F5E3", title: "Əlillik yoxdur", range: "0–4%", note: "Sağlamlıq vəziyyətiniz funksional baxımdan normaldır. Gündəlik fəaliyyətlərinizdə demək olar ki, heç bir məhdudiyyət yaşamırsınız." };
  if (pct <= 24) return { emoji: "🟡", color: "#B7950B", bg: "#FEF9E7", title: "Yüngül əlillik", range: "5–24%", note: "Bəzi fəaliyyətlərinizdə yüngül çətinliklər var. Gündəlik həyatınıza əhəmiyyətli dərəcədə təsir etmir, lakin mütəxəssis məsləhəti tövsiyə olunur." };
  if (pct <= 49) return { emoji: "🟠", color: "#BA4A00", bg: "#FAE5D3", title: "Orta əlillik", range: "25–49%", note: "Bir çox fəaliyyətdə orta dərəcəli çətinliklər yaşanır. Həyat keyfiyyəti azalmışdır. Tibbi və ya reabilitasiya müdaxiləsi tövsiyə olunur." };
  if (pct <= 95) return { emoji: "🔴", color: "#C0392B", bg: "#FADBD8", title: "Ağır əlillik", range: "50–95%", note: "Ciddi funksional məhdudiyyətlər var. Gündəlik fəaliyyətlərin çoxunu yerinə yetirmək çox çətindir. Mütəxəssis müdaxiləsi zəruri hesab olunur." };
  return { emoji: "⛔", color: "#7B241C", bg: "#F9EBEA", title: "Tam əlillik", range: "96–100%", note: "Fəaliyyətlərinin demək olar ki, hamısında tam məhdudiyyət müşahidə olunur. Dərhal tibbi müdaxilə və dəstək tələb olunur." };
}

function getDomainAvg(answers: Record<string, number>, questions: Question[], domain: string) {
  const qs = questions.filter((q) => q.domain === domain);
  if (qs.length === 0) return null;
  const sum = qs.reduce((s, q) => s + (answers[q.id] ?? 0), 0);
  return { sum, avg: sum / qs.length, count: qs.length, max: qs.length * 5 };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function WhodasExamination() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("before_gate");
  const [beforeIdx, setBeforeIdx] = useState(0);
  const [workIdx, setWorkIdx] = useState(0);
  const [afterIdx, setAfterIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [hasWork, setHasWork] = useState<boolean>(false);

  const allQs = [
    ...beforeGateQuestions,
    ...(hasWork ? workQuestions : []),
    ...afterGateQuestions,
  ];

  // Current question and progress
  let currentQ: Question | null = null;
  let currentNum = 0;
  const totalQ = hasWork ? 36 : 32;

  if (phase === "before_gate") {
    currentQ = beforeGateQuestions[beforeIdx];
    currentNum = beforeIdx + 1;
  } else if (phase === "work_questions") {
    currentQ = workQuestions[workIdx];
    currentNum = beforeGateQuestions.length + workIdx + 1;
  } else if (phase === "after_gate") {
    const workOffset = hasWork ? workQuestions.length : 0;
    currentQ = afterGateQuestions[afterIdx];
    currentNum = beforeGateQuestions.length + workOffset + afterIdx + 1;
  }

  const progressPct = currentNum > 0 ? (currentNum / totalQ) * 100 : 0;

  function handleAnswer() {
    if (selected === null || !currentQ) return;
    const newAnswers = { ...answers, [currentQ.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (phase === "before_gate") {
      if (beforeIdx < beforeGateQuestions.length - 1) {
        setBeforeIdx(beforeIdx + 1);
      } else {
        setPhase("gate");
      }
    } else if (phase === "work_questions") {
      if (workIdx < workQuestions.length - 1) {
        setWorkIdx(workIdx + 1);
      } else {
        setPhase("after_gate");
      }
    } else if (phase === "after_gate") {
      if (afterIdx < afterGateQuestions.length - 1) {
        setAfterIdx(afterIdx + 1);
      } else {
        setPhase("result");
      }
    }
  }

  function handleGateChoice(works: boolean) {
    setHasWork(works);
    if (works) {
      setPhase("work_questions");
    } else {
      setPhase("after_gate");
    }
  }

  function reset() {
    setPhase("before_gate");
    setBeforeIdx(0);
    setWorkIdx(0);
    setAfterIdx(0);
    setAnswers({});
    setSelected(null);
    setHasWork(false);
  }

  // ── Result Screen ──────────────────────────────────────────────────────────
  if (phase === "result") {
    const { rawSum, total36, pct, prorated } = calcScore(answers, hasWork);
    const level = getLevel(pct);
    const answeredCount = hasWork ? 36 : 32;
    const overallAvg = (rawSum / answeredCount).toFixed(2);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>WHODAS 2.0</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView contentContainerStyle={styles.resultScroll}>
          <MaterialCommunityIcons
            name="clipboard-pulse-outline"
            size={64}
            color="#A3C9A8"
            style={{ alignSelf: "center", marginBottom: 12 }}
          />
          <Text style={styles.resultHeading}>Nəticə</Text>

          {/* Main result card */}
          <View style={[styles.resultCard, { backgroundColor: level.bg }]}>
            <Text style={styles.resultEmoji}>{level.emoji}</Text>
            <Text style={[styles.resultTitle, { color: level.color }]}>{level.title}</Text>
            <Text style={[styles.resultRange, { color: level.color }]}>Əlillik səviyyəsi: {level.range}</Text>
            <View style={styles.scoreRow}>
              <View style={styles.scoreBox}>
                <Text style={[styles.scoreVal, { color: level.color }]}>{pct.toFixed(1)}%</Text>
                <Text style={styles.scoreLabel}>Əlillik faizi</Text>
              </View>
              <View style={styles.scoreDivider} />
              <View style={styles.scoreBox}>
                <Text style={[styles.scoreVal, { color: level.color }]}>{total36}/180</Text>
                <Text style={styles.scoreLabel}>Xam bal (36)</Text>
              </View>
              <View style={styles.scoreDivider} />
              <View style={styles.scoreBox}>
                <Text style={[styles.scoreVal, { color: level.color }]}>{overallAvg}</Text>
                <Text style={styles.scoreLabel}>Orta bal</Text>
              </View>
            </View>
            <Text style={styles.resultNote}>{level.note}</Text>
          </View>

          {/* Domain breakdown */}
          <View style={styles.domainCard}>
            <Text style={styles.domainCardTitle}>Sahə üzrə nəticələr</Text>
            {domainDefs.map((def) => {
              if (def.key === "D5b" && !hasWork) return null;
              const qs = [...beforeGateQuestions, ...workQuestions, ...afterGateQuestions];
              const d = getDomainAvg(answers, qs, def.key);
              if (!d) return null;
              const domainMax = def.count * 5;
              const domainPct = ((d.sum - def.count) / (domainMax - def.count)) * 100;
              const clampedPct = Math.max(0, Math.min(100, domainPct));
              const barColor =
                clampedPct <= 4 ? "#1E8449" :
                clampedPct <= 24 ? "#D4AC0D" :
                clampedPct <= 49 ? "#BA4A00" : "#C0392B";
              return (
                <View key={def.key} style={styles.domainRow}>
                  <View style={styles.domainRowTop}>
                    <Text style={styles.domainKey}>{def.key}</Text>
                    <Text style={styles.domainTitle}>{def.title}</Text>
                    <Text style={styles.domainScore}>{d.sum}/{d.max}</Text>
                    <Text style={styles.domainAvg}>⌀ {d.avg.toFixed(1)}</Text>
                  </View>
                  <View style={styles.domainBarBg}>
                    <View style={[styles.domainBarFill, { width: `${clampedPct}%` as any, backgroundColor: barColor }]} />
                  </View>
                </View>
              );
            })}
          </View>

          {/* Scale reference */}
          <View style={styles.scaleCard}>
            <Text style={styles.scaleCardTitle}>Əlillik səviyyələri (ÜST)</Text>
            {[
              { range: "0–4%", label: "Əlillik yoxdur", color: "#1E8449" },
              { range: "5–24%", label: "Yüngül", color: "#D4AC0D" },
              { range: "25–49%", label: "Orta", color: "#BA4A00" },
              { range: "50–95%", label: "Ağır", color: "#C0392B" },
              { range: "96–100%", label: "Tam əlillik", color: "#7B241C" },
            ].map((s) => (
              <View key={s.range} style={styles.scaleRow}>
                <View style={[styles.scaleDot, { backgroundColor: s.color }]} />
                <Text style={styles.scaleRange}>{s.range}</Text>
                <Text style={styles.scaleLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.disclaimer}>
            Bu nəticə klinik diaqnoz deyil. Tibbi qiymətləndirmə üçün mütəxəssisə müraciət edin.
          </Text>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
            <TouchableOpacity style={styles.btn} onPress={reset}>
              <MaterialCommunityIcons name="refresh" size={20} color="#fff" />
              <Text style={styles.btnText}>Yenidən</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnBack]} onPress={() => router.back()}>
              <MaterialCommunityIcons name="arrow-left" size={20} color="#fff" />
              <Text style={styles.btnText}>Geri</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  // ── Gate Screen ────────────────────────────────────────────────────────────
  if (phase === "gate") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>WHODAS 2.0</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.gateCard}>
            <MaterialCommunityIcons name="briefcase-outline" size={48} color="#A3C9A8" style={{ alignSelf: "center", marginBottom: 16 }} />
            <Text style={styles.gateTitle}>İş / Məktəb</Text>
            <Text style={styles.gateText}>
              Hazırda işləyirsinizmi (ödənişli, ödənişsiz və ya özünüzü işlə təmin edən) və ya məktəbə gedirsinizcmi?
            </Text>
            <Text style={styles.gateNote}>
              Cavabınıza görə bu bölməyə aid əlavə suallar veriləcək.
            </Text>
          </View>

          <TouchableOpacity style={styles.gateBtn} onPress={() => handleGateChoice(true)}>
            <MaterialCommunityIcons name="check-circle-outline" size={24} color="#A3C9A8" />
            <Text style={styles.gateBtnText}>Bəli, işləyirəm / məktəbə gedirəm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.gateBtn, styles.gateBtnNo]} onPress={() => handleGateChoice(false)}>
            <MaterialCommunityIcons name="close-circle-outline" size={24} color="#888" />
            <Text style={[styles.gateBtnText, { color: "#555" }]}>Xeyr, işləmirəm / məktəbə getmirəm</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // ── Question Screen ────────────────────────────────────────────────────────
  if (!currentQ) return null;

  const isLastQ =
    (phase === "before_gate" && beforeIdx === beforeGateQuestions.length - 1) ||
    (phase === "work_questions" && workIdx === workQuestions.length - 1) ||
    (phase === "after_gate" && afterIdx === afterGateQuestions.length - 1);

  const prevDomain =
    phase === "before_gate" && beforeIdx > 0
      ? beforeGateQuestions[beforeIdx - 1].domain
      : phase === "work_questions" && workIdx > 0
      ? workQuestions[workIdx - 1].domain
      : phase === "after_gate" && afterIdx > 0
      ? afterGateQuestions[afterIdx - 1].domain
      : null;

  const domainChanged = prevDomain !== currentQ.domain;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WHODAS 2.0</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.progressWrap}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPct}%` as any }]} />
        </View>
        <Text style={styles.progressLabel}>Sual {currentNum} / {totalQ}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {(domainChanged || currentNum === 1) && (
          <View style={styles.domainBadge}>
            <Text style={styles.domainBadgeText}>{currentQ.domainTitle}</Text>
          </View>
        )}

        <View style={styles.questionCard}>
          <View style={styles.qIdBadge}>
            <Text style={styles.qIdText}>{currentQ.id}</Text>
          </View>
          <Text style={styles.questionContext}>Son 30 gün ərzində aşağıdakını yerinə yetirməkdə nə qədər çətinlik çəkdiniz:</Text>
          <Text style={styles.questionText}>{currentQ.text}</Text>
        </View>

        <Text style={styles.scaleHint}>Çətinlik səviyyəsini seçin:</Text>

        {answerOptions.map((opt) => {
          const isSel = selected === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[styles.optionBtn, isSel && styles.optionBtnSelected]}
              onPress={() => setSelected(opt.value)}
              activeOpacity={0.75}
            >
              <View style={[styles.optionCircle, isSel && styles.optionCircleSelected]}>
                <Text style={[styles.optionCircleText, isSel && { color: "#fff" }]}>{opt.value}</Text>
              </View>
              <Text style={[styles.optionLabel, isSel && styles.optionLabelSelected]}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.nextBtn, selected === null && styles.nextBtnDisabled]}
          onPress={handleAnswer}
          disabled={selected === null}
        >
          <Text style={styles.nextBtnText}>{isLastQ && phase !== "before_gate" ? "Nəticəni gör" : "Növbəti"}</Text>
          <MaterialCommunityIcons
            name={isLastQ && phase !== "before_gate" ? "check-circle" : "arrow-right"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#D1DEBE" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 20,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },

  progressWrap: { paddingHorizontal: 16, paddingVertical: 10 },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#A3C9A8" },
  progressLabel: { fontSize: 12, color: "#444", marginTop: 6, textAlign: "center" },

  scroll: { paddingHorizontal: 16, paddingBottom: 36 },

  domainBadge: {
    backgroundColor: "#073D3D",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  domainBadgeText: { color: "#A3C9A8", fontWeight: "700", fontSize: 13 },

  questionCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  qIdBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#A3C9A8",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  qIdText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  questionContext: { fontSize: 12, color: "#888", marginBottom: 8, fontStyle: "italic" },
  questionText: { fontSize: 15, color: "#1A2B2B", lineHeight: 22, fontWeight: "500" },

  scaleHint: { fontSize: 13, color: "#444", marginBottom: 10, fontWeight: "600", textAlign: "center" },

  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
    gap: 12,
  },
  optionBtnSelected: { borderColor: "#A3C9A8", backgroundColor: "#EAF7EC" },
  optionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#A3C9A8",
    alignItems: "center",
    justifyContent: "center",
  },
  optionCircleSelected: { backgroundColor: "#A3C9A8" },
  optionCircleText: { fontSize: 13, fontWeight: "700", color: "#333" },
  optionLabel: { fontSize: 13, color: "#333", flex: 1 },
  optionLabelSelected: { color: "#1E8449", fontWeight: "600" },

  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#A3C9A8",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  nextBtnDisabled: { backgroundColor: "#C8D8C8", opacity: 0.6 },
  nextBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  // Gate
  gateCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    marginTop: 8,
  },
  gateTitle: { fontSize: 18, fontWeight: "700", color: "#073D3D", textAlign: "center", marginBottom: 12 },
  gateText: { fontSize: 15, color: "#333", lineHeight: 22, textAlign: "center", marginBottom: 12 },
  gateNote: { fontSize: 12, color: "#888", textAlign: "center", fontStyle: "italic" },
  gateBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#A3C9A8",
  },
  gateBtnNo: { borderColor: "#ccc" },
  gateBtnText: { fontSize: 14, fontWeight: "600", color: "#1E8449", flex: 1 },

  // Result
  resultScroll: { padding: 16, paddingBottom: 40 },
  resultHeading: { fontSize: 22, fontWeight: "bold", color: "#073D3D", textAlign: "center", marginBottom: 16 },

  resultCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  resultEmoji: { fontSize: 48, marginBottom: 8 },
  resultTitle: { fontSize: 20, fontWeight: "800", marginBottom: 2 },
  resultRange: { fontSize: 13, fontWeight: "600", marginBottom: 14, opacity: 0.8 },
  scoreRow: { flexDirection: "row", alignItems: "center", marginBottom: 14, gap: 8 },
  scoreBox: { alignItems: "center", flex: 1 },
  scoreVal: { fontSize: 20, fontWeight: "800" },
  scoreLabel: { fontSize: 10, color: "#666", marginTop: 2 },
  scoreDivider: { width: 1, height: 36, backgroundColor: "rgba(0,0,0,0.1)" },
  resultNote: { fontSize: 13, color: "#444", textAlign: "center", lineHeight: 20 },

  formulaCard: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  formulaTitle: { fontSize: 12, color: "#888", fontWeight: "600", textTransform: "uppercase", marginBottom: 6 },
  formulaText: { fontSize: 12, color: "#333", fontFamily: "monospace" },
  formulaNote: { fontSize: 11, color: "#888", marginTop: 6, fontStyle: "italic" },

  domainCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  domainCardTitle: {
    fontSize: 13,
    color: "#888",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  domainRow: { marginBottom: 12 },
  domainRowTop: { flexDirection: "row", alignItems: "center", marginBottom: 5, gap: 6 },
  domainKey: { fontSize: 11, fontWeight: "700", color: "#073D3D", minWidth: 34 },
  domainTitle: { fontSize: 12, color: "#333", flex: 1 },
  domainScore: { fontSize: 12, fontWeight: "700", color: "#073D3D" },
  domainAvg: { fontSize: 11, color: "#888", minWidth: 40, textAlign: "right" },
  domainBarBg: {
    height: 6,
    backgroundColor: "rgba(0,0,0,0.08)",
    borderRadius: 3,
    overflow: "hidden",
  },
  domainBarFill: { height: "100%", borderRadius: 3 },

  scaleCard: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  scaleCardTitle: { fontSize: 12, color: "#888", fontWeight: "600", textTransform: "uppercase", marginBottom: 10 },
  scaleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  scaleDot: { width: 10, height: 10, borderRadius: 5 },
  scaleRange: { fontSize: 12, fontWeight: "600", color: "#333", minWidth: 55 },
  scaleLabel: { fontSize: 12, color: "#555" },

  disclaimer: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 16,
    lineHeight: 16,
  },

  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#A3C9A8",
    paddingVertical: 13,
    borderRadius: 12,
  },
  btnBack: { backgroundColor: "#6BA582" },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
