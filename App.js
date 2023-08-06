import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {NavigationContainer} from '@react-navigation/native-stack';
import HomePage from './src/pages/HomePage';
import CreateProfile from './src/pages/CreateProfile';
import EditProfile from './src/pages/EditProfile';

const Stack = createNativeStackNavigator();
const apiUrl = 'https://api.poc.graphql.dev.vnplatform.com/graphql';

const httpLink = createHttpLink({ uri: apiUrl });

const authLink = setContext(_ => {
  const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6InNhZGFmLmtoYW5AYWlkZXRpYy5pbiIsImlzX2NhbmRpZGF0ZSI6dHJ1ZSwiaWF0IjoxNjkxMTU5NDk2LCJleHAiOjE2OTE2Nzc4OTZ9.vvSE_6r5siByJJDFTdH-vClv-e_xDQ-sJFSWbtthTH4';

  return {
    headers: {
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return(
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component= {HomePage} options={{title: 'Home',headerShown: false,}} />
          <Stack.Screen name="Create" component={CreateProfile} options={{ title: 'Create Profile',headerShown: false,}} />
          <Stack.Screen name="Edit" component={EditProfile} options={{ title: 'Edit Profile',headerShown: false,}} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
