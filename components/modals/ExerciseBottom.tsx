import { Exercise } from "@/.expo/types/routine";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo, useState } from "react";
import {
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import SwitchSelector from "../SwitchSelector";
import { useFirebaseImage } from "@/services/useFirebaseImage";

interface Props {
  exercise: Exercise | null;
  onClose?: () => void;
}

const ExerciseBottom = forwardRef<BottomSheet, Props>(
  ({ exercise, onClose }: Props, ref) => {
    // Define snap points for the bottom sheet
    const snapPoints = useMemo(() => ["50%", "100%"], []);
    const imagePath = exercise?.image
      ? `exerciseImages/${exercise.image}`
      : null;
    const { url: imageUrl, error } = useFirebaseImage(imagePath ?? "");

    const gifPath = exercise?.demo ? `exerciseGifs/${exercise.demo}` : null;
    const { url: gifUrl, error: errorGif } = useFirebaseImage(gifPath ?? "");

    const [gifVisible, setGifVisible] = useState(false);
    const [view, setView] = useState("target");

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        onChange={(index) => {
          if (index === -1) onClose?.();
        }}
      >
        <BottomSheetScrollView className="p-4">
          {exercise ? (
            <>
              <View>
                <Text className="text-xl font-bold mb-2 text-center">
                  {exercise.name}
                </Text>
                {!exercise.image ? (
                  <ImageBackground
                    className="w-full h-48 bg-darkBackground rounded-2xl opacity-90 justify-center items-center"
                    imageStyle={{ borderRadius: 16 }}
                  >
                    <Text className="text-white">No image available</Text>
                  </ImageBackground>
                ) : imageUrl && !error ? (
                  <ImageBackground
                    key={exercise.exerciseId}
                    source={{ uri: imageUrl }}
                    className="w-full h-48 bg-darkBackground rounded-2xl opacity-90"
                    imageStyle={{ borderRadius: 16 }}
                  >
                    <TouchableOpacity
                      className="absolute bottom-2 left-2 bg-secondary px-3 py-1 rounded-md"
                      onPress={() => setGifVisible(true)}
                    >
                      <Text className="text-white font-semibold text-md">
                        View Demo
                      </Text>
                    </TouchableOpacity>
                  </ImageBackground>
                ) : (
                  <ImageBackground
                    className="w-full h-48 bg-darkBackground rounded-2xl opacity-90 justify-center items-center"
                    imageStyle={{ borderRadius: 16 }}
                  >
                    <Text className="text-white">Loading image...</Text>
                  </ImageBackground>
                )}
              </View>

              <View className="mt-4 items-center">
                <SwitchSelector value={view} onChange={setView} />
              </View>

              <Modal
                visible={gifVisible}
                animationType="fade"
                onRequestClose={() => setGifVisible(false)}
              >
                <View className="flex-1 bg-black/80 justify-center items-center">
                  {!exercise.demo ? (
                    <Text className="text-white">No demo available</Text>
                  ) : gifUrl && !errorGif ? (
                    <Image
                      source={{ uri: gifUrl }}
                      style={{ width: 300, height: 300 }}
                    />
                  ) : (
                    <Text className="text-white">Loading GIF...</Text>
                  )}
                  <TouchableOpacity
                    className="mt-4 bg-red-600 px-4 py-2 rounded-lg"
                    onPress={() => setGifVisible(false)}
                  >
                    <Text className="text-white font-semibold">Close</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </>
          ) : (
            <Text className="text-gray-500">No exercise selected</Text>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

export default ExerciseBottom;
