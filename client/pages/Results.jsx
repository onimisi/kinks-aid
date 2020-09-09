import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'

export default function Results({ route, navigation }) {

    const [results, setResults] = useState([]);

    const { detectedText } = route.params;

    useEffect(() => {
        console.log(detectedText.data.element.data)
        setResults(detectedText.data.element.data)
    }, [])

    return (
        // <View>
            // <Text>Results page</Text>
            <FlatList 
            keyExtractor={(item, index) => {
                return "" + index
            }} 
            data={results} 
            renderItem={({ item }) => <Text>{item}</Text>} />
        // </View>
    )
}
