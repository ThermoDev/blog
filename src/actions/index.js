import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    // Map over each of the posts, and get unique values of userId
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // Iterate over each of the ids, and call fetchUser Action Creator, then dispatch it.
    userIds.forEach(id => dispatch(fetchUser(id)));

    // Alternate way to perform same actions as above.
    // _.chain.map(getState().posts).map('userId').uniq.forEach(id => dispatch(fetchUser(id))).value();
    
}

export const fetchPosts = () => async (dispatch) => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({
        type: 'FETCH_POSTS',
        payload: response.data,
    });
};

export const fetchUser = (id) => async (dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
        type: 'FETCH_USER',
        payload: response.data,
    });
};
