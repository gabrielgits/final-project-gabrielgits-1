import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,

} from "react-native";
import ViewDaily from "./ViewDaily";
import { useNavigation } from "@react-navigation/native";
import { getDailyNotes } from "../../core/network";
import GlobalContext from "../../core/context";

export default function DailyNotes() {
  const [notes, setNotes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const { globalState } = useContext(GlobalContext); 
  const token = globalState.login.token;
  const userId = globalState.login.userId;

  const onRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDailyNotes(token, userId);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching daily notes:", error);
      }
    }
    fetchData();
  }, [refresh]);

  const handleAddNotes = () => {
    navigation.navigate("addnote", { onRefresh });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Daily Notes</Text>
      </View>
      <TouchableOpacity onPress={handleAddNotes} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>Add Daily Notes</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ViewDaily note={{ ...item, index }} onRefresh={onRefresh} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    padding: 16,
    backgroundColor: "#3498db",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  addButton: {
    backgroundColor: "#27ae60",
    padding: 10,
    borderRadius: 5,
    margin: 16,
  },
  addButtonLabel: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
