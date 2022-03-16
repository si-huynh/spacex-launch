import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Animated, {
    divide,
    interpolate,
    Extrapolate,
    sub,
    cond,
    add,
    lessThan,
    multiply,
} from 'react-native-reanimated'

import { HEIGHT } from './ItemLayout'

interface ActionProps {
    deleteOpacity: Animated.Node<number>
    x: Animated.Node<number>
}

// eslint-disable-next-line no-undef
export default function Action({ x, deleteOpacity }: ActionProps): JSX.Element {
    const size = cond(lessThan(x, HEIGHT), x, add(x, sub(x, HEIGHT)))
    const translateX = cond(lessThan(x, HEIGHT), 0, divide(sub(x, HEIGHT), 2))
    const borderRadius = divide(size, 2)
    const scale = interpolate(size, {
        extrapolate: Extrapolate.CLAMP,
        inputRange: [20, 30],
        outputRange: [0.01, 1],
    })
    const iconOpacity = interpolate(size, {
        inputRange: [HEIGHT - 10, HEIGHT + 10],
        outputRange: [1, 0],
    })
    const textOpacity = sub(1, iconOpacity)
    return (
        <Animated.View
            style={[
                styles.container,
                { borderRadius, height: size, transform: [{ translateX }], width: size },
            ]}>
            <Animated.View
                style={[
                    styles.removeBackground,
                    {
                        opacity: iconOpacity,
                        transform: [{ scale }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.removeHolder,
                    {
                        opacity: multiply(textOpacity, deleteOpacity),
                    },
                ]}>
                <Text style={styles.remove}>Remove</Text>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#D93F12',
        justifyContent: 'center',
    },
    remove: {
        color: 'white',
        fontSize: 14,
    },
    removeBackground: {
        backgroundColor: 'white',
        height: 5,
        width: 20,
    },
    removeHolder: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
