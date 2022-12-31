import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useRegistration = () => {
  const navigate = useNavigate();
  const register = async (email, password, photo, displayNameValue) => {
    // proses untuk registrasi user authentication
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("Email Sudah Terdaftar");
      }

      // upload avatar pada storage
      // lokasi file
      const uploadPath = `images/${res.user.uid}/${photo.name}`;
      const refStorage = ref(storage, uploadPath);
      await uploadBytes(refStorage, photo);

      // update foto url & displayname pada user
      await getDownloadURL(refStorage)
        .then(async (url) => {
          await updateProfile(res.user, {
            displayName: displayNameValue,
            photoURL: url,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      // store data yang ada ke firestore database
      await setDoc(doc(db, "users", res.user.uid), {
        online: false,
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
      });

      toast.success("Anda Telah Registrasi!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //   navigate ke login

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.message) {
        toast.error("Email anda telah terdaftar", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };
  return register;
};

export default useRegistration;
