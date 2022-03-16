import React, { useEffect, useState, useCallback } from 'react'

import { FlatList, StyleSheet, Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Launch } from 'types/Models'

import SearchBarView from './SearchBarView'
import Item from './launchItem/Item'

import { simpleDateString } from '../Utils'

const EndPoint = 'https://api.spacexdata.com/v4/launches/upcoming'

type RenderItemProps = {
    index: number
    item: Launch
}

export default function HomeView(): JSX.Element {
    const inset = useSafeAreaInsets()
    const [data, setData] = useState<Launch[]>([])
    const [searchText, setSearchText] = useState('')
    const [searchByDate, setSearchByDate] = useState<boolean | undefined>(false)

    const performFetch = (): void => {
        fetch(EndPoint)
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                setData(responseJson)
                if (refreshing) {
                    setRefreshing(false)
                }
            })
    }

    const [refreshing, setRefreshing] = useState(false)

    useEffect(performFetch, [refreshing])

    const renderItem = ({ item }: RenderItemProps): JSX.Element => {
        return (
            <Item
                onSwipe={(): void => {
                    const newData = [...data]
                    newData.splice(newData.indexOf(item), 1)
                    setData(newData)
                }}
                item={item}
            />
        )
    }

    const onSearching = useCallback((text: string, byDate?: boolean): void => {
        setSearchByDate(byDate)
        setSearchText(text || '')
    }, [])

    const filterData = useCallback((): Array<Launch> => {
        return data.filter((item) => {
            if (searchByDate) {
                const dateStringLocalFormatted = simpleDateString(searchText)
                return dateStringLocalFormatted === simpleDateString(item.date_local)
            }
            return item.name.includes(searchText)
        })
    }, [data, searchText, searchByDate])

    return (
        <>
            <View style={styles.searchContainer}>
                <SearchBarView onSearching={onSearching} />
            </View>
            <FlatList
                data={filterData()}
                renderItem={renderItem}
                contentContainerStyle={[styles.flatListContainer, { paddingBottom: inset.bottom }]}
                ItemSeparatorComponent={(): JSX.Element => <View style={styles.seperator} />}
                refreshing={refreshing}
                onRefresh={performFetch}
            />
        </>
    )
}

const styles = StyleSheet.create({
    flatListContainer: {
        paddingBottom: Platform.select({
            android: 16,
            ios: 0,
        }),
        paddingHorizontal: 16,
    },
    searchContainer: {
        padding: 16,
    },
    seperator: {
        height: 24,
    },
})
