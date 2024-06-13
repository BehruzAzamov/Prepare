import { useCollection } from "../hooks/useCollection";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/firebaseConfig";

function CreateRecipe() {
    const { user } = useSelector(state => state.currentUser);
    const { data } = useCollection('tasks', ["uid", '==', user.uid]);
    const [title, setTitle] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [ingredientInput, setIngredientInput] = useState("");
    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, cookingTime, ingredients, images, description, uid: user.uid };
        try {
            await addDoc(collection(db, "tasks"), newTask);
            setTitle("");
            setCookingTime("");
            setIngredients([]);
            setImages([]);
            setImageUrl("");
            setDescription("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleAddIngredient = () => {
        if (ingredientInput.trim() !== "") {
            setIngredients(prevIngredients => [...prevIngredients, ingredientInput]);
            setIngredientInput("");
        }
    };

    const handleAddImage = () => {
        if (imageUrl.trim() !== "") {
            setImages(prevImages => [...prevImages, imageUrl]);
            setImageUrl("");
        }
    };

    return (
        <div>
            <label className="form-control w-full mb-4">
                <div className="label">
                    <span className="label-text">Title:</span>
                </div>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full mb-4">
                <div className="label">
                    <span className="label-text">Cooking Time:</span>
                </div>
                <input value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
            </label>
            <div className="form-control w-full mb-4">
                <div className="label">
                    <span className="label-text">Ingredients:</span>
                </div>
                <div className="flex items-center">
                    <input value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} type="text" placeholder="Type ingredient here" className="input input-bordered w-full mr-2" />
                    <button onClick={handleAddIngredient} className="btn btn-primary">Add Ingredient</button>
                </div>
                <ul className="flex text-xl">
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient},</li>
                    ))}
                </ul>
            </div>
            <div className="form-control w-full mb-4">
                <div className="label">
                    <span className="label-text">Image URLs:</span>
                </div>
                <div className="flex items-center">
                    <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="url" placeholder="Image URL" className="input input-bordered w-full mr-2" />
                    <button onClick={handleAddImage} className="btn btn-primary">Add Image</button>
                </div>
                <div className="flex">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Image ${index}`} className="w-24 rounded-full mt-4 h-24 object-cover mr-2 mb-2" />
                    ))}
                </div>
            </div>
            <label className="form-control w-full mb-4">
                <div className="label">
                    <span className="label-text">Method:</span>
                </div>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="textarea textarea-bordered w-full" ></textarea>
            </label>
            <div className="btns flex gap-x-5">
                <button onClick={handleSubmit} className="btn btn-info w-1/2">
                    Apply
                </button>
                <button className="btn btn-success w-1/2">Preview</button>
            </div>
        </div>
    );
}

export default CreateRecipe;
