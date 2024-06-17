import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function CreateRecipe() {
  const { user } = useSelector(state => state.currentUser);
  const [title, setTitle] = useState('');
  const [type, setType] = useState(''); // Corrected initialization
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrlError, setImageUrlError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      type,
      ingredients,
      images,
      description,
      uid: user.uid
    };
    try {
      await addDoc(collection(db, 'tasks'), newTask);
      setTitle('');
      setType(''); // Reset type
      setIngredients([]);
      setImages([]);
      setImageUrl('');
      setDescription('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== '') {
      setIngredients(prevIngredients => [...prevIngredients, ingredientInput]);
      setIngredientInput('');
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleAddImage = () => {
    if (imageUrl.trim() !== '') {
      if (isValidUrl(imageUrl)) {
        setImages(prevImages => [...prevImages, imageUrl]);
        setImageUrl('');
        setImageUrlError('');
      } else {
        setImageUrlError('Please enter a valid URL.');
      }
    } else {
      setImageUrlError('Image URL cannot be empty.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
      <label className="form-control w-full mb-4">
        <div className="label">
          <span className="label-text">Title:</span>
        </div>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full mb-4">
        <div className="label">
          <span className="label-text">Type:</span>
        </div>
        <input
          required
          value={type}
          onChange={(e) => setType(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>
      <div className="form-control w-full mb-4">
        <div className="label">
          <span className="label-text">Ingredients:</span>
        </div>
        <div className="flex items-center">
          <input
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            type="text"
            placeholder="Type ingredient here"
            className="input input-bordered w-full mr-2"
          />
          <button onClick={handleAddIngredient} className="btn btn-primary">
            Add Ingredient
          </button>
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
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            type="url"
            placeholder="Image URL"
            className="input input-bordered w-full mr-2"
          />
          <button onClick={handleAddImage} className="btn btn-primary">
            Add Image
          </button>
        </div>
        {imageUrlError && <p className="text-red-500 text-xl">{imageUrlError}</p>}
        <div className="flex">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="w-24 rounded-full mt-4 h-24 object-cover mr-2 mb-2"
            />
          ))}
        </div>
      </div>
      <label className="form-control w-full mb-4">
        <div className="label">
          <span className="label-text">Method:</span>
        </div>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        ></textarea>
      </label>
      <div className="btns flex gap-x-5">
        <button type="submit" className="btn btn-info w-96">
          Apply
        </button>
        <button className="btn btn-success w-96">Preview</button>
      </div>
    </form>
  );
}

export default CreateRecipe;