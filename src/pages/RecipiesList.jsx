import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCollection } from '../hooks/useCollection';
import { MdDelete } from 'react-icons/md';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import PieChart from '../components/PieChart';
function RecipiesList() {
    const { user } = useSelector(state => state.currentUser);
    const { data } = useCollection('tasks', ['uid', '==', user.uid]);

    const [likedRecipes, setLikedRecipes] = useState([]);
    const [likesCount, setLikesCount] = useState({});
    const [pieChartData, setPieChartData] = useState([]); // State to hold data for pie chart

    useEffect(() => {
        if (data) {
            const initialLikes = {};
            const typeCounts = {}; // Object to count likes per type
            data.forEach(item => {
                initialLikes[item.id] = 0; // Initialize likes count to 0 for each recipe
                if (typeCounts[item.type]) {
                    typeCounts[item.type] += 1; // Increment count for each type
                } else {
                    typeCounts[item.type] = 1; // Initialize count for new type
                }
            });
            setLikesCount(initialLikes);

            // Format data for pie chart
            const pieData = Object.keys(typeCounts).map(type => ({
                type,
                value: typeCounts[type],
            }));
            setPieChartData(pieData);
        }
    }, [data]);

    const toggleLike = async (itemId) => {
        if (likedRecipes.includes(itemId)) {
            setLikedRecipes(likedRecipes.filter(id => id !== itemId));
            await updateLikesCount(itemId, -1); // Decrease likes count in Firestore
        } else {
            setLikedRecipes([...likedRecipes, itemId]);
            await updateLikesCount(itemId, 1); // Increase likes count in Firestore
        }
    };

    const updateLikesCount = async (itemId, increment) => {
        try {
            const recipeRef = doc(db, 'tasks', itemId);
            await db.runTransaction(async transaction => {
                const recipeDoc = await transaction.get(recipeRef);
                if (!recipeDoc.exists()) {
                    throw "Recipe does not exist!";
                }
                const newLikes = (recipeDoc.data().likes || 0) + increment;
                transaction.update(recipeRef, { likes: newLikes });
            });
        } catch (error) {
            console.error('Error updating likes count:', error);
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
        <div>
            <div className="w-full mt-5 h-52 posit rounded-lg p-4 shadow-lg">
                <PieChart data={pieChartData} />
            </div>
            <div className="grid mt-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                        <FcLike className="w-5 h-5" />
                                    ) : (
                                        <CiHeart className="w-5 h-5" />
                                    )}
                                    <span>{likedRecipes.includes(item.id) ? 'Liked' : 'Like'}</span>
                                </button>
                                <MdDelete
                                    className="w-6 h-6 text-red-500 cursor-pointer"
                                    onClick={e => deleteBtn(e, item.id)}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            
        </div>
    );
}

export default RecipiesList;
