import { Text, View, StyleSheet } from "react-native"; 
import { Ionicons } from "@expo/vector-icons";

export default function Notes() {
  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topnav}>
        <Ionicons name="arrow-back-circle-outline" size={32} color="#ffffff" />
        <View style={styles.addButton}>
          <Text style={styles.text}>ADD</Text>
          <Ionicons name="add" size={32} color="#ffffff" />
        </View>
      </View>

      {/* Search Button */}
      <View style={styles.searchButton}>
        <Ionicons name="search" size={24} color="#ffffff" style={styles.searchIcon} />
        <Text style={styles.searchText}>Search</Text>
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Today</Text>
      </View>
      
      <View style={styles.timelineWrapper}>
        <View style={styles.timelineContainer}>
          <View style={styles.progressLine} />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>
        <View style={styles.notes}>
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Todos</Text>
            <Text style={styles.notesText}>18:24 App Development</Text>
          </View>
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Launch</Text>
            <Text style={styles.notesText}>List Down a couple of relevant ve..</Text>
          </View>
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Preaching</Text>
            <Text style={styles.notesText}>Seek ye the kingdom of God and..</Text>
          </View>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Yesterday</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Previous 7 Days</Text>
      </View>
    </View>
  );
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
  text: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 17,
  },
  titleContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
  titleText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 17,
    textAlign: "left",
    left: 20,
    top: 20,
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
  searchButton: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    width: "93%",
    height: 35,
    borderRadius: 10,
    alignItems: "center",
  },
  searchIcon: {
    left: 25,
    fontSize: 20,
    fontWeight: "300",
  },
  searchText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "300",
    left: 40,
  },
  timelineWrapper: {
    flexDirection: "row", // Aligns timeline and notes side by side
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  timelineContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 170,
    marginRight: 10, // Spacing between timeline and notes
    top: 33,
  },
  progressLine: {
    position: "absolute",
    width: 3, // Line thickness
    height: "100%",
    backgroundColor: "#D98C3A", // Orange color for the line
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4FCF22", // Green color for the border
    backgroundColor: "#000", // Match background
    marginVertical: 25, // Spacing between circles
  },
  notes: { 
    flex: 1, // Take remaining space
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    height: 170,
  },
  notesContainer: {
    backgroundColor: "#484848",
    borderRadius: 20,
    width: "70%",
    height: 50,
    top: 27,
    padding: 10,
  },
  notesTitle: {
    color: "#ffffff",
    fontWeight: "700",
  },
  notesText: {
    color: "#ffffff",
    fontWeight: "300",
  },
});
