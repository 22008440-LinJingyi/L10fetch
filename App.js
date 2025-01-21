import React, { useState, useEffect } from 'react';
import {FlatList, StatusBar, Text, TextInput, View, StyleSheet,} from 'react-native';

let originalData = [];

const App = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        // Fetch data from API
        fetch("https://mysafeinfo.com/api/data?list=collegedegrees&format=json&case=default")
            .then((response) => response.json())
            .then((data) => {
                originalData = data;
                setData(data);
            });
    }, []);


    const filterData = (text) => {
        setSearchText(text);
        if (text !== "") {
            const filteredData = originalData.filter((item) =>
                item.Name.toLowerCase().includes(text.toLowerCase())
            );
            setData(filteredData);
        } else {
            setData(originalData);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.Name}</Text>
            <Text style={styles.itemSubtitle}>Degree: {item.Degree}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.header}>College Degrees</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={(text) => filterData(text)}
            />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.ID.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f9f9f9",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#2a2a72",
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
        marginBottom: 5,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    itemSubtitle: {
        fontSize: 14,
        color: "#555",
    },
});

export default App;
