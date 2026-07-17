import FirebaseService from "../firebase/firebaseService";
import COLLECTIONS from "../firebase/collections";

class ContactService {

    async submit(formData) {

        try {

            return await FirebaseService.create(
                COLLECTIONS.CONTACTS,
                formData
            );

        } catch (error) {

            console.error(error);

            return {
                success: false,
                message: error.message,
            };
        }

    }

}

export default new ContactService();