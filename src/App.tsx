import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import HomeContainer from 'views'

enableScreens()

export default (): JSX.Element => {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <HomeContainer />
            </SafeAreaProvider>
        </NavigationContainer>
    )
}
