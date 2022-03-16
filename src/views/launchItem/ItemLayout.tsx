import React from 'react'

import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { useNavigation } from '@react-navigation/native'

import { simpleDateString, simpleTimeString } from '../../Utils'
import { Launch } from 'types'

type Props = {
    itemData: Launch
}

export const HEIGHT = 130

export default function ItemLayout(props: Props): JSX.Element {
    const {
        itemData: { name, flight_number, date_local, links, date_precision },
    } = props

    const dateStringLocalFormatted = simpleDateString(date_local)
    let timeStringLocalFormatted = simpleTimeString(date_local)
    if (date_precision !== 'hour') {
        timeStringLocalFormatted = 'Pending'
    }
    let thumbnail = require('../../static/images/rocket.png')
    if (links && links.patch && links.patch.small) {
        thumbnail = { uri: links.patch.small }
    }

    const navigation = useNavigation()
    const onItemPressed = (): void => {
        navigation.navigate('Detail', { item: props.itemData })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onItemPressed}>
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
            <Image style={styles.thumbnail} source={thumbnail} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        flex: 1,
        flexDirection: 'row',
        height: HEIGHT,
        padding: 16,
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        width: Dimensions.get('screen').width - 32,
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
        height: 20,
        width: 4,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    numberText: {
        color: 'grey',
        fontSize: 12,
        fontWeight: 'bold',
    },
    thumbnail: {
        height: 72,
        width: 72,
    },
    timeRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
    },
    timeRowText: {
        marginLeft: 8,
    },
})
