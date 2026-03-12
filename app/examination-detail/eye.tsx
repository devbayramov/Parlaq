import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ─── Snellen cədvəlinə əsaslanan görmə kəskinliyi testi ─────────────────────
const acuitySteps = [
  { id: "a1", acuity: "20/200", fontSize: 64, letter: "E", options: ["E", "F", "B", "P"], correct: "E" },
  { id: "a2", acuity: "20/100", fontSize: 52, letter: "F", options: ["P", "F", "E", "R"], correct: "F" },
  { id: "a3", acuity: "20/70",  fontSize: 42, letter: "D", options: ["D", "O", "Q", "B"], correct: "D" },
  { id: "a4", acuity: "20/50",  fontSize: 34, letter: "N", options: ["N", "M", "H", "K"], correct: "N" },
  { id: "a5", acuity: "20/40",  fontSize: 26, letter: "R", options: ["R", "P", "B", "K"], correct: "R" },
  { id: "a6", acuity: "20/30",  fontSize: 20, letter: "Z", options: ["Z", "S", "N", "X"], correct: "Z" },
  { id: "a7", acuity: "20/25",  fontSize: 16, letter: "T", options: ["T", "I", "L", "J"], correct: "T" },
  { id: "a8", acuity: "20/20",  fontSize: 13, letter: "A", options: ["A", "H", "N", "V"], correct: "A" },
];

// ─── Rəng görməsi testi ───────────────────────────────────────────────────────
const colorSteps = [
  {
    id: "c1",
    question: "Göründüyü rəngi seçin",
    color: "#C0392B",
    textColor: "#fff",
    sampleText: "QIRMIZI",
    options: ["Qırmızı", "Yaşıl", "Narıncı", "Bənövşəyi"],
    correct: "Qırmızı",
  },
  {
    id: "c2",
    question: "Göründüyü rəngi seçin",
    color: "#27AE60",
    textColor: "#fff",
    sampleText: "YAŞIL",
    options: ["Mavi", "Yaşıl", "Sarı", "Qara"],
    correct: "Yaşıl",
  },
  {
    id: "c3",
    question: "Göründüyü rəngi seçin",
    color: "#2471A3",
    textColor: "#fff",
    sampleText: "MAVİ",
    options: ["Bənövşəyi", "Qırmızı", "Mavi", "Boz"],
    correct: "Mavi",
  },
];

// ─── Kontrast həssaslıq testi ────────────────────────────────────────────────
const contrastSteps = [
  {
    id: "k1",
    question: "Mətnin içindəki hərfi oxuyun",
    bg: "#BBBBBB",
    textColor: "#999999",
    letter: "G",
    options: ["C", "G", "Q", "O"],
    correct: "G",
  },
  {
    id: "k2",
    question: "Mətnin içindəki hərfi oxuyun",
    bg: "#D8D8D8",
    textColor: "#BBBBBB",
    letter: "K",
    options: ["K", "H", "X", "F"],
    correct: "K",
  },
];

// ─── Növbəti sualın mərhələsini müəyyənləşdir ────────────────────────────────
type Phase = "acuity" | "color" | "contrast" | "result";

const totalQuestions = acuitySteps.length + colorSteps.length + contrastSteps.length;

function getPhaseAndIndex(globalIdx: number): { phase: Phase; localIdx: number } {
  if (globalIdx < acuitySteps.length)
    return { phase: "acuity", localIdx: globalIdx };
  if (globalIdx < acuitySteps.length + colorSteps.length)
    return { phase: "color", localIdx: globalIdx - acuitySteps.length };
  if (globalIdx < totalQuestions)
    return { phase: "contrast", localIdx: globalIdx - acuitySteps.length - colorSteps.length };
  return { phase: "result", localIdx: 0 };
}

function getAcuityLabel(correctAcuity: number): { label: string; color: string; note: string } {
  if (correctAcuity === 8) return { label: "20/20 — Mükəmməl", color: "#27AE60", note: "Görməniz normaldır." };
  if (correctAcuity === 7) return { label: "20/25 — Yaxşı", color: "#2ECC71", note: "Görməniz demək olar ki, normaldır." };
  if (correctAcuity >= 5) return { label: "20/40 — Orta", color: "#F39C12", note: "Yüngül görmə zəifliyi ola bilər. Müayinə tövsiyə olunur." };
  if (correctAcuity >= 3) return { label: "20/70 — Zəif", color: "#E67E22", note: "Görmə zəifliyi var. Mütəxəssisə müraciət edin." };
  return { label: "20/200 — Çox zəif", color: "#C0392B", note: "Mütləq həkimə müraciət edin." };
}

