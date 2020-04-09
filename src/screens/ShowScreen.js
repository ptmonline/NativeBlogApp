import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons'

const ShowScreen = ({ navigation }) => {
    const blogId = navigation.getParam('id');
    const { state } = useContext(Context);

    const blogPost = state.find((blogPost) => blogPost.id === blogId)
    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    )
};
ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: ()=> <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
            <EvilIcons name="pencil" size={35} />
        </TouchableOpacity>
    }
}
const styles = StyleSheet.create({});

export default ShowScreen;