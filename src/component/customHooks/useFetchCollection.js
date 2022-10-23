import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../config/config";


const useFetchCollection = (collectionName) => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false);

    const getCollection = () => {
        setLoading(true)
    
        try {
          const docRef = (collection(db, collectionName));
    
          const q = query(docRef, orderBy("createdAt", "desc"));
    
          onSnapshot(q, (snapshot) => {
            // console.log(snapshot.docs);
            const allData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
              
            }));
            // console.log(allData);
            setData(allData);
            setLoading(false);
    
            
            // dispatch(
            //   STORE_SERVICES({
            //   services: allData,
            //   })
            // );
          });
    
        } catch (error) {
          setLoading(false)
          toast.error(error.message)
        };

    }

    useEffect(() => {
        getCollection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {data, loading}
}

export default useFetchCollection;