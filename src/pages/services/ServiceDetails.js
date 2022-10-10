import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/config';

const ServiceDetails = () => {

  const { id } = useParams();
  console.log(id)
  const [service, setService] = useState(null);

  useEffect(() => {
    getService();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getService = async () => {
    // console.log("Getting Service")
    const docRef = doc(db, "services", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return (
    <div>
      <h2>Service Detail</h2>
      <p>{id}</p>
    </div>
  )
}


export default ServiceDetails