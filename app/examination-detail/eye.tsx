import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ─── Suallar və əmsallar ──────────────────────────────────────────────────────
const questions = [
  {
    id: 1,
    text: "Gün ərzində gözlərinizdə tez-tez yanma, qum varmış kimi batma və ya səbəbsiz yaşarma olurmu?",
    weight: 1,
  },
  {
    id: 2,
    text: "Qaranlıq və ya zəif işıqlı otağa daxil olduqda gözlərinizin alışması çox uzun çəkirmi və ya qaranlıqda hərəkət etmək sizin üçün həddindən artıq çətindirmi?",
    weight: 1.5,
  },
  {
    id: 3,
    text: "Hər hansı bir gözünüzlə (ayrı-ayrı yoxladıqda) uzaqdakı əşyaları görməkdə çətinlik çəkirsinizmi?",
    weight: 2,
  },
  {
    id: 4,
    text: "Gözünüzdə kəskin və ya xroniki (davamlı) ağrı, sancı və ya diskomfort hiss edirsinizmi?",
    weight: 2.5,
  },
  {
    id: 5,
    text: "Kitab oxumaq, tikiş tikmək və ya telefon ekranına baxmaq kimi yaxın məsafəli işləri görməkdə çətinlik çəkirsinizmi?",
    weight: 1.5,
  },
  {
    id: 6,
    text: "Gözünüzdə bir neçə gündən artıq davam edən və ya ağrı ilə müşayiət olunan qızartı varmı?",
    weight: 1,
  },
  {
    id: 7,
    text: "Baxdığınız əşyalar sanki dumanın və ya suyun arxasındaymış kimi bulanıq görünürmü?",
    weight: 2,
  },
  {
    id: 8,
    text: "Görmə sahənizin kənarlarında qaralma hiss edirsinizmi və ya düz qarşıya baxanda yanları görməkdə çətinlik çəkirsinizmi?",
    weight: 2.5,
  },
  {
    id: 9,
    text: "Parlaq işığa baxanda gözlərinizdə ağrı olurmu və ya gözlərinizi qeyri-ixtiyari yummaq ehtiyacı duyursunuzmu?",
    weight: 1.5,
  },
  {
    id: 10,
    text: "Gözünüzdən irinli, yapışqan və ya həddindən artıq sulu ifrazat gəlirmi?",
    weight: 1.5,
  },
];

const answerOptions = [
  { value: 0, label: "Heç vaxt" },
  { value: 1, label: "Çox nadir hallarda" },
  { value: 2, label: "Bəzən (ayda bir neçə dəfə)" },
  { value: 3, label: "Tez-tez (həftədə bir neçə dəfə)" },
  { value: 4, label: "Həmişə / Daimi / Şiddətli" },
];

