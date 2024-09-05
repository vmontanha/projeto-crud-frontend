import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, TextField, Card, CardContent, IconButton } from '@mui/material';
import { ThumbUp, ThumbDown, Edit, Delete } from '@mui/icons-material';
import { firestore } from '../firebaseConfig';
import { collection, query, onSnapshot, addDoc, doc, updateDoc } from "firebase/firestore";
import { useSnackbar } from 'notistack';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', description: '' });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const q = query(collection(firestore, 'posts'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Cleanup subscription on unmount
        return () => unsub();
    }, []);

    const handleCreatePost = async () => {
        try {
            await addDoc(collection(firestore, 'posts'), {
                ...newPost,
                views: 0,
                likes: 0,
                dislikes: 0,
                createdAt: new Date(),
                history: [],
            });
            setNewPost({ title: '', description: '' });
            enqueueSnackbar('Post created successfully!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Failed to create post: ' + error.message, { variant: 'error' });
        }
    };

    const handleLike = async (post) => {
        try {
            const postRef = doc(firestore, 'posts', post.id);
            await updateDoc(postRef, {
                likes: post.likes + 1,
            });
            enqueueSnackbar('Liked!', { variant: 'info' });
        } catch (error) {
            enqueueSnackbar('Failed to like post: ' + error.message, { variant: 'error' });
        }
    };

    const handleDislike = async (post) => {
        try {
            const postRef = doc(firestore, 'posts', post.id);
            await updateDoc(postRef, {
                dislikes: post.dislikes + 1,
            });
            enqueueSnackbar('Disliked!', { variant: 'info' });
        } catch (error) {
            enqueueSnackbar('Failed to dislike post: ' + error.message, { variant: 'error' });
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Title"
                    fullWidth
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    margin="normal"
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    margin="normal"
                />
                <Button variant="contained" onClick={handleCreatePost}>
                    Create Post
                </Button>
            </Box>

            {posts.map(post => (
                <Card key={post.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{post.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{post.description}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Box>
                                <IconButton onClick={() => handleLike(post)}><ThumbUp /></IconButton>
                                {post.likes}
                                <IconButton onClick={() => handleDislike(post)}><ThumbDown /></IconButton>
                                {post.dislikes}
                            </Box>
                            <Box>
                                <IconButton onClick={() => {/* Edit Post */}}><Edit /></IconButton>
                                <IconButton onClick={() => {/* Delete Post */}}><Delete /></IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default Dashboard;
