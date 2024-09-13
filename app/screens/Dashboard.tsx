import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { fetchUserData } from "../api/webApi";

const { height } = Dimensions.get("window");

const Dashboard: React.FC = () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const user = useSelector((state: any) => state.auth.user);

  const [userData, setUserData] = useState<any>(user);
  const [userPosts, setUserPosts] = useState<any>(null);

  const { street, suite, city } = userData.address;

  useEffect(() => {
    setUserData(user);
    fetchUserData(url, successCallback, errorCallback);
  }, [userData]);

  const successCallback = (data: any) => {
    const posts = data.filter((post: any) => post.userId === userData.id);
    setUserPosts(posts);
  };

  const errorCallback = (error: any) => {
    console.error("Error fetching posts data:", error);
  };

  const renderUserDetails = () => {
    return (
      <View style={styles.userDetailsContainer}>
        <Text style={styles.title}>Welcome, {userData.name}!</Text>
        <Text style={styles.userDetailsTitle}>User Details :</Text>
        <Text>Email: {userData.email}</Text>
        <Text>Phone: {userData.phone}</Text>
        <Text>Address: {street + ", " + suite + ", " + city}</Text>
      </View>
    );
  };

  const renderCommentList = () => {
    return (
      <View>
        <Text style={styles.commentTitle}>Comment list</Text>
        <FlatList
          style={styles.flatList}
          data={userPosts}
          renderItem={renderList}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const renderList = ({ item }: any) => {
    return (
      <View style={styles.shadow}>
        <Text style={styles.itemContainer}>{item.title}</Text>
        <Text>{item.body}</Text>
      </View>
    );
  };

  const renderActivityIndicator = () => {
    return (
      <ActivityIndicator style={styles.activityIndicator}></ActivityIndicator>
    );
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <View>
          {renderUserDetails()}
          {renderCommentList()}
        </View>
      ) : (
        renderActivityIndicator()
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
  },
  shadow: {
    backgroundColor: "#fff",
    shadowColor: "#000",
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
    marginBottom: height / 4,
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
});

export default Dashboard;