// ─── Nəticə məlumatları ───────────────────────────────────────────────────────
function getResult(score: number, redFlag: boolean) {
  if (redFlag) {
    return {
      color: "#C0392B",
      emoji: "🔴",
      title: "TƏCİLİ DİQQƏT",
      subtitle: "Qırmızı Bayraq aşkar olundu",
      description:
        "Sizin cavablarınızda \"Qırmızı Bayraq\" (təcili əlamət) aşkar olundu. Kəskin ağrı və görmə sahəsinin daralması göz daxili təzyiqin kəskin artması və ya torlu qişanın qopması əlaməti ola bilər. Təcili həkim müayinəsi tələb olunur!",
      bg: "#FADBD8",
      border: "#C0392B",
    };
  }
  if (score <= 15) {
    return {
      color: "#27AE60",
      emoji: "🟢",
      title: "Sağlam / Normal",
      subtitle: `Ümumi bal: ${score.toFixed(1)}`,
      description:
        "Gözlərinizin vəziyyəti ÜST standartlarına görə tam stabildir. Hazırda ciddi bir risk görünmür. Hiss etdiyiniz xırda diskomfortlar yorğunluq və ya ekrana çox baxmaqla bağlı ola bilər. İldə 1 dəfə rutin müayinə yetərlidir.",
      bg: "#D5F5E3",
      border: "#27AE60",
    };
  }
  if (score <= 30) {
    return {
      color: "#D4AC0D",
      emoji: "🟡",
      title: "Diqqət tələb edən / Funksional Pozuntu",
      subtitle: `Ümumi bal: ${score.toFixed(1)}`,
      description:
        "Görmə kəskinliyinizdə və ya göz səthində müəyyən problemlər var. Bu ballar adətən eynək ehtiyacı (miopiya, yaxını görmə) və ya xroniki göz quruluğunu göstərir. Gözləriniz daimi gərginlikdədir. Yaxın 1 ay ərzində oftalmoloqdan eynək təyini və ya müalicəvi damcılar üçün məsləhət alın.",
      bg: "#FEF9E7",
      border: "#D4AC0D",
    };
  }
  if (score <= 48) {
    return {
      color: "#E67E22",
      emoji: "🟠",
      title: "Yüksək Risk / Patoloji Proses",
      subtitle: `Ümumi bal: ${score.toFixed(1)}`,
      description:
        "Gözlərinizdə ciddi patoloji dəyişikliklərin başlama ehtimalı yüksəkdir. Bu bal katarakta, başlanğıc qlaukoma və ya torlu qişa problemlərinə işarə edir. Görmə qabiliyyətiniz təhlükədədir. Gecikmədən (1 həftə ərzində) tam cihazlı müayinədən (göz dibi, göz təzyiqi ölçümü) keçməyiniz mütləqdir.",
      bg: "#FDEBD0",
      border: "#E67E22",
    };
  }
  return {
    color: "#C0392B",
    emoji: "🔴",
    title: "Kritik / Təcili Müdaxilə",
    subtitle: `Ümumi bal: ${score.toFixed(1)}`,
    description:
      "Görmənin tamamilə və ya qalıcı itirilməsi riski! ÜST bu səviyyəni \"Təcili Tibbi Yardım\" tələb edən vəziyyət kimi qiymətləndirir. Göz sinirləriniz və ya torlu qişanız ciddi zədələnmiş ola bilər. Vaxt itirmədən ən yaxın oftalmoloji klinikaya müraciət edin.",
    bg: "#FADBD8",
    border: "#C0392B",
  };
}

export default function EyeExamination() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isLast = current === questions.length - 1;

  const handleSelect = (value: number) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (isLast) {
      setShowResult(true);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const reset = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
  };

  // ─── Nəticə hesablaması ───────────────────────────────────────────────────
  if (showResult) {
    const totalScore = answers.reduce((sum, ans, idx) => sum + ans * questions[idx].weight, 0);
    const redFlag = answers[3] >= 3 || answers[7] >= 3; // Q4 (idx=3) or Q8 (idx=7)
    const result = getResult(totalScore, redFlag);

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
          <MaterialCommunityIcons
            name="eye-check-outline"
            size={72}
            color="#A3C9A8"
            style={{ alignSelf: "center", marginBottom: 16 }}
          />
          <Text style={styles.resultHeading}>Nəticə</Text>

          {/* Əsas nəticə kartı */}
          <View style={[styles.resultCard, { backgroundColor: result.bg, borderColor: result.border }]}>
            <Text style={styles.resultEmoji}>{result.emoji}</Text>
            <Text style={[styles.resultTitle, { color: result.color }]}>{result.title}</Text>
            <Text style={[styles.resultSubtitle, { color: result.color }]}>{result.subtitle}</Text>
            <Text style={styles.resultDesc}>{result.description}</Text>
          </View>

          {/* Bal cədvəli */}
          <View style={styles.scaleCard}>
            <Text style={styles.scaleTitle}>Bal miqyası</Text>
            {[
              { range: "0 – 15", label: "Sağlam / Normal", color: "#27AE60" },
              { range: "16 – 30", label: "Diqqət tələb edən", color: "#D4AC0D" },
              { range: "31 – 48", label: "Yüksək Risk", color: "#E67E22" },
              { range: "49 – 68", label: "Kritik / Təcili", color: "#C0392B" },
            ].map((item) => (
              <View key={item.range} style={styles.scaleRow}>
                <View style={[styles.scaleDot, { backgroundColor: item.color }]} />
                <Text style={styles.scaleRange}>{item.range}</Text>
                <Text style={styles.scaleLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* Cavabların icmalı */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Cavablarınızın icmalı</Text>
            {questions.map((q, idx) => {
              const ans = answers[idx];
              const weighted = ans * q.weight;
              return (
                <View key={q.id} style={styles.summaryRow}>
                  <Text style={styles.summaryQ}>S{q.id}:</Text>
                  <Text style={styles.summaryAns}>{answerOptions[ans]?.label ?? "-"}</Text>
                  <Text style={styles.summaryScore}>+{weighted % 1 === 0 ? weighted : weighted.toFixed(1)}</Text>
                </View>
              );
            })}
            <View style={styles.summaryTotal}>
              <Text style={styles.summaryTotalLabel}>Ümumi bal:</Text>
              <Text style={[styles.summaryTotalValue, { color: result.color }]}>
                {totalScore % 1 === 0 ? totalScore : totalScore.toFixed(1)}
              </Text>
            </View>
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

  // ─── Sual ekranı ──────────────────────────────────────────────────────────
  const q = questions[current];
  const progress = (current + 1) / questions.length;

  return (
    <View style={styles.container}>
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
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressLabel}>Sual {current + 1} / {questions.length}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Sual kartı */}
        <View style={styles.questionCard}>
          <View style={styles.questionBadge}>
            <Text style={styles.questionBadgeText}>Sual {q.id}</Text>
          </View>
          <Text style={styles.questionText}>{q.text}</Text>
          <Text style={styles.weightLabel}>Əmsal: {q.weight}</Text>
        </View>

        {/* Cavab seçimləri */}
        <View style={styles.optionsWrap}>
          {answerOptions.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.optionBtn,
                  isSelected && styles.optionBtnSelected,
                ]}
                onPress={() => handleSelect(opt.value)}
                activeOpacity={0.75}
              >
                <View style={[styles.optionDot, isSelected && styles.optionDotSelected]}>
                  {isSelected && <View style={styles.optionDotInner} />}
                </View>
                <View style={styles.optionTextWrap}>
                  <Text style={styles.optionScore}>{opt.value} bal</Text>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {opt.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* İrəli düyməsi */}
        <TouchableOpacity
          style={[styles.nextBtn, selected === null && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={selected === null}
        >
          <Text style={styles.nextBtnText}>{isLast ? "Nəticəyə bax" : "Növbəti sual"}</Text>
          <MaterialCommunityIcons
            name={isLast ? "check-circle-outline" : "arrow-right"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
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
  weightLabel: { fontSize: 12, color: "#888", marginTop: 10 },

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
  optionBtnSelected: {
    backgroundColor: "#EAF7EE",
    borderColor: "#A3C9A8",
  },
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
  resultHeading: { fontSize: 22, fontWeight: "bold", color: "#073D3D", textAlign: "center", marginBottom: 20 },
  resultCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    alignItems: "center",
  },
  resultEmoji: { fontSize: 36, marginBottom: 8 },
  resultTitle: { fontSize: 20, fontWeight: "800", textAlign: "center", marginBottom: 4 },
  resultSubtitle: { fontSize: 14, fontWeight: "600", marginBottom: 12 },
  resultDesc: { fontSize: 14, color: "#333", lineHeight: 20, textAlign: "center" },

  scaleCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  scaleTitle: { fontSize: 13, color: "#888", marginBottom: 10, fontWeight: "700", textTransform: "uppercase" },
  scaleRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 6 },
  scaleDot: { width: 12, height: 12, borderRadius: 6 },
  scaleRange: { fontSize: 13, fontWeight: "700", color: "#333", width: 60 },
  scaleLabel: { fontSize: 13, color: "#555" },

  summaryCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryTitle: { fontSize: 13, color: "#888", marginBottom: 10, fontWeight: "700", textTransform: "uppercase" },
  summaryRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  summaryQ: { fontSize: 12, fontWeight: "700", color: "#073D3D", width: 28 },
  summaryAns: { flex: 1, fontSize: 12, color: "#444" },
  summaryScore: { fontSize: 13, fontWeight: "700", color: "#A3C9A8", width: 36, textAlign: "right" },
  summaryTotal: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingTop: 8, borderTopWidth: 2, borderTopColor: "#E0E0E0" },
  summaryTotalLabel: { fontSize: 15, fontWeight: "700", color: "#333" },
  summaryTotalValue: { fontSize: 18, fontWeight: "800" },

  btn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, backgroundColor: "#A3C9A8", paddingVertical: 13, borderRadius: 12,
  },
  btnBack: { backgroundColor: "#6BA582" },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
