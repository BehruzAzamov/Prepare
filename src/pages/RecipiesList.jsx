import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { MdDelete } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

function RecipiesList() {
    const { user } = useSelector(state => state.currentUser);
    const { data } = useCollection('tasks', ["uid", '==', user.uid]);

    const deleteBtn = async (e, taskId) => {
        e.stopPropagation(); // Prevent the click event from propagating to the Link
        try {
            await deleteDoc(doc(db, "tasks", taskId));
            console.log("Document successfully deleted!");
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    return (
        <div className="justify-items-center">
            {data && data.map((item) => (
                <div key={item.id} className="card card-compact w-96 bg-base-100 shadow-xl">
                    <Link to={`/recipe/${item.id}`}>
                        <figure>
                            {item.images && item.images.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={image} 
                                    alt={`Image ${index}`} 
                                    style={{ width: "100%", height: "200px", objectFit: "cover" }} 
                                />
                            ))}
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.title}</h2>
                            <p>{item.cookingTime}</p>
                        </div>
                    </Link>
                    <div className="card-actions justify-end">
                        <MdDelete 
                            className="w-5 h-5" 
                            onClick={(e) => deleteBtn(e, item.id)} 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RecipiesList;
