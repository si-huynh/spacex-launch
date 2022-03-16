import React, { useCallback, useRef, useState } from 'react'

import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'

import Modal from 'react-native-modal'

import Icon from 'react-native-vector-icons/FontAwesome'

import DateTimePicker from '../uikit/DateTimePicker'

type Props = {
    onSearching: (text: string, byDate?: boolean) => void
}

export default function SearchBarView(props: Props): JSX.Element {
    const [searchingText, setSearchingText] = useState('')

    const currentDate = new Date()
    const currentDateString = `${currentDate.getFullYear()}/${
        currentDate.getMonth() + 1
    }/${currentDate.getDate()}`
    const [lastSearchDate, setLastSearchDate] = useState(currentDateString)

    const timeoutId = useRef<NodeJS.Timer>()
    const onChangeText = useCallback(
        (text: string): void => {
            setSearchingText(text)
            const clearCurrentTimeout = (): void => {
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current)
                }
            }

            clearCurrentTimeout()
            timeoutId.current = setTimeout(() => {
                console.log(text)
                props.onSearching(text)
                clearCurrentTimeout()
            }, 500)
        },
        [props],
    )

    const [showDatePicker, setShowDatePicker] = useState(false)
    const onCalendarPress = (): void => {
        setShowDatePicker(true)
        if (searchingText) {
        }
    }

    const onValueChanged = (value: string): void => {
        setSearchingText(value)
        setLastSearchDate(value)
    }

    const ref = useRef<TextInput>(null)
    const dismiss = (): void => {
        setShowDatePicker(false)
        if (ref.current) {
            ref.current.clear()
        }
        setTimeout(() => {
            setLastSearchDate(currentDateString)
            props.onSearching('')
        }, 800)
    }

    const done = (): void => {
        setShowDatePicker(false)
        props.onSearching(searchingText, true)
    }

    return (
        <>
            <View style={styles.container}>
                <Icon name="search" />
                <TextInput
                    ref={ref}
                    value={searchingText}
                    style={styles.textInput}
                    onChangeText={onChangeText}
                />
                <TouchableOpacity onPress={onCalendarPress}>
                    <Icon name="calendar" />
                </TouchableOpacity>
            </View>
            <Modal style={styles.modal} isVisible={showDatePicker}>
                <View style={styles.picker}>
                    <View style={styles.pickerContent}>
                        <Text style={styles.pickerTitle} numberOfLines={1}>
                            Pick a Date
                        </Text>
                        <DateTimePicker
                            onValueChanged={onValueChanged}
                            defaultValue={lastSearchDate}
                        />
                    </View>
                    <View style={styles.pickerButtonContainer}>
                        <TouchableOpacity style={styles.pickerButtonItem} onPress={dismiss}>
                            <Text style={styles.pickerButtonTextSub}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pickerButtonItem} onPress={done}>
                            <Text style={styles.pickerButtonTextMain}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    modal: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    picker: {
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        overflow: 'hidden',
        width: 288,
    },
    pickerButtonContainer: {
        flexDirection: 'row',
    },
    pickerButtonItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        height: 44,
        justifyContent: 'center',
    },
    pickerButtonTextMain: {
        color: '#1A1A1A',
    },
    pickerButtonTextSub: {
        color: '#8E8E93',
    },
    pickerContent: {
        paddingTop: 32,
    },
    pickerTitle: {
        color: '#1A1A1A',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
    },
})
