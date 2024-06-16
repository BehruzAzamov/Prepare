import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCollection } from '../hooks/useCollection';
import { MdDelete } from 'react-icons/md';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";

function RecipiesList() {
    const { user } = useSelector(state => state.currentUser);
    const { data } = useCollection('tasks', ['uid', '==', user.uid]);

    const [likedRecipes, setLikedRecipes] = useState([]); 

    const toggleLike = (itemId) => {
        if (likedRecipes.includes(itemId)) {
            setLikedRecipes(likedRecipes.filter(id => id !== itemId));
        } else {
            setLikedRecipes([...likedRecipes, itemId]);
        }
    };

    const deleteBtn = async (e, taskId) => {
        e.stopPropagation();
        try {
            await deleteDoc(doc(db, 'tasks', taskId));
            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    };

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data &&
                data.map(item => (
                    <div key={item.id} className="card bg-base-100 rounded-lg p-4 shadow-lg">
                        <Link to={`/recipe/${item.id}`} className="link">
                            <figure className="rounded-lg overflow-hidden">
                                {item.images &&
                                    item.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Image ${index}`}
                                            className="w-full h-40 object-cover"
                                        />
                                    ))}
                            </figure>
                            <div className="card-body mt-2">
                                <h2 className="card-title text-lg font-bold">{item.title}</h2>
                                <p className="text-sm text-gray-600">{item.cookingTime}</p>
                            </div>
                        </Link>
                        <div className="flex justify-between items-center mt-2">
                            <button
                                className="flex items-center gap-1 text-gray-500"
                                onClick={() => toggleLike(item.id)}
                            >
                                {likedRecipes.includes(item.id) ? (
                                    <FcLike className="w-5 h-5"/>
                                ) : (
                                    <CiHeart className="w-5 h-5"/>
                                )}
                                <span>{likedRecipes.includes(item.id) ? 'Liked' : 'Like'}</span>
                            </button>
                            {/* Delete Button */}
                            <MdDelete
                                className="w-6 h-6 text-red-500 cursor-pointer"
                                onClick={e => deleteBtn(e, item.id)}
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default RecipiesList;
