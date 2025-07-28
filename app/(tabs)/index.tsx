import SearchBar from '@/components/SearchBar';
import { ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';


export default function HomeScreen() {
  const router = useRouter(); 
  return (
    <View className='flex-1 bg-background'>
      <ScrollView className='flex-1 px-5' contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}>
        <View className='flex-1 mt-14'>
          <SearchBar/>
        </View>
      </ScrollView>
    </View>
  );
}

