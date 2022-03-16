import React, { memo, useCallback, useLayoutEffect, useRef } from 'react'
import { StyleSheet, View, NativeSyntheticEvent, NativeScrollEvent, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Animated, {
    asin,
    cos,
    interpolate,
    multiply,
    sub,
    Extrapolate,
} from 'react-native-reanimated'

import { translateZ } from 'react-native-redash'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const Perspective = 600
const ItemHeight = 36
const RadiusRel = 5 * 0.5
const Radius = RadiusRel * ItemHeight

type ItemType = { label: string; value: number }

interface Props {
    defaultValue: number
    onSelectedIndex?: (index: number) => void
    values: ItemType[]
}

Picker.defaultProps = {
    defaultValue: 0,
}

export default function Picker({ defaultValue, onSelectedIndex, values }: Props): JSX.Element {
    const y = useLazyRef(() => new Animated.Value(defaultValue * ItemHeight))
    const onScroll = useLazyRef(() =>
        Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
            useNativeDriver: true,
        }),
    )

    const onMomentumScrollEnd = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const offsetY = e.nativeEvent.contentOffset.y
            onSelectedIndex && onSelectedIndex(Math.floor(offsetY / ItemHeight))
        },
        [onSelectedIndex],
    )

    const scroll = useRef<typeof AnimatedFlatList>()
    useLayoutEffect(() => {
        const timeout = setTimeout(() => {
            if (scroll && scroll.current) {
                scroll.current._component.scrollToItem({
                    animated: false,
                    item: values[defaultValue],
                })
            }
        }, 80)

        return (): void => clearTimeout(timeout)
    }, [defaultValue, values])

    const renderItem = useCallback(
        ({ item, index }: any): JSX.Element => <PickerItemView item={item} index={index} y={y} />,
        [y],
    )

    return (
        <View style={styles.container}>
            <AnimatedFlatList
                ref={scroll}
                contentContainerStyle={styles.flatlist}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item: any): string => item.label}
                data={values}
                renderItem={renderItem}
                getItemLayout={(
                    __: any,
                    index: number,
                ): { index: number; length: number; offset: number } => ({
                    index,
                    length: ItemHeight,
                    offset: index * ItemHeight,
                })}
                scrollEventThrottle={16}
                snapToAlignment="center"
                snapToInterval={ItemHeight}
                decelerationRate="fast"
                pagingEnabled
                bounces={false}
                removeClippedSubviews={true}
                initialNumToRender={5}
                maxToRenderPerBatch={1}
                updateCellsBatchingPeriod={100}
                windowSize={5}
                {...{ onMomentumScrollEnd, onScroll }}
            />
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <View style={styles.indicator} />
            </View>
        </View>
    )
}

type ItemViewProps = {
    index: number
    item: ItemType
    y: Animated.Value<number>
}

function ItemView({ item, index, y }: ItemViewProps): JSX.Element {
    const position = Animated.sub(index * ItemHeight, y)
    const isTop = -ItemHeight * 2
    const isSemiTop = -ItemHeight
    const isCenter = 0
    const isSemiBottom = ItemHeight
    const isBottom = ItemHeight * 2

    const opacity = Animated.interpolate(position, {
        extrapolate: Extrapolate.CLAMP,
        inputRange: [isTop, isSemiTop, isCenter, isSemiBottom, isBottom],
        outputRange: [0.6, 0.8, 1, 0.8, 0.6],
    })

    const rotateX = asin(
        interpolate(position, {
            extrapolate: Extrapolate.CLAMP,
            inputRange: [isTop, isSemiTop, isCenter, isSemiBottom, isBottom],
            outputRange: [0.55, 0.5, 0, -0.55, -0.55],
        }),
    )

    const z = sub(multiply(Radius, cos(rotateX)), Radius)

    return (
        <Animated.View
            style={[
                styles.item,
                { opacity },
                {
                    transform: [
                        { perspective: Perspective },
                        { rotateX },
                        translateZ(Perspective, z),
                    ],
                },
            ]}>
            <Text style={styles.itemValue}>{item.label}</Text>
        </Animated.View>
    )
}

const PickerItemView = memo(ItemView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: ItemHeight * 5,
    },
    flatlist: {
        paddingVertical: ItemHeight * 2,
    },
    indicator: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#D5D5D5',
        borderTopWidth: StyleSheet.hairlineWidth,
        height: ItemHeight,
        top: ItemHeight * 2,
    },
    item: {
        height: ItemHeight,
        justifyContent: 'center',
    },
    itemValue: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },
})

const useLazyRef = <T extends object>(initializer: () => T): T => {
    const ref = useRef<T>()
    if (ref.current === undefined) {
        ref.current = initializer()
    }
    return ref.current
}
