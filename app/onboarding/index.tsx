import { router } from "expo-router";
import { useRef, useState } from "react";
import type { FlatList as FlatListType } from "react-native";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const [index, setIndex] = useState(0);
    const flatListRef = useRef<FlatListType>(null);
    const { width } = Dimensions.get("window");

    const slides = [
        {
          image: require('../../assets/images/kangaroo1.png'),
          title: "İdman Hərəkətləri",
          desc: "Sağlam əzələ və kemiklər üçün hər gün sadə idman hərəkətləri edin. Əriyən, çevirmə və uzunlaşdırma hərəkətləri sizi güclü və sağlam saxlayır.",
        },
        {
          image: require('../../assets/images/kangaroo2.png'),
          title: "Tibbi Yoxlanışlar",
          desc: "Mütəşəkkil tibbi yoxlanışlar uşağın sağlığını qoruyur. Boy, çəki və digər əhəmiyyətli göstəriciləri izləyin və həkim məsləhətlərini dinləyin.",
        },
        {
          image: require('../../assets/images/kangaroo3.png'),
          title: "Testlər və IQ",
          desc: "Zəka testləri və digər psikoloji testlər uşağın intellektual inkişafını ölçür. Düşüncə, yaddaş və yaradıcılığı inkişaf etdirmək üçün məşqlər edin.",
        },
      ];

    const handleNext = () => {
        if (index < slides.length - 1) {
          setIndex(index + 1);
          flatListRef.current && flatListRef.current.scrollToIndex({ index: index + 1 });
        } else {
            //@ts-ignore
          router.replace("/auth/register"); 
        }
    };

    const handleSkip = () => {
        //@ts-ignore
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

                {/* Şəkil */}
                <Image
                  source={item.image}
                  style={{ width: 260, height: 300, marginBottom: 28 }}
                  resizeMode="contain"
                />

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