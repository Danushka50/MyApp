import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../api/webApi";
import { persistor } from "../redux/store";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { logOut } from "../redux/user/actionCreators";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const { height } = Dimensions.get("window"); // Get screen dimensions for responsive design

// Dashboard screen component
const Dashboard: React.FC = () => {
  const url = "https://jsonplaceholder.typicode.com/posts"; // API endpoint for fetching user posts
  const user = useSelector((state: any) => state?.auth?.user); // Accessing the user object from Redux store

  const [userData, setUserData] = useState<any>(user); // Local state to store user data
  const [userPosts, setUserPosts] = useState<any>(null); // Local state to store user's posts

  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Destructure address details from userData for readability
  const { street, suite, city } = userData?.address || {};

  // Effect hook to set initial user data and fetch posts
  useEffect(() => {
    setUserData(user); // Set user data from Redux store
    fetchData(url, successCallback, errorCallback); // Fetch posts when component mounts
  }, [userData]); // Re-run the effect if userData changes

  // Callback for successful data fetching
  const successCallback = (data: any) => {
    const posts = data?.filter((post: any) => post?.userId === userData?.id); // Filter posts by user ID
    setUserPosts(posts); // Update state with user's posts
  };

  // Callback for handling errors during data fetching
  const errorCallback = (error: any) => {
    console.error("Error fetching posts data:", error); // Log error to console
  };

  // Function to handle logout dispatch
  const handleLogout = async () => {
    Alert.alert("Info", "Do you wish to logout", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          // Dispatch logout actions
          dispatch(logOut());

          // Purge persisted state
          persistor.purge(); // This will remove the persisted data from localStorage

          //Finally called logout
          navigation.navigate("Login");
        },
      },
    ]);
  };

  // Function to render logout container
  const renderLogout = () => {
    return (
      <View style={styles.logoutContainer}>
        {renderUserImage()}
        <View style={styles.logoutButtonContainer}>
          <Text style={styles.title}>Welcome, {userData.name}!</Text>
          {renderLogoutButton()}
        </View>
      </View>
    );
  };

  // Function to render logout button
  const renderLogoutButton = () => {
    return (
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    );
  };

  // Function to render user's profile image
  const renderUserImage = () => {
    return (
      <View>
        <Image
          style={{ width: 100, height: 100, borderRadius: 200 }}
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1664476788423-7899ac87bd7f?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
      </View>
    );
  };

  // Function to render user's details such as name, email, and address
  const renderUserDetails = () => {
    return (
      <View style={styles.userDetailsContainer}>
        <Text style={styles.userDetailsTitle}>User Details :</Text>
        <Text>Email: {userData.email}</Text>
        <Text>Phone: {userData.phone}</Text>
        <Text>Address: {street + ", " + suite + ", " + city}</Text>
      </View>
    );
  };

  // Function to render the list of user's posts
  const renderCommentList = () => {
    return (
      <View>
        <Text style={styles.commentTitle}>Comment List</Text>
        <FlatList
          style={styles.flatList}
          data={userPosts} // Pass posts data to FlatList
          renderItem={renderList} // Render each post item
          keyExtractor={(item) => item.id.toString()} // Unique key for each list item
        />
      </View>
    );
  };

  // Function to render individual post item
  const renderList = ({ item }: any) => {
    return (
      <View style={styles.shadow}>
        <Text style={styles.itemContainer}>{item.title}</Text>
        <Text>{item.body}</Text>
      </View>
    );
  };

  // Function to render loading indicator while data is being fetched
  const renderActivityIndicator = () => {
    return <ActivityIndicator style={styles.activityIndicator} />;
  };

  // Function to render error message if no user data is available
  const renderError = () => {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No user data found</Text>
      </View>
    );
  };

  // Main render logic: show user data and posts if available, otherwise show error or loading state
  return (
    <View style={styles.container}>
      {userData ? (
        <View>
          {renderLogout()}
          {renderUserDetails()}
          {renderCommentList()}
          {renderActivityIndicator()}
        </View>
      ) : (
        renderError()
      )}
    </View>
  );
};

// Stylesheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
  },
  shadow: {
    backgroundColor: "#fff",
    shadowColor: Platform.OS === "ios" ? "#C0C0C0" : "#000",
    marginBottom: 10,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  flatList: {
    marginTop: 10,
    marginBottom:
      Platform.OS === "ios" ? (height / 2) * 1.05 : (height / 2) * 1.3,
  },
  commentTitle: {
    marginHorizontal: 15,
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
  },
  userDetailsTitle: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
  },
  userDetailsContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  itemContainer: {
    fontSize: 17,
    color: "#000",
    marginBottom: 10,
  },
  errorText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
  errorContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
    flexDirection: "row",
  },
  logoutButtonContainer: {
    marginLeft: 20,
  },
  logoutButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#FF474D",
    width: 100,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
  },
});

export default Dashboard; // Export the Dashboard component for use in other parts of the app
