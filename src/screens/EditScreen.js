import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation }) => {
    const blogid = navigation.getParam('id');
    const { state, editBlogPost } = useContext(Context);
    const blogPost = state.find((blogpost) => blogpost.id === blogid);

    return <BlogPostForm
        initialValues={{ title: blogPost.title, content: blogPost.content }}
        onSubmit={(title, content) => {
            editBlogPost(blogid, title, content, ()=> navigation.pop())
        }} />

};

const styles = StyleSheet.create({
});

export default EditScreen;