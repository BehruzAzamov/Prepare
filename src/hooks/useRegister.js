import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
export { login } from "../features/userSlice";

export function useRegister() {
  const dispatch = useDispatch();
  const register = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
        dispatch(login(userCredential.user));
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  };
  const registerWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        dispatch(login(user));
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  };

  return { register, registerWithGoogle };
}