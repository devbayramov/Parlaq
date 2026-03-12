import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import type { FlatList as FlatListType } from "react-native";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";

const ONBOARDING_COMPLETE_KEY = "onboarding_complete";

const ExerciseIllustration = () => (
  <View style={{ width: 260, height: 280, alignItems: "center", justifyContent: "center" }}>
    <View style={{ width: 210, height: 210, borderRadius: 105, backgroundColor: "#073D3D", opacity: 0.1, position: "absolute" }} />
    <View style={{ width: 160, height: 160, borderRadius: 80, backgroundColor: "#073D3D", opacity: 0.08, position: "absolute" }} />
    <MaterialCommunityIcons name="run-fast" size={110} color="#073D3D" />
    <View style={{ position: "absolute", top: 18, right: 22, backgroundColor: "#fff", borderRadius: 24, padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
      <MaterialCommunityIcons name="heart-pulse" size={28} color="#C0392B" />
    </View>
    <View style={{ position: "absolute", bottom: 22, left: 18, backgroundColor: "#fff", borderRadius: 24, padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
      <MaterialCommunityIcons name="dumbbell" size={28} color="#073D3D" />
    </View>
    <View style={{ position: "absolute", bottom: 28, right: 16, backgroundColor: "#fff", borderRadius: 24, padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
      <MaterialCommunityIcons name="timer-outline" size={26} color="#2A7F7F" />
    </View>
  </View>
);

const MedicalIllustration = () => (
  <View style={{ width: 260, height: 280, alignItems: "center", justifyContent: "center" }}>
    <View style={{ width: 210, height: 210, borderRadius: 105, backgroundColor: "#073D3D", opacity: 0.1, position: "absolute" }} />
    <View style={{ width: 160, height: 160, borderRadius: 80, backgroundColor: "#073D3D", opacity: 0.08, position: "absolute" }} />
    <MaterialCommunityIcons name="stethoscope" size={110} color="#073D3D" />
    <View style={{ position: "absolute", top: 18, left: 22, backgroundColor: "#fff", borderRadius: 24, padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
      <MaterialCommunityIcons name="clipboard-pulse-outline" size={28} color="#073D3D" />
    </View>
    <View style={{ position: "absolute", top: 20, right: 20, backgroundColor: "#fff", borderRadius: 24, padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
      <MaterialCommunityIcons name="needle" size={26} color="#2A7F7F" />
    </View>
    <View style={{ position: "absolute", bottom: 24, right: 18, backgroundColor: "#fff", borderRadius: 24, padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
      <MaterialCommunityIcons name="pill" size={26} color="#C0392B" />
    </View>
  </View>
);

const IQIllustration = () => (
  <View style={{ width: 260, height: 280, alignItems: "center", justifyContent: "center" }}>
    <View style={{ width: 210, height: 210, borderRadius: 105, backgroundColor: "#073D3D", opacity: 0.1, position: "absolute" }} />
    <View style={{ width: 160, height: 160, borderRadius: 80, backgroundColor: "#073D3D", opacity: 0.08, position: "absolute" }} />
    <MaterialCommunityIcons name="head-cog-outline" size={110} color="#073D3D" />
    <View style={{ position: "absolute", top: 18, right: 22, backgroundColor: "#fff", borderRadius: 24, padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
      <MaterialCommunityIcons name="lightbulb-on-outline" size={28} color="#E67E22" />
    </View>
    <View style={{ position: "absolute", bottom: 22, left: 18, backgroundColor: "#fff", borderRadius: 24, padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
      <MaterialCommunityIcons name="puzzle-outline" size={28} color="#2A7F7F" />
    </View>
    <View style={{ position: "absolute", bottom: 28, right: 16, backgroundColor: "#fff", borderRadius: 24, padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
      <MaterialCommunityIcons name="chart-line" size={26} color="#073D3D" />
    </View>
  </View>
);

export default function Index() {
    const [index, setIndex] = useState(0);
    const flatListRef = useRef<FlatListType>(null);
    const { width } = Dimensions.get("window");

    const slides = [
        {
          illustration: <ExerciseIllustration />,
          title: "İdman Hərəkətləri",
          desc: "Sağlam əzələ və kemiklər üçün hər gün sadə idman hərəkətləri edin. Əriyən, çevirmə və uzunlaşdırma hərəkətləri sizi güclü və sağlam saxlayır.",
        },
        {
          illustration: <MedicalIllustration />,
          title: "Tibbi Yoxlanışlar",
          desc: "Mütəşəkkil tibbi yoxlanışlar fərdin sağlığını qoruyur. Boy, çəki və digər əhəmiyyətli göstəriciləri izləyin və həkim məsləhətlərini dinləyin.",
        },
        {
          illustration: <IQIllustration />,
          title: "Testlər və IQ",
          desc: "Zəka testləri və digər psikoloji testlər fərdin intellektual inkişafını ölçür. Düşüncə, yaddaş və yaradıcılığı inkişaf etdirmək üçün məşqlər edin.",
        },
      ];

    const handleNext = async () => {
        if (index < slides.length - 1) {
          setIndex(index + 1);
          flatListRef.current && flatListRef.current.scrollToIndex({ index: index + 1 });
        } else {
          await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
          router.replace("/auth/register");
        }
    };

    const handleSkip = async () => {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
      router.replace("/auth/register");
    };
    
    return (
        <View style={{ flex: 1, backgroundColor: "#D1DEBE" }}>
          <FlatList
            ref={flatListRef}
            data={slides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setIndex(newIndex);
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  width,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 24,
                  paddingTop: 40,
                }}
              >
                {/* Başlıq */}
                <Text
                  style={{
                    color: "#073D3D",
                    fontWeight: "700",
                    fontSize: 24,
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  {item.title}
                </Text>

                {/* İllüstrasiya */}
                <View style={{ marginBottom: 28 }}>
                  {item.illustration}
                </View>

                {/* Mətn */}
                <View style={{ width: "85%", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#1A2B2B",
                      fontSize: 15,
                      textAlign: "center",
                      lineHeight: 22,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(_, i) => String(i)}
            extraData={index}
          />
        
          {/* Slide göstəricisi (Dots) */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  margin: 3,
                  borderRadius: 5,
                  backgroundColor: i === index ? "#073D3D" : "#A9A9A9"
                }}
              />
            ))}
          </View>

          {/* Düymələr */}
          <View style={{ paddingHorizontal: 24, marginBottom: 40, gap: 12 }}>
            <TouchableOpacity 
              onPress={handleNext} 
              style={{ backgroundColor: "#073D3D", borderRadius: 50, width: "100%", paddingVertical: 15 }}
            >
              <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 }}>
                {index === slides.length - 1 ? "Başla" : "Sonraki"}
              </Text>
            </TouchableOpacity>

            {index < slides.length - 1 && (
              <TouchableOpacity 
                onPress={handleSkip}
                style={{ paddingVertical: 12 }}
              >
                <Text style={{ color: "#073D3D", textAlign: "center", fontWeight: "600", fontSize: 14 }}>
                  Keç
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }