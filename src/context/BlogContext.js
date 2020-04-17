import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;
        case 'delete_blogpost':
            return state.filter(blogpost => blogpost.id !== action.payload)
        case 'edit_blogpost':
            return state.map((blogpost) => {
                if (blogpost.id === action.payload.id) {
                    return action.payload;
                } else {
                    return blogpost
                }
            })
        default:
            return state;
    }
};

const getBlogPosts = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogpost');
        console.log(response);
        dispatch({ type: 'get_blogposts', payload: response.data })
    }
}

const addBlogPost = () => {
    return async(title, content, callback) => {
        await jsonServer.post('/blogpost', {title: title, content: content});
        if (callback) {
            callback();
        }
    };
}; 

const deleteBlogPost = (dispatch) => {
    return async(id) => {
        await jsonServer.delete(`/blogpost/${id}`);
        dispatch({ type: 'delete_blogpost', payload: id })
    }
}

const editBlogPost = (dispatch) => {
    return async(id, title, content, callback) => {
        await jsonServer.put(`/blogpost/${id}`, {title, content})
        dispatch({ type: 'edit_blogpost', payload: { id: id, title: title, content: content } });
        if (callback) {
            callback();
        }
    }
}

export const { Context, Provider } = createDataContext(blogReducer, { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost }, []);