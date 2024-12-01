import { View, Text } from "react-native";
import { Link } from "expo-router";

const App = () => {
  return (
    <View className="flex-1 justify-center items-center">
      {/* Heading Text */}
      <Text className="text-lg font-bold text-secondary">
        Hello, NativeWind!
      </Text>

      {/* Navigation Link */}
      <Link href="/home" asChild>
        <Text className="font-extrabold bg-red-400 text-white px-4 py-2 mt-4 rounded-2xl">
          Go to Home
        </Text>
      </Link>

      {/* Placeholder Text */}
      <Text className="font-semibold text-[8vw] text-green-400 mt-6">
        Hmmmm...
      </Text>
    </View>
  );
};

export default App;
