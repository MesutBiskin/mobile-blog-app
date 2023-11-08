import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import PostCard from "./components/PostCard";

export default function App() {
  const [blogPosts, setBlogPosts] = useState([]);

  // useEffect is being called on different lifecyle of the component
  // 1. When the component mounts
  // 2. when the component upMounts

  // How to get a component to re-render
  // 1. change state variable
  // 2. change props

  const handleFetchData = () => {
    console.log("fetching data");

    fetch("http://192.168.10.82:8080", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetch("http://192.168.10.82:8080") 
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView >
      <StatusBar style="auto" />
      <View>
        <ScrollView>
          {blogPosts.map((singlePost, index) => {
            // single post is an object within an array

            return <PostCard singlePost={singlePost} index={index} key={singlePost._id} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

