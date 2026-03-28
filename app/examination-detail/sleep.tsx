import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Tezlik seçimləri (0-3) ───────────────────────────────────────────────────
const freqOptions = [
  { value: 0, label: "Bu ay olmayıb" },
  { value: 1, label: "Həftədə 1 dəfədən az" },
  { value: 2, label: "Həftədə 1 və ya 2 dəfə" },
  { value: 3, label: "Həftədə 3 dəfədən çox" },
];

const latencyOptions = [
  { value: 0, label: "15 dəqiqədən az" },
  { value: 1, label: "16 – 30 dəqiqə" },
  { value: 2, label: "31 – 60 dəqiqə" },
  { value: 3, label: "60 dəqiqədən çox" },
];

const durationOptions = [
  { value: 0, label: "7 saatdan çox" },
  { value: 1, label: "6 – 7 saat" },
  { value: 2, label: "5 – 6 saat" },
  { value: 3, label: "5 saatdan az" },
];

const qualityOptions = [
  { value: 0, label: "Əla" },
  { value: 1, label: "Yaxşı" },
  { value: 2, label: "Pis" },
  { value: 3, label: "Çox pis" },
];

const motivationOptions = [
  { value: 0, label: "Qətiyyən" },
  { value: 1, label: "Nadirən" },
  { value: 2, label: "Bəzən" },
  { value: 3, label: "Tez-tez" },
];

// ─── Addım tərifi ────────────────────────────────────────────────────────────
type StepKind = "time" | "options";

interface Step {
  id: string;
  kind: StepKind;
  section: string;
  question: string;
  hint?: string;
  options?: { value: number; label: string }[];
}

const steps: Step[] = [
  {
    id: "q1",
    kind: "time",
    section: "Sual 1",
    question: "Bu ay ərzində yatağa getmə zamanınız:",
    hint: "Format: SS:DD  (məs. 23:30)",
  },
  {
    id: "q2",
    kind: "options",
    section: "Sual 2",
    question: "Bu ay ərzində gündəlik yuxuya getməyə nə qədər müddət ayırmısınız?",
    options: latencyOptions,
  },
  {
    id: "q3",
    kind: "time",
    section: "Sual 3",
    question: "Bu ay ərzində gündəlik saat neçədə oyanmısınız?",
    hint: "Format: SS:DD  (məs. 07:30)",
  },
  {
    id: "q4",
    kind: "options",
    section: "Sual 4",
    question: "Bu ay ərzində bir gecəlik yuxu müddətiniz (yuxuya getmə vaxtı nəzərə alınmadan):",
    options: durationOptions,
  },
  {
    id: "q5a",
    kind: "options",
    section: "Sual 5a",
    question: "30 dəqiqə ərzində yuxuya getməmək",
    hint: "Yuxu rejiminizdə bu çətinlik nə sıxlıqda olub?",
    options: freqOptions,
  },
  {
    id: "q5b",
    kind: "options",
    section: "Sual 5b",
    question: "Gecə yarısı və ya səhərə yaxın yuxunun pozulması",
    hint: "Yuxu rejiminizdə bu çətinlik nə sıxlıqda olub?",
    options: freqOptions,
  },
  {
    id: "q5c",
    kind: "options",
    section: "Sual 5c",
    question: "Tualetə qalxma",
    hint: "Yuxu rejiminizdə bu çətinlik nə sıxlıqda olub?",
    options: freqOptions,
  },
  {
    id: "q5d",
    kind: "options",
    section: "Sual 5d",
    question: "Təngnəfəslik",
    hint: "Yuxu rejiminizdə bu çətinlik nə sıxlıqda olub?",
    options: freqOptions,
  },
  {
    id: "q5e",
    kind: "options",
    section: "Sual 5e",
    question: "Öskürək və xorultu",
    hint: "Yuxu rejiminizdə bu çətinlik nə sıxlıqda olub?",
    options: freqOptions,
  },
  {
    id: "q5f",
    kind: "options",
    section: "Sual 5f",
    question: "Üşütmə",
    hint: "Yuxu rejiminizdə bu çətinlik nə sıxlıqda olub?",
    options: freqOptions,
  },
  {
    id: "q5g",
    kind: "options",
    section: "Sual 5g",
    question: "İsinmə",
    hint: "Yuxu rejiminizdə bu çətinlik nə sıxlıqda olub?",
    options: freqOptions,
  },
  {
    id: "q5h",
    kind: "options",
    section: "Sual 5h",
    question: "Kabus görmə",
    hint: "Yuxu rejiminizdə bu çətinlik nə sıxlıqda olub?",
    options: freqOptions,
  },
  {
    id: "q5i",
    kind: "options",
    section: "Sual 5i",
    question: "Ağrı",
    hint: "Yuxu rejiminizdə bu çətinlik nə sıxlıqda olub?",
    options: freqOptions,
  },
  {
    id: "q5j",
    kind: "options",
    section: "Sual 5j",
    question: "Digər narahatlıqlar (ümumi)",
    hint: "Yuxu rejiminizdə bu çətinlik nə sıxlıqda olub?",
    options: freqOptions,
  },
  {
    id: "q6",
    kind: "options",
    section: "Sual 6",
    question: "Bu ay ərzində yuxu probleminiz üçün dərman vasitəsi nə sıxlıqda qəbul etmisiniz?",
    options: freqOptions,
  },
  {
    id: "q7",
    kind: "options",
    section: "Sual 7",
    question: "Gündəlik fəaliyyətinizdə (sosial aktivlik, yemək zamanı, avtomobil idarə edərkən) oyaq qalmaqda çətinlik çəkmisinizmi?",
    options: freqOptions,
  },
  {
    id: "q8",
    kind: "options",
    section: "Sual 8",
    question: "Gündəlik fəaliyyətinizdə motivasiyanızı itirirsinizmi?",
    options: motivationOptions,
  },
  {
    id: "q9",
    kind: "options",
    section: "Sual 9",
    question: "Bu ay ərzində yuxu keyfiyyətinizi necə qiymətləndirərsiniz?",
    options: qualityOptions,
  },
];

