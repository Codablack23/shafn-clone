import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "~/config/firebase.config";

class FirebaseAuthRepository{
    provider = new GoogleAuthProvider()
    async googleSignIn(){
        try {
            const userCredential = await signInWithPopup(auth,this.provider);
            const user = userCredential.user
            return {
                user,
                error:null
            }
        } catch (error) {
            return {
                error:error.message,
            }
        }
       
    }
}

const FirebaseAuthProvider = new FirebaseAuthRepository();
export default FirebaseAuthProvider