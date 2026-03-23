import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const questions = [
  {
    id: 1,
    coefficient: 3,
    text: "Ağzınızın içərisində (dil, yanaq, damaq) 14 gündən artıqdır ki, sağalmayan yara, səbəbsiz qanama, yaxud keçməyən ağ/qırmızı ləkələr müşahidə edirsinizmi?",
  },
  {
    id: 2,
    coefficient: 2.5,
    text: "Gecələr sizi yuxudan oyadan və ya heç bir səbəb olmadan (öz-özünə) başlayan kəskin, döyünən diş ağrınız olurmu?",
  },
  {
    id: 3,
    coefficient: 2,
    text: "Dişlərinizi fırçalayarkən diş ətinizdə qanama, şişkinlik, rəng dəyişikliyi (qızartı) və ya dişdə laxlama varmı?",
  },
  {
    id: 4,
    coefficient: 1.5,
    text: "Dişlərinizin üzərində gözlə görülən qara/qəhvəyi ləkələr, oyuqlar varmı və ya yemək yeyərkən dişlərinizin arasına qida qalıqları sıxışıb qalırmı?",
  },
  {
    id: 5,
    coefficient: 1.2,
    text: "Soyuq, isti, şirin və ya turş qidalar qəbul edərkən dişlərinizdə qısamüddətli (saniyəlik), kəskin sızıldama yaranırmı?",
  },
  {
    id: 6,
    coefficient: 1,
    text: "Ağzınızı açarkən, əsnəyərkən və ya sərt qida çeynəyərkən çənə oynağınızdan (qulaq önü nahiyə) səs (tıqqıltı, xırtıltı) gəlir, yaxud ağrı və ya çənədə kilitlənmə olurmu?",
  },
  {
    id: 7,
    coefficient: 1,
    text: "Çəkilmiş dişlərinizə görə ağzınızda boşluqlar varmı və bu vəziyyət qidaları tam çeynəməyinizə (həzmə) mane olurmu?",
  },
  {
    id: 8,
    coefficient: 0.8,
    text: "Ağzınızda tez-tez quruluq hiss edirsinizmi və ya quru qidaları (məsələn, peçenye) udmaq üçün mütləq su içməyə ehtiyac duyursunuzmu?",
  },
  {
    id: 9,
    coefficient: 0.5,
    text: "Dişlərinizdə əyrilik, üst-üstə minmə (sıxlıq) və ya alt/üst çənənin bağlanmasında narahatlıq hiss edirsinizmi?",
  },
  {
    id: 10,
    coefficient: 0.5,
    text: "Dişlərinizi fırçalamağınıza baxmayaraq, ağzınızda davamlı pis qoxu və ya xoşagəlməz dad hiss edirsinizmi?",
  },
];

const answerOptions = [
  { value: 0, label: "0 – Heç vaxt / Tamamilə yoxdur" },
  { value: 1, label: "1 – Çox nadir / Çox zəif" },
  { value: 2, label: "2 – Bəzən / Qismən narahat edir" },
  { value: 3, label: "3 – Tez-tez / Gündəlik təsir edir" },
  { value: 4, label: "4 – Daimi / Çox şiddətli / Dözülməz" },
];

function getResult(totalScore: number, redFlag: boolean) {
  if (redFlag) {
    return {
      emoji: "🔴",
      color: "#C0392B",
      bg: "#FADBD8",
      title: "Təcili Həkim Müayinəsi",
      note: "Təcili olaraq stomatoloqa müraciət etməlisiniz! Kəskin ağrılar və ya onkoloji/cərrahi ehtiyat tələb edən simptomlar ola bilər.",
    };
  }
  if (totalScore <= 10) {
    return {
      emoji: "🟢",
      color: "#1E8449",
      bg: "#D5F5E3",
      title: "Sağlam",
      note: "Ağız boşluğu sağlamlığınız yaxşıdır. Profilaktik fırçalamaya davam edin və 6 aydan bir rutin həkim baxışından keçin.",
    };
  }
  if (totalScore <= 25) {
    return {
      emoji: "🟡",
      color: "#B7950B",
      bg: "#FEF9E7",
      title: "Diqqət Tələb Edən",
      note: "Bəzi başlanğıc problemləriniz var. Karies və ya diş əti xəstəliklərinin irəliləməməsi üçün yaxın 1-2 ay ərzində profilaktik müalicə üçün stomatoloqa müraciət edin.",
    };
  }
  if (totalScore <= 40) {
    return {
      emoji: "🟠",
      color: "#BA4A00",
      bg: "#FAE5D3",
      title: "Yüksək Risk",
      note: "Ciddi stomatoloji problemləriniz mövcuddur. Çeynəmə funksiyası pozulub və diş itirilməsi riski var. Qısa zamanda peşəkar müdaxilə tələb olunur.",
    };
  }
  return {
    emoji: "🔴",
    color: "#C0392B",
    bg: "#FADBD8",
    title: "Kritik / Qırmızı Bayraq",
    note: "Təcili olaraq stomatoloqa müraciət etməlisiniz! Kəskin ağrılar və ya onkoloji/cərrahi ehtiyat tələb edən simptomlar ola bilər.",
  };
}

export default function DentalExamination() {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<{ [id: number]: number }>({});
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentQ = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;

  const handleSelect = (value: number) => {
    setSelectedValue(value);
  };

  const handleNext = () => {
    if (selectedValue === null) return;
    const newScores = { ...scores, [currentQ.id]: selectedValue };
    setScores(newScores);
    setSelectedValue(null);
    if (isLast) {
      setShowResult(true);
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setScores({});
    setSelectedValue(null);
    setShowResult(false);
  };

  if (showResult) {
    const totalScore = questions.reduce((sum, q) => {
      return sum + (scores[q.id] ?? 0) * q.coefficient;
    }, 0);

    const redFlag =
      (scores[1] ?? 0) >= 3 || (scores[2] ?? 0) >= 3;

    const result = getResult(totalScore, redFlag);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Diş yoxlanışı</Text>
          <View style={{ width: 28 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultScroll}>
          <MaterialCommunityIcons
            name="tooth-outline"
            size={72}
            color="#A3C9A8"
            style={{ alignSelf: "center", marginBottom: 16 }}
          />
          <Text style={styles.resultHeading}>Nəticə</Text>

          {redFlag && (
            <View style={[styles.redFlagCard]}>
              <Text style={styles.redFlagTitle}>Diqqət! Təcili Müraciət</Text>
              <Text style={styles.redFlagNote}>
                1-ci və ya 2-ci suala 3 və ya 4 bal verdiniz. Bu, ciddi bir simptomdur. Ümumi baldan asılı olmayaraq stomatoloqa təcili müraciət etməlisiniz.
              </Text>
            </View>
          )}

          <View style={[styles.resultCard, { backgroundColor: result.bg }]}>
            <Text style={[styles.resultEmoji]}>{result.emoji}</Text>
            <Text style={[styles.resultTitle, { color: result.color }]}>
              {result.title}
            </Text>
            <Text style={[styles.resultScore, { color: result.color }]}>
              {totalScore.toFixed(1)} / 56 bal
            </Text>
            <Text style={styles.resultNote}>{result.note}</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Sual üzrə cavablarınız</Text>
            {questions.map((q) => {
              const val = scores[q.id] ?? 0;
              const contribution = (val * q.coefficient).toFixed(1);
              return (
                <View key={q.id} style={styles.detailRow}>
                  <Text style={styles.detailQNum}>{q.id}.</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.detailQText} numberOfLines={2}>{q.text}</Text>
                    <Text style={styles.detailQScore}>
                      Bal: {val} × {q.coefficient} = {contribution}
                    </Text>
                  </View>
                </View>
              );
            })}
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

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diş yoxlanışı</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.progressWrap}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          Sual {currentIdx + 1} / {questions.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.questionCard}>
          <View style={styles.coeffBadge}>
            <Text style={styles.coeffText}>Əmsal: {currentQ.coefficient}</Text>
          </View>
          <Text style={styles.questionText}>{currentQ.text}</Text>
        </View>

        <Text style={styles.scaleLabel}>Cavabınızı seçin (0–4 bal):</Text>

        {answerOptions.map((opt) => {
          const isSelected = selectedValue === opt.value;
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
              <View style={[styles.optionCircle, isSelected && styles.optionCircleSelected]}>
                <Text style={[styles.optionCircleText, isSelected && { color: "#fff" }]}>
                  {opt.value}
                </Text>
              </View>
              <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.nextBtn, selectedValue === null && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={selectedValue === null}
        >
          <Text style={styles.nextBtnText}>
            {isLast ? "Nəticəni gör" : "Növbəti"}
          </Text>
          <MaterialCommunityIcons
            name={isLast ? "check-circle" : "arrow-right"}
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
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  coeffBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#073D3D",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  coeffText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  questionText: { fontSize: 15, color: "#1A2B2B", lineHeight: 22, fontWeight: "500" },

  scaleLabel: {
    fontSize: 13,
    color: "#444",
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },

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
  optionBtnSelected: {
    borderColor: "#A3C9A8",
    backgroundColor: "#EAF7EC",
  },
  optionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#A3C9A8",
    alignItems: "center",
    justifyContent: "center",
  },
  optionCircleSelected: {
    backgroundColor: "#A3C9A8",
  },
  optionCircleText: { fontSize: 14, fontWeight: "700", color: "#333" },
  optionLabel: { fontSize: 13, color: "#333", flex: 1, flexWrap: "wrap" },
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

  // Result
  resultScroll: { padding: 16, paddingBottom: 40 },
  resultHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#073D3D",
    textAlign: "center",
    marginBottom: 16,
  },
  redFlagCard: {
    backgroundColor: "#FADBD8",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#C0392B",
  },
  redFlagTitle: { fontSize: 15, fontWeight: "700", color: "#C0392B", marginBottom: 6 },
  redFlagNote: { fontSize: 13, color: "#7B241C", lineHeight: 19 },

  resultCard: {
    borderRadius: 14,
    padding: 20,
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  resultEmoji: { fontSize: 48, marginBottom: 8 },
  resultTitle: { fontSize: 20, fontWeight: "800", marginBottom: 4 },
  resultScore: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
  resultNote: { fontSize: 13, color: "#444", textAlign: "center", lineHeight: 20 },

  detailCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  detailTitle: {
    fontSize: 13,
    color: "#888",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  detailQNum: { fontSize: 13, fontWeight: "700", color: "#073D3D", minWidth: 18 },
  detailQText: { fontSize: 12, color: "#555", lineHeight: 16, marginBottom: 2 },
  detailQScore: { fontSize: 12, fontWeight: "600", color: "#2E86C1" },

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
