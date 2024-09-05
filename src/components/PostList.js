import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ThumbUp, ThumbDown, Edit, Delete } from '@mui/icons-material';
import { firestore } from '../firebaseConfig';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsSnapshot = await firestore.collection('posts').get();
            setPosts(postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchPosts();
    }, []);

    const handleLike = async (postId, currentLikes) => {
        await firestore.collection('posts').doc(postId).update({ likes: currentLikes + 1 });
    };

    const handleDislike = async (postId, currentDislikes) => {
        await firestore.collection('posts').doc(postId).update({ dislikes: currentDislikes + 1 });
    };

    return (
        <List>
            {posts.map(post => (
                <ListItem key={post.id} divider>
                    <ListItemText
                        primary={post.title}
                        secondary={`Visualizações: ${post.views} | Curtidas: ${post.likes} | Não Curtidas: ${post.dislikes}`}
                    />
                    <IconButton onClick={() => handleLike(post.id, post.likes)}>
                        <ThumbUp />
                    </IconButton>
                    <IconButton onClick={() => handleDislike(post.id, post.dislikes)}>
                        <ThumbDown />
                    </IconButton>
                    <IconButton component={Link} to={`/edit/${post.id}`}>
                        <Edit />
                    </IconButton>
                    <IconButton>
                        <Delete />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
};

export default PostList;
