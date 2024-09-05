import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { firestore, storage } from '../firebaseConfig';
import { useSnackbar } from 'notistack';

const PostForm = ({ post }) => {
    const [title, setTitle] = useState(post?.title || '');
    const [description, setDescription] = useState(post?.description || '');
    const [image, setImage] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async () => {
        try {
            let imageUrl = post?.imageUrl || '';
            if (image) {
                const imageRef = storage.ref().child(`images/${image.name}`);
                await imageRef.put(image);
                imageUrl = await imageRef.getDownloadURL();
            }

            const newPost = {
                title,
                description,
                imageUrl,
                likes: post?.likes || 0,
                dislikes: post?.dislikes || 0,
                views: post?.views || 0,
                createdAt: post ? post.createdAt : new Date(),
                updatedAt: new Date(),
            };

            if (post) {
                await firestore.collection('posts').doc(post.id).update(newPost);
                enqueueSnackbar('Postagem atualizada com sucesso!', { variant: 'success' });
            } else {
                await firestore.collection('posts').add(newPost);
                enqueueSnackbar('Postagem criada com sucesso!', { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar('Erro ao salvar a postagem!', { variant: 'error' });
        }
    };

    return (
        <div>
            <Typography variant="h4">{post ? 'Editar Postagem' : 'Nova Postagem'}</Typography>
            <TextField
                label="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ marginTop: '16px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '16px' }}
            >
                {post ? 'Salvar Alterações' : 'Criar Postagem'}
            </Button>
        </div>
    );
};

export default PostForm;
