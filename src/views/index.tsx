import React from 'react'

import { createNativeStackNavigator } from 'react-native-screens/native-stack'

import { HomeNavigationProps } from 'types'

import HomeView from './HomeView'
import DetailView from './DetailView'

const Stack = createNativeStackNavigator<HomeNavigationProps>()

export default function HomeContainer(): JSX.Element {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerLargeTitle: true }}>
                <Stack.Screen name="Home" component={HomeView} options={{ title: 'Launchs' }} />
                <Stack.Screen
                    name="Detail"
                    component={DetailView}
                    options={{ stackPresentation: 'modal' }}
                />
            </Stack.Navigator>
        </>
    )
}
