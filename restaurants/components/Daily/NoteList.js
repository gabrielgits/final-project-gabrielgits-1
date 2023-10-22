// import { getDailyNotes } from "../../core/network";
// import { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   FlatList,
//   Pressable,
//   Text,
//   View,
//   StyleSheet,
//   TouchableHighlight
// } from "react-native";
// import ViewDaily from "./ViewDaily";
// import { useNavigation } from "@react-navigation/native";

// export default function FoodList() {
//   const [notes, setNotes] = useState([]);
//   const [refresh, setRefresh] = useState(false);
//   const navigation = useNavigation();

//   const onRefresh = () => {
//     setRefresh(!refresh);
//   };

//   useEffect(() => {
//     try {
//       async function getData() {
//         const data = await getDailyNotes();
//        setNotes(data)
//       }
//       getData();
//     } catch (error) {}
//   }, []);

//   const handleAddNotes = () => {
//     navigation.navigate("notelist", { onRefresh });
//   };

//   return (
//     <SafeAreaView style={styles.root}>
//       <View style={{ flex: 0.2 }}>
//         <Text style={styles.title}> Daily Notes</Text>
//       </View>
//       <View style={{ flex: 0.8 }}>
//         <TouchableHighlight style={styles.submitButton}>
//           <Text style={styles.submitButtonText} onPress={handleAddNotes}>
//             Add Daily Notes
//           </Text>
//         </TouchableHighlight>

//         <FlatList
//           data={notes}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item, index }) => ( <ViewDaily note={{ ...item, index }} onRefresh={onRefresh} />
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//     root: {
//       flex: 1,
//       backgroundColor: "#fff",
//       paddingTop: 20,
//     }
// })

import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
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
  const token = globalState.login.token

  const onRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDailyNotes(token);
        console.log("Token" , token)
        console.log(data);
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
    <SafeAreaView style={styles.root}>
      <View style={{ flex: 0.2 }}>
        <Text style={styles.title}>Daily Notes</Text>
      </View>
      <View style={{ flex: 0.8 }}>
        <TouchableHighlight style={styles.submitButton}>
          <Text style={styles.submitButtonText} onPress={handleAddNotes}>
            Add Daily Notes
          </Text>
        </TouchableHighlight>

        <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ViewDaily note={{ ...item, index }} onRefresh={onRefresh} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
  },
});
