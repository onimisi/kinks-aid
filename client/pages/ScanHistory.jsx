import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import ColumnProduct from '../components/ColumnProduct'

export default function ScanHistory({ route }) {

    const { products } = route.params;
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.subHeader}>History</Text>
            {
                products.map((product, index) => {
                    return <ColumnProduct key={index} product={product} />
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    subHeader: {
        fontSize: 25,
        marginRight: 15,
        fontFamily: "montserrat-regular",
    },
})