import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function SingleRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const docRef = doc(db, "tasks", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setRecipe(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>Cooking Time: {recipe.cookingTime}</p>
            {recipe.images && (
                <Carousel>
                    {recipe.images.map((image, index) => (
                        <div key={index}>
                            <img className="w-full h-1/2" src={image} alt={`Image ${index}`} />
                        </div>
                    ))}
                </Carousel>
            )}
            <h2>Ingredients:</h2>
            <ul>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2>Method:</h2>
            <p>{recipe.description}</p>
        </div>
    );
}

export default SingleRecipe;
