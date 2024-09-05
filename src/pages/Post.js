import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Button, CircularProgress, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { firestore } from '../firebaseConfig';

const Post = () => {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postDoc = await firestore.collection('posts').doc(id).get();
                if (postDoc.exists) {
                    setPost(postDoc.data());
                } else {
                    enqueueSnackbar('Post not found', { variant: 'error' });
                }
            } catch (error) {
                enqueueSnackbar('Failed to fetch post: ' + error.message, { variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, enqueueSnackbar]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            {post ? (
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {post.description}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        Views: {post.views} | Likes: {post.likes} | Dislikes: {post.dislikes}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => enqueueSnackbar('Liked!', { variant: 'info' })}>
                        Like
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => enqueueSnackbar('Disliked!', { variant: 'info' })} sx={{ ml: 2 }}>
                        Dislike
                    </Button>
                </CardContent>
            ) : (
                <Typography variant="h5" sx={{ textAlign: 'center', p: 2 }}>
                    Post not found.
                </Typography>
            )}
        </Card>
    );
};

export default Post;
