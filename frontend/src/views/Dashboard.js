import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext'; 
import CategoryCard from '../components/CategoryCard'; 
import '../styles.css';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const Dashboard = () => {
    const { authTokens } = useContext(AuthContext); // Access the authTokens from context
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/categories/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens?.access}` // Include the JWT token in the header
                }
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get the error response as text
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const jsonData = await response.json(); // Parse response as JSON
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message); // Set error message to state for display
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);



    // Render loading state, error message, or fetched data
    if (error) {
        return <div>Error: {error}</div>;
    }

    // If data is not yet fetched, show loading message
    if (!data.length) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <h1 className="text-center">Categories</h1>
            <Row className="justify-content-center"> 
                {data.map(category => (
                    <Col xs={12} sm={6} md={4} key={category.category_id} className="mb-4"> 
                        <div className="category-card">
                            <CategoryCard category={category} />
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Dashboard;
