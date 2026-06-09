import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from '../pages/login';
import Registro from '../pages/registro';
import Cadastro from '../pages/cadastro'

const Stack = createStackNavigator();
const Draw = createDrawerNavigator();

function Inicio() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela Principal</Text>
    </View>
  );
}

function MenuSuperior() {
  return (
    <Draw.Navigator>
      <Draw.Screen name="Início" component={Inicio} />
    </Draw.Navigator>
  );
}

export default function Rotas() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Registro" component={Registro} options={{ title: "Cadastro de usuário" }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: "Cadastro de usuário" }} />
      <Stack.Screen name="Principal" component={MenuSuperior} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}