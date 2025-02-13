import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default class task extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topnav}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-circle-outline" size={32} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.addButton}>
              <Text style={styles.text}>ADD</Text>
              <Ionicons name="add" size={32} color="#ffffff" />
            </View>
          </View>
          <Text style={styles.textHeader}>TASKS</Text>
          <View style={styles.calendar}></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2E2E2E",
    height: 180,
    borderRadius: 20,
    top: -2
  },
  topnav: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
    width: "100%",
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    flexDirection: "row",
    width: 80, 
    height: 40,
    justifyContent: "center", 
    alignItems: "center",
    borderColor: "#ffffff",
    borderWidth: 1, 
    borderRadius: 15,
    paddingHorizontal: 10, 
  },
  text: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 17,
  },
  textHeader: {
    color: "#08A6EA",
    fontSize: 30,
    fontWeight: 600,
  },
})