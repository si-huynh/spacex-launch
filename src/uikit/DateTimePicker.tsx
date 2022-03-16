import React, { memo, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Picker from './Picker'

export type DatetimePickerType = 'DATE_FULL' | 'DATE_MONTH' | 'DATE_MONTHDAY'

type Props = {
    defaultValue?: string
    onValueChanged?: (value: string) => void
    type?: DatetimePickerType
}

const Years = new Array(new Date().getFullYear() - 1945 + 46).fill(0).map((_, i) => {
    const value = 1945 + i
    return { label: `${value}`, value }
})

const Months = new Array(12).fill(0).map((_, i) => {
    const value = 1 + i
    return { label: `${value}`, value }
})

function DateTimePicker({ defaultValue, onValueChanged, type }: Props): JSX.Element {
    let defaultYear = 1990
    let defaultMonth = 1
    let defaultDay = 1
    if (defaultValue) {
        const values = defaultValue.split('/').map((value) => Number.parseInt(value, 10))
        if (type === 'DATE_FULL') {
            defaultYear = values[0]
            defaultMonth = values[1]
            defaultDay = values[2]
        } else if (type === 'DATE_MONTH') {
            defaultMonth = values[0]
        } else {
            defaultMonth = values[0]
            defaultDay = values[1]
        }
    }

    const [currentYear, setCurrentYear] = useState(defaultYear)
    const [currentMonth, setCurrentMonth] = useState(defaultMonth)
    const [currentDay, setCurrentDay] = useState(defaultDay)
    const days = new Array(new Date(currentYear, currentMonth, 0).getDate())
        .fill(0)
        .map((__, i) => {
            const value = 1 + i
            return { label: `${value}`, value }
        })

    const onSelectYear = useCallback((index) => setCurrentYear(1945 + index), [])
    const onSelectMonth = useCallback(
        (index) => {
            setCurrentMonth(1 + index)
            if (days.length < currentDay) {
                setCurrentDay(days.length)
            }
        },
        [currentDay, days.length],
    )
    const onSelectDay = useCallback((index) => setCurrentDay(1 + index), [])

    useEffect(() => {
        if (onValueChanged) {
            let value = ''
            switch (type) {
                case 'DATE_FULL':
                    value = `${currentYear}/${currentMonth}/${currentDay}`
                    break
                case 'DATE_MONTH':
                    value = `${currentMonth}`
                    break
                case 'DATE_MONTHDAY':
                    value = `${currentMonth}/${currentDay}`
                    break
            }
            onValueChanged(value)
        }
    }, [type, onValueChanged, currentDay, currentYear, currentMonth])

    return (
        <View style={styles.container}>
            {type === 'DATE_FULL' ? (
                <Picker
                    values={Years}
                    defaultValue={currentYear - 1945}
                    onSelectedIndex={onSelectYear}
                />
            ) : null}
            <Picker
                values={Months}
                defaultValue={currentMonth - 1}
                onSelectedIndex={onSelectMonth}
            />
            {type === 'DATE_FULL' || type === 'DATE_MONTHDAY' ? (
                <Picker values={days} defaultValue={currentDay - 1} onSelectedIndex={onSelectDay} />
            ) : null}
        </View>
    )
}

DateTimePicker.defaultProps = {
    type: 'DATE_FULL',
}

export default memo(DateTimePicker)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
})
