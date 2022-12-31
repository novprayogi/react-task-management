import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userLogin } from "../features/userSlice";
import { auth, db } from "../firebase/config";

const useLogin = () => {
  const dispatch = useDispatch();
  const login = async (email, password) => {
    // proses login
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userInfo = {
          displayName: user.displayName,
          userId: user.uid,
          photoURL: user.photoURL,
          email: user.email,
        };
        //notif
        toast.success("Anda berhasil Login!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // Set update table user field online jadi true
        await updateDoc(doc(db, "users", user.uid), {
          online: true,
        });

        setTimeout(() => {
          dispatch(userLogin(userInfo));
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
        alert("Email atau password salah");
      });
  };
  return login;
};

export default useLogin;
