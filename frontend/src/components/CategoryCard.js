import { Link } from 'react-router-dom';
import '../styles.css';
 
// Function to generate a unique random image URL for each category
const getRandomImage = () => {
    return `https://loremflickr.com/200/200?random=${Math.floor(Math.random() * 1000)}`;
};
    
function CategoryCard({ category }) {
    return (
        <div className="card m-2" style={{ width: '18rem' }}>
            <div className="card-body">
             {/* Display random image for each category */}
             <img
                src={getRandomImage()}
                alt={`Category ${category.category_name}`}
                className="img-fluid mb-3"  // Responsive image styling
                style={{ width: '250px', height: 'auto', borderRadius: '8px' }} 
                />
                <h5 className="card-title">{category.category_name}</h5>
                <p>Created on: {new Date(category.created_time).toLocaleDateString()}</p>
                <Link to={`/categories/${category.category_id}`} className="btn btn-primary">View Products</Link>
            </div>
        </div>
    );
}

export default CategoryCard; 
