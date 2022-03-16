import React from 'react'

import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native'

import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

import Icon from 'react-native-vector-icons/FontAwesome'

import { HomeNavigationProps } from 'types'
import { simpleDateString, simpleTimeString } from 'Utils'

type Props = {
    navigation: StackNavigationProp<HomeNavigationProps, 'Detail'>
    route: RouteProp<HomeNavigationProps, 'Detail'>
}

export default function DetailView(props: Props): JSX.Element {
    const { navigation, route } = props
    const {
        item: { name, flight_number, date_local, links, date_precision },
    } = route.params

    const dateStringLocalFormatted = simpleDateString(date_local)
    let timeStringLocalFormatted = simpleTimeString(date_local)
    if (date_precision !== 'hour') {
        timeStringLocalFormatted = 'Pending'
    }
    let thumbnail = require('../static/images/rocket.png')
    if (links && links.patch && links.patch.small) {
        thumbnail = { uri: links.patch.small }
    }

    const onCloseButtonPressed = (): void => {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.info}>
                    <Text style={styles.numberText}>{`#${flight_number}`}</Text>
                    <View>
                        <View style={styles.nameRow}>
                            <View style={styles.nameTag} />
                            <Text style={styles.nameText}>{name}</Text>
                        </View>
                        <View style={styles.timeRow}>
                            <Icon name="calendar" size={12} />
                            <Text style={styles.timeRowText}>{dateStringLocalFormatted}</Text>
                        </View>
                        <View style={styles.timeRow}>
                            <Icon name="clock-o" size={12} />
                            <Text style={styles.timeRowText}>{timeStringLocalFormatted}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={onCloseButtonPressed}>
                    <Icon name="close" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.thumbnailPanel}>
                <Image style={styles.thumbnail} source={thumbnail} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 16,
        height: 32,
        justifyContent: 'center',
        width: 32,
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
    },
    info: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        marginLeft: -8,
        marginTop: 8,
    },
    nameTag: {
        backgroundColor: 'black',
        borderRadius: 2,
        height: 24,
        width: 4,
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    numberText: {
        color: 'grey',
        fontSize: 14,
        fontWeight: 'bold',
    },
    thumbnail: {
        height: 72,
        width: 72,
    },
    thumbnailPanel: {
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
        borderRadius: 8,
        height: 200,
        justifyContent: 'center',
        marginVertical: 16,
        width: Dimensions.get('screen').width - 32,
    },
    timeRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
    },
    timeRowText: {
        fontSize: 16,
        marginLeft: 8,
    },
})