export default function EyeExamination() {
  const router = useRouter();
  const [currentGlobal, setCurrentGlobal] = useState(0);
  const [answers, setAnswers] = useState<{ [id: string]: boolean }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const { phase, localIdx } = getPhaseAndIndex(currentGlobal);
  const isResult = phase === "result";

  const acuityCorrect = acuitySteps.filter((s) => answers[s.id] === true).length;
  const colorCorrect  = colorSteps.filter((s)  => answers[s.id] === true).length;
  const contrastCorrect = contrastSteps.filter((s) => answers[s.id] === true).length;
  const acuityInfo = getAcuityLabel(acuityCorrect);

  const handleAnswer = (text: string, correct: boolean, id: string) => {
    if (showFeedback) return;
    setSelectedAnswer(text);
    setShowFeedback(true);
    setAnswers((prev) => ({ ...prev, [id]: correct }));
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setCurrentGlobal((i) => i + 1);
    }, 600);
  };

  const reset = () => {
    setCurrentGlobal(0);
    setAnswers({});
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  // ─── Nəticə ekranı ──────────────────────────────────────────────────────
  if (isResult) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Göz yoxlanışı</Text>
          <View style={{ width: 28 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultScroll}>
          <MaterialCommunityIcons name="eye-check-outline" size={72} color="#A3C9A8" style={{ alignSelf: "center", marginBottom: 16 }} />
          <Text style={styles.resultHeading}>Nəticələr</Text>

          {/* Görmə kəskinliyi */}
          <View style={styles.resultCard}>
            <Text style={styles.resultCardTitle}>Görmə kəskinliyi</Text>
            <Text style={[styles.resultAcuity, { color: acuityInfo.color }]}>{acuityInfo.label}</Text>
            <Text style={styles.resultNote}>{acuityInfo.note}</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultSub}>Düzgün: {acuityCorrect} / {acuitySteps.length}</Text>
            </View>
          </View>

          {/* Rəng görməsi */}
          <View style={styles.resultCard}>
            <Text style={styles.resultCardTitle}>Rəng görməsi</Text>
            <View style={styles.resultRow}>
              {colorSteps.map((s) => (
                <View key={s.id} style={[styles.colorDot, { backgroundColor: s.color, borderColor: answers[s.id] ? "#27AE60" : "#C0392B" }]}>
                  <MaterialCommunityIcons name={answers[s.id] ? "check" : "close"} size={14} color="#fff" />
                </View>
              ))}
            </View>
            <Text style={styles.resultSub}>Düzgün: {colorCorrect} / {colorSteps.length}</Text>
            {colorCorrect < colorSteps.length && (
              <Text style={styles.resultNote}>Rəng görmə çatışmazlığı ola bilər. Həkim müayinəsi tövsiyə olunur.</Text>
            )}
          </View>

          {/* Kontrast həssaslığı */}
          <View style={styles.resultCard}>
            <Text style={styles.resultCardTitle}>Kontrast həssaslığı</Text>
            <Text style={styles.resultSub}>Düzgün: {contrastCorrect} / {contrastSteps.length}</Text>
            {contrastCorrect < contrastSteps.length && (
              <Text style={styles.resultNote}>Kontrast həssaslığınız azalmış ola bilər.</Text>
            )}
          </View>

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

  // ─── Sual ekranı ─────────────────────────────────────────────────────────
  let currentStep: any;
  let questionText = "";
  let optionsList: string[] = [];
  let correctAnswer = "";

  if (phase === "acuity") {
    currentStep = acuitySteps[localIdx];
    questionText = "Hansı hərfi görürsünüz?";
    optionsList = currentStep.options;
    correctAnswer = currentStep.correct;
  } else if (phase === "color") {
    currentStep = colorSteps[localIdx];
    questionText = currentStep.question;
    optionsList = currentStep.options;
    correctAnswer = currentStep.correct;
  } else {
    currentStep = contrastSteps[localIdx];
    questionText = currentStep.question;
    optionsList = currentStep.options;
    correctAnswer = currentStep.correct;
  }

  const phaseLabel =
    phase === "acuity" ? `Görmə kəskinliyi · Sıra ${localIdx + 1}/${acuitySteps.length}` :
    phase === "color"  ? `Rəng görməsi · Sual ${localIdx + 1}/${colorSteps.length}` :
                         `Kontrast həssaslığı · Sual ${localIdx + 1}/${contrastSteps.length}`;

  return (
    <View style={styles.container}>
      {/* Başlıq */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Göz yoxlanışı</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* İrəliləyiş */}
      <View style={styles.progressWrap}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentGlobal + 1) / totalQuestions) * 100}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{phaseLabel}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Snellen kartı — görmə kəskinliyi */}
        {phase === "acuity" && (
          <View style={styles.snellenCard}>
            <View style={styles.snellenAcuityBadge}>
              <Text style={styles.snellenAcuityText}>{currentStep.acuity}</Text>
            </View>
            <Text style={[styles.snellenLetter, { fontSize: currentStep.fontSize }]}>
              {currentStep.letter}
            </Text>
          </View>
        )}

        {/* Rəng kartı */}
        {phase === "color" && (
          <View style={[styles.colorCard, { backgroundColor: currentStep.color }]}>
            <Text style={[styles.colorCardText, { color: currentStep.textColor }]}>
              {currentStep.sampleText}
            </Text>
          </View>
        )}

        {/* Kontrast kartı */}
        {phase === "contrast" && (
          <View style={[styles.contrastCard, { backgroundColor: currentStep.bg }]}>
            <Text style={[styles.contrastLetter, { color: currentStep.textColor }]}>
              {currentStep.letter}
            </Text>
          </View>
        )}

        {/* Sual */}
        <Text style={styles.question}>{questionText}</Text>

        {/* Cavab düymələri */}
        <View style={styles.optionsWrap}>
          {optionsList.map((opt) => {
            let bg = "rgba(255,255,255,0.85)";
            let borderColor = "transparent";
            if (showFeedback && selectedAnswer === opt) {
              bg = opt === correctAnswer ? "#D5F5E3" : "#FADBD8";
              borderColor = opt === correctAnswer ? "#27AE60" : "#C0392B";
            }
            return (
              <TouchableOpacity
                key={opt}
                style={[styles.optionBtn, { backgroundColor: bg, borderColor, borderWidth: 2 }]}
                onPress={() => handleAnswer(opt, opt === correctAnswer, currentStep.id)}
                activeOpacity={0.75}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

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
  progressBar: { height: 8, backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#A3C9A8" },
  progressLabel: { fontSize: 12, color: "#444", marginTop: 6, textAlign: "center" },

  scroll: { paddingHorizontal: 16, paddingBottom: 24, alignItems: "center" },

  // Snellen
  snellenCard: {
    width: "100%",
    backgroundColor: "#FFFEF5",
    borderRadius: 16,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 180,
  },
  snellenAcuityBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#073D3D",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  snellenAcuityText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  snellenLetter: {
    fontWeight: "700",
    color: "#111",
    letterSpacing: 2,
    fontFamily: "System",
  },

  // Rəng
  colorCard: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  colorCardText: { fontSize: 32, fontWeight: "800", letterSpacing: 4 },

  // Kontrast
  contrastCard: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  contrastLetter: { fontSize: 72, fontWeight: "700" },

  question: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A2B2B",
    textAlign: "center",
    marginBottom: 20,
  },
  optionsWrap: { width: "100%", gap: 10 },
  optionBtn: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  optionText: { fontSize: 15, fontWeight: "600", color: "#333" },

  // Nəticə
  resultScroll: { padding: 16, paddingBottom: 40 },
  resultHeading: { fontSize: 22, fontWeight: "bold", color: "#073D3D", textAlign: "center", marginBottom: 20 },
  resultCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  resultCardTitle: { fontSize: 13, color: "#888", marginBottom: 8, fontWeight: "600", textTransform: "uppercase" },
  resultAcuity: { fontSize: 22, fontWeight: "800", marginBottom: 6 },
  resultNote: { fontSize: 13, color: "#555", marginTop: 6, lineHeight: 18 },
  resultSub: { fontSize: 14, color: "#444", marginTop: 4 },
  resultRow: { flexDirection: "row", gap: 8, marginTop: 8, alignItems: "center" },
  colorDot: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: "center", justifyContent: "center",
    borderWidth: 3,
  },
  btn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, backgroundColor: "#A3C9A8", paddingVertical: 13, borderRadius: 12,
  },
  btnBack: { backgroundColor: "#6BA582" },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