// ─── Vaxt köməkçiləri ────────────────────────────────────────────────────────
function parseTimeToMinutes(t: string): number | null {
  const match = t.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

function minutesToHours(mins: number): number {
  return mins / 60;
}

// ─── Hesablama ───────────────────────────────────────────────────────────────
function calcScore(answers: Record<string, number | string>) {
  const q2 = answers.q2 as number;   // yuxuya getmə müddəti balı (0-3)
  const q4 = answers.q4 as number;   // yuxu müddəti balı (0-3)
  const q5a = answers.q5a as number;
  const q5b = answers.q5b as number;
  const q5c = answers.q5c as number;
  const q5d = answers.q5d as number;
  const q5e = answers.q5e as number;
  const q5f = answers.q5f as number;
  const q5g = answers.q5g as number;
  const q5h = answers.q5h as number;
  const q5i = answers.q5i as number;
  const q5j = answers.q5j as number;
  const q6 = answers.q6 as number;
  const q7 = answers.q7 as number;
  const q8 = answers.q8 as number;
  const q9 = answers.q9 as number;

  // I. Yuxu keyfiyyəti
  const compI = q9;

  // II. Yuxuya getmə: Sual2 + Sual5a → [0→0, 1-2→1, 3-4→2, 5-6→3]
  const sumII = q2 + q5a;
  const compII = sumII === 0 ? 0 : sumII <= 2 ? 1 : sumII <= 4 ? 2 : 3;

  // III. Yuxu müddəti
  const compIII = q4;

  // IV. Yuxu yetərliliyi
  let compIV = 0;
  const bedMin = parseTimeToMinutes(answers.q1 as string);
  const wakeMin = parseTimeToMinutes(answers.q3 as string);
  if (bedMin !== null && wakeMin !== null) {
    // yataqda keçirilən vaxt (dəqiqə)
    let timeInBedMin = wakeMin - bedMin;
    if (timeInBedMin <= 0) timeInBedMin += 24 * 60; // gecəyarısı keçmə
    const timeInBedHours = minutesToHours(timeInBedMin);
    // Sual 4 → real saat (təxmini dəyər orta nöqtəsindən)
    const sleepHoursMap: Record<number, number> = { 0: 7.5, 1: 6.5, 2: 5.5, 3: 4.5 };
    const sleepHours = sleepHoursMap[q4] ?? 6;
    if (timeInBedHours > 0) {
      const efficiency = (sleepHours / timeInBedHours) * 100;
      compIV = efficiency > 85 ? 0 : efficiency >= 75 ? 1 : efficiency >= 65 ? 2 : 3;
    }
  }

  // V. Yuxunu pozan amillər (5b-5i)
  const sumV = q5b + q5c + q5d + q5e + q5f + q5g + q5h + q5i;
  const compV = sumV === 0 ? 0 : sumV <= 9 ? 1 : sumV <= 18 ? 2 : 3;

  // VI. Dərman vasitəsi
  const compVI = q6;

  // VII. Gündəlik aktivlik: Sual7 + Sual8 → [0→0, 1-2→1, 3-4→2, 5-6→3]
  const sumVII = q7 + q8;
  const compVII = sumVII === 0 ? 0 : sumVII <= 2 ? 1 : sumVII <= 4 ? 2 : 3;

  const total = compI + compII + compIII + compIV + compV + compVI + compVII;

  return { compI, compII, compIII, compIV, compV, compVI, compVII, total };
}

function getResult(total: number) {
  if (total <= 5)
    return {
      color: "#27AE60",
      bg: "#D5F5E3",
      border: "#27AE60",
      emoji: "🟢",
      title: "Keyfiyyətli yuxu rejimi",
      desc: "Yuxu keyfiyyətiniz normaldır. Mövcud vərdişlərinizi davam etdirin. İldə bir dəfə rutin müayinə kifayətdir.",
    };
  if (total <= 10)
    return {
      color: "#D4AC0D",
      bg: "#FEF9E7",
      border: "#D4AC0D",
      emoji: "🟡",
      title: "Problemli yuxu rejimi",
      desc: "Yuxunuzda müəyyən problemlər var. Yuxu gigiyenasına diqqət edin: eyni vaxtda yatıb durun, ekran vaxtını azaldın. Davamlı olarsa həkimə müraciət edin.",
    };
  if (total <= 15)
    return {
      color: "#E67E22",
      bg: "#FDEBD0",
      border: "#E67E22",
      emoji: "🟠",
      title: "Keyfiyyətsiz yuxu rejimi",
      desc: "Yuxu keyfiyyətiniz aşağıdır. Bu hal gündəlik fəaliyyətinizə ciddi təsir göstərir. Yaxın vaxtda yuxu mütəxəssisinə və ya terapevtə müraciət etməyiniz tövsiyə olunur.",
    };
  return {
    color: "#C0392B",
    bg: "#FADBD8",
    border: "#C0392B",
    emoji: "🔴",
    title: "Ciddi yuxu problemi",
    desc: "Yuxu pozğunluğu kliniki səviyyədədir. ÜST tövsiyəsinə görə bu vəziyyət yuxu apneyası, xroniki insomnia və ya digər yuxu pozğunluğuna işarə edə bilər. Təcili həkim müayinəsi tələb olunur.",
  };
}

// ─── Komponent ───────────────────────────────────────────────────────────────
export default function SleepExamination() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [timeInput, setTimeInput] = useState("");
  const [timeError, setTimeError] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const step = steps[currentStep];
  const progress = (currentStep + 1) / steps.length;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (step.kind === "time") {
      const mins = parseTimeToMinutes(timeInput);
      if (mins === null) {
        setTimeError("Zəhmət olmasa düzgün vaxt daxil edin (məs. 23:30)");
        return;
      }
      setAnswers((prev) => ({ ...prev, [step.id]: timeInput.trim() }));
      setTimeInput("");
      setTimeError("");
    } else {
      if (selectedOption === null) return;
      setAnswers((prev) => ({ ...prev, [step.id]: selectedOption }));
      setSelectedOption(null);
    }

    if (isLast) {
      setShowResult(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setTimeInput("");
    setTimeError("");
    setSelectedOption(null);
    setShowResult(false);
  };

  // ─── Nəticə ekranı ──────────────────────────────────────────────────────
  if (showResult) {
    const scores = calcScore(answers);
    const result = getResult(scores.total);

    const components = [
      { label: "I. Yuxu keyfiyyəti", score: scores.compI, note: "Sual 9" },
      { label: "II. Yuxuya getmə", score: scores.compII, note: "Sual 2 + 5a" },
      { label: "III. Yuxu müddəti", score: scores.compIII, note: "Sual 4" },
      { label: "IV. Yuxu yetərliliyi", score: scores.compIV, note: "Sual 4 ÷ (Sual 3 − Sual 1)" },
      { label: "V. Yuxunu pozan amillər", score: scores.compV, note: "Sual 5b–5i" },
      { label: "VI. Dərman vasitəsi", score: scores.compVI, note: "Sual 6" },
      { label: "VII. Gündəlik aktivlik", score: scores.compVII, note: "Sual 7 + 8" },
    ];

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Yuxu keyfiyyəti</Text>
          <View style={{ width: 28 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultScroll}>
          <MaterialCommunityIcons
            name="sleep"
            size={72}
            color="#A3C9A8"
            style={{ alignSelf: "center", marginBottom: 16 }}
          />
          <Text style={styles.resultHeading}>Nəticə</Text>

          {/* Əsas nəticə */}
          <View style={[styles.resultCard, { backgroundColor: result.bg, borderColor: result.border }]}>
            <Text style={styles.resultEmoji}>{result.emoji}</Text>
            <Text style={[styles.resultTitle, { color: result.color }]}>{result.title}</Text>
            <Text style={[styles.resultTotal, { color: result.color }]}>
              Ümumi bal: {scores.total} / 21
            </Text>
            <Text style={styles.resultDesc}>{result.desc}</Text>
          </View>

          {/* Komponent balları */}
          <View style={styles.compCard}>
            <Text style={styles.compCardTitle}>Komponent balları</Text>
            {components.map((c) => (
              <View key={c.label} style={styles.compRow}>
                <View style={styles.compLeft}>
                  <Text style={styles.compLabel}>{c.label}</Text>
                  <Text style={styles.compNote}>{c.note}</Text>
                </View>
                <View style={[styles.compBadge, { backgroundColor: c.score === 0 ? "#D5F5E3" : c.score === 1 ? "#FEF9E7" : c.score === 2 ? "#FDEBD0" : "#FADBD8" }]}>
                  <Text style={[styles.compScore, { color: c.score === 0 ? "#27AE60" : c.score === 1 ? "#D4AC0D" : c.score === 2 ? "#E67E22" : "#C0392B" }]}>
                    {c.score}
                  </Text>
                </View>
              </View>
            ))}
            <View style={styles.compTotal}>
              <Text style={styles.compTotalLabel}>Cəm:</Text>
              <Text style={[styles.compTotalValue, { color: result.color }]}>{scores.total}</Text>
            </View>
          </View>

          {/* Miqyas */}
          <View style={styles.scaleCard}>
            <Text style={styles.scaleTitle}>Bal miqyası</Text>
            {[
              { range: "0 – 5", label: "Keyfiyyətli yuxu", color: "#27AE60" },
              { range: "6 – 10", label: "Problemli yuxu", color: "#D4AC0D" },
              { range: "11 – 15", label: "Keyfiyyətsiz yuxu", color: "#E67E22" },
              { range: "16 – 21", label: "Ciddi yuxu problemi", color: "#C0392B" },
            ].map((item) => (
              <View key={item.range} style={styles.scaleRow}>
                <View style={[styles.scaleDot, { backgroundColor: item.color }]} />
                <Text style={styles.scaleRange}>{item.range}</Text>
                <Text style={styles.scaleLabel}>{item.label}</Text>
              </View>
            ))}
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
  const canProceed =
    step.kind === "time" ? timeInput.trim().length > 0 : selectedOption !== null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yuxu keyfiyyəti</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* İrəliləyiş */}
      <View style={styles.progressWrap}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          Addım {currentStep + 1} / {steps.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Sual kartı */}
        <View style={styles.questionCard}>
          <View style={styles.questionBadge}>
            <Text style={styles.questionBadgeText}>{step.section}</Text>
          </View>
          <Text style={styles.questionText}>{step.question}</Text>
          {step.hint ? <Text style={styles.hintText}>{step.hint}</Text> : null}
        </View>

        {/* Vaxt girişi */}
        {step.kind === "time" && (
          <View style={styles.timeWrap}>
            <TextInput
              ref={inputRef}
              style={[styles.timeInput, timeError ? styles.timeInputError : null]}
              value={timeInput}
              onChangeText={(v) => {
                setTimeInput(v);
                setTimeError("");
              }}
              placeholder="SS:DD"
              placeholderTextColor="#aaa"
              keyboardType="numbers-and-punctuation"
              maxLength={5}
              autoFocus
            />
            {timeError ? <Text style={styles.errorText}>{timeError}</Text> : null}
          </View>
        )}

        {/* Seçim düymələri */}
        {step.kind === "options" && step.options && (
          <View style={styles.optionsWrap}>
            {step.options.map((opt) => {
              const isSel = selectedOption === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.optionBtn, isSel && styles.optionBtnSelected]}
                  onPress={() => setSelectedOption(opt.value)}
                  activeOpacity={0.75}
                >
                  <View style={[styles.optionDot, isSel && styles.optionDotSelected]}>
                    {isSel && <View style={styles.optionDotInner} />}
                  </View>
                  <View style={styles.optionTextWrap}>
                    <Text style={styles.optionScore}>{opt.value} bal</Text>
                    <Text style={[styles.optionLabel, isSel && styles.optionLabelSelected]}>
                      {opt.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* İrəli düyməsi */}
        <TouchableOpacity
          style={[styles.nextBtn, !canProceed && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!canProceed}
        >
          <Text style={styles.nextBtnText}>
            {isLast ? "Nəticəyə bax" : "Növbəti"}
          </Text>
          <MaterialCommunityIcons
            name={isLast ? "check-circle-outline" : "arrow-right"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Stillər ────────────────────────────────────────────────────────────────
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

  scroll: { paddingHorizontal: 16, paddingBottom: 32 },

  questionCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  questionBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#073D3D",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  questionBadgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  questionText: { fontSize: 15, fontWeight: "600", color: "#1A2B2B", lineHeight: 22 },
  hintText: { fontSize: 12, color: "#888", marginTop: 8 },

  timeWrap: { marginBottom: 20 },
  timeInput: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#073D3D",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#A3C9A8",
    letterSpacing: 4,
  },
  timeInputError: { borderColor: "#C0392B" },
  errorText: { color: "#C0392B", fontSize: 13, marginTop: 6, textAlign: "center" },

  optionsWrap: { gap: 10, marginBottom: 20 },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: "transparent",
    gap: 12,
  },
  optionBtnSelected: { backgroundColor: "#EAF7EE", borderColor: "#A3C9A8" },
  optionDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },
  optionDotSelected: { borderColor: "#27AE60" },
  optionDotInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#27AE60" },
  optionTextWrap: { flex: 1 },
  optionScore: { fontSize: 11, color: "#888", marginBottom: 2 },
  optionLabel: { fontSize: 14, fontWeight: "600", color: "#333" },
  optionLabelSelected: { color: "#1A5C35" },

  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#A3C9A8",
    paddingVertical: 15,
    borderRadius: 14,
  },
  nextBtnDisabled: { backgroundColor: "#C5D9C7", opacity: 0.6 },
  nextBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  // Nəticə
  resultScroll: { padding: 16, paddingBottom: 40 },
  resultHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#073D3D",
    textAlign: "center",
    marginBottom: 20,
  },
  resultCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    alignItems: "center",
  },
  resultEmoji: { fontSize: 36, marginBottom: 8 },
  resultTitle: { fontSize: 20, fontWeight: "800", textAlign: "center", marginBottom: 4 },
  resultTotal: { fontSize: 14, fontWeight: "600", marginBottom: 12 },
  resultDesc: { fontSize: 14, color: "#333", lineHeight: 20, textAlign: "center" },

  compCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  compCardTitle: {
    fontSize: 13,
    color: "#888",
    marginBottom: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  compRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  compLeft: { flex: 1, paddingRight: 8 },
  compLabel: { fontSize: 13, fontWeight: "600", color: "#333" },
  compNote: { fontSize: 11, color: "#999", marginTop: 2 },
  compBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  compScore: { fontSize: 16, fontWeight: "800" },
  compTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#E0E0E0",
  },
  compTotalLabel: { fontSize: 15, fontWeight: "700", color: "#333" },
  compTotalValue: { fontSize: 20, fontWeight: "800" },

  scaleCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  scaleTitle: {
    fontSize: 13,
    color: "#888",
    marginBottom: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  scaleRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 6 },
  scaleDot: { width: 12, height: 12, borderRadius: 6 },
  scaleRange: { fontSize: 13, fontWeight: "700", color: "#333", width: 60 },
  scaleLabel: { fontSize: 13, color: "#555" },

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
