

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { RootStackParamList } from '../types';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import SplashScreen from '../screens/Splash';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import HomeScreen from '../screens/Home';

export default function Navigation(){
    const theme = useTheme();
    return (<NavigationContainer
    theme={{
        dark: theme.dark,
        colors:{
            primary: theme.colors.primary,
            background: theme.colors.background,
            card: theme.colors.surface,
            text: theme.colors.primary,
            border: theme.colors.primary,
            notification: theme.colors.primary,  
        }
    }}
    >
            <RootNavigator/>
    </NavigationContainer>)
}
const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator(){
    return <Stack.Navigator>
            <Stack.Screen name='Root' component={SplashScreen} options={{headerShown: false }} />
            <Stack.Screen name='SignIn' component={LoginScreen} options={{headerShown: false }} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false }} />
            <Stack.Screen name ='ForgotPassword' component={ForgotPasswordScreen} options={{headerShown:false}}/>
            <Stack.Screen name ='Home' component={HomeScreen} options={{headerShown:false}} />
  
    </Stack.Navigator>
}