import { Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { auth } from '../FirebaseConfig'
import { createUserWithEmailAndPassword, signInAnonymously} from 'firebase/auth'
import { router } from 'expo-router'

export default function Index() {
  //login with email and password (to later be impelemented with firebase)
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');


  const signIn = async () => {
    try {
      // const user = await signInWithEmailAndPassword(auth, email, password)
      const user = await signInAnonymously(auth);
      if (user) router.replace('/(tabs)');
    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }

  // const signUp = async () => {
  //   try {
  //     const user = await createUserWithEmailAndPassword(auth, email, password)
  //     if (user) router.replace('/(tabs)');
  //   } catch (error: any) {
  //     console.log(error)
  //     alert('Sign in failed: ' + error.message);
  //   }
  // }

  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-background'>
      {/* <Text className='font-bold text-md mb-40'>Login</Text>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry/>
      <TouchableOpacity onPress={signIn}>
        <Text>Login</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={signIn} className='bg-primary px-4 py-2 rounded-full'>
        <Text>Make Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
