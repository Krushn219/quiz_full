import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Avatar, Button, Grid } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import "./subcategory.css"
import { Link, useNavigate } from 'react-router-dom';


const SunCategory = () => {
    const navigate = useNavigate();
    const [subcategories, setSubCategories] = useState([]);
    const [subcategoriesWithCategory, setSubcategoriesWithCategory] = useState([]);
    const apiUrl = 'http://localhost:8000/api/v1/subcategory/all';

    useEffect(() => {
        axios.get(apiUrl)
            .then((response) => {
                // Assuming each category object has an 'image' property with the filename
                const subcategoriesWithImageUrls = response.data.subCategories.map((subcategory) => ({
                    ...subcategory,
                    image
                        : `http://localhost:8000/${subcategory.image.replace(/\\/g, '/')}`,
                }));
                setSubCategories(subcategoriesWithImageUrls);

                // Fetch category names
                axios.get('http://localhost:8000/api/v1/category/all')
                    .then((categoryResponse) => {
                        const categories = categoryResponse.data.categories;
                        // Map category IDs to their names
                        const subcategoriesWithNames = subcategoriesWithImageUrls.map((subcategory) => ({
                            ...subcategory,
                            categoryName: categories.find((category) => category._id === subcategory.category)?.category,
                        }));
                        setSubcategoriesWithCategory(subcategoriesWithNames);
                    })
                    .catch((error) => {
                        console.error('Error fetching category names:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching subcategories:', error);
            });
    }, []);

    const handleDeleteCategory = (subcategoryId) => {
        axios.delete(`http://localhost:8000/api/v1/subcategory/${subcategoryId}`)
            .then((response) => {
                // Handle the response and provide feedback to the user
                console.log('SubCategory deleted successfully:', response.data);

                // Update the state by removing the deleted category
                setSubCategories((prevsubcategories) => prevsubcategories.filter((subcategory) => subcategory._id !== subcategoryId));
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });
    };

    const handleEditCategory = (subcategoryId) => {
        // Implement edit category logic here
        navigate(`/edit-subcategory/${subcategoryId}`);
    };


    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" gutterBottom sx={{ fontSize: '24px' }}>
                    All subcategories
                </Typography>
                <Link to="/new-subcategory">
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                            },
                        }}
                    >
                        Create New
                    </Button>
                </Link>
            </Box>

            <Paper>
                <List>
                    <ListItem className="category-list-item category-header">
                        <Grid container spacing={2}>
                            <Grid item xs={1}>
                                <Typography variant="subtitle1">Sub Image</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle1">Name</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle1">Category</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle1">Description</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="srOnly">Actions</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                    {subcategoriesWithCategory.map((subcategory) => (
                        <ListItem key={subcategory._id} className="category-list-item" sx={{ marginBottom: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={1}>
                                    <Avatar src={subcategory.image} alt={subcategory.subcategory} />
                                </Grid>
                                <Grid item xs={3}>
                                    <ListItemText primary={subcategory.subCategory_name} />
                                </Grid>
                                <Grid item xs={3}>
                                    <ListItemText primary={subcategory.categoryName} /> {/* Display category name */}
                                </Grid>
                                <Grid item xs={4}>
                                    <ListItemText primary={subcategory.description} />
                                </Grid>
                                <Grid item xs={1}>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() => handleEditCategory(subcategory._id)}
                                            sx={{
                                                backgroundColor: '#4CAF50',
                                                color: 'white',
                                                marginRight: '8px',
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteCategory(subcategory._id)}
                                            sx={{
                                                backgroundColor: '#F44336',
                                                color: 'white',
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}

                </List>
            </Paper>
        </Box>
    );
};

export default SunCategory
    ;
