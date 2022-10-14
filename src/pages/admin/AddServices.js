import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import React, { useState } from 'react'
import { toast } from "react-toastify";
import { db, storage } from '../../config/config'
import Loader from '../../component/Loader';
// import { collection, addDoc } from "../../config/config";
// import Card from '../../component/Card';
import './../../styles/Admin/AddServices.css'
import { useNavigate, useParams } from "react-router-dom";
import { selectServices } from "../../redux/slice/serviceSlice";
import { useSelector } from "react-redux";

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  desc: "",
}

const categories = [
  { id: 1, name: "ปะปา" },
  { id: 2, name: "ไฟฟ้า" },
  { id: 3, name: "ตรวจสอบ" }

]

const AddServices = () => {

  const { id } = useParams();

  const services = useSelector(selectServices)
  const serviceEdit = services.find((item) => item.id === id);
  console.log(serviceEdit);

  const [service, setService] = useState(() => {
    const newState = detectForm(id, { ...initialState }, serviceEdit)
    return newState;
  })

  const [uploadProgress, setUploadProgress] = useState(0);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()


  function detectForm(id, f1, f2) {
    if (id === 'ADD') {
      return f1;
    }
    return f2
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setService({ ...service, [name]: value })
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file);

    const storageRef = ref(storage, `handyman/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        setUploadProgress(progress)

      },
      (error) => {
        toast.error(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setService({ ...service, imageURL: downloadURL });
          toast.success("Image uploaded successfully.")
        });
      }
    );

  };

  const addService = (e) => {
    e.preventDefault()
    console.log(service)
    setLoading(true)

    try {
      const docRef = addDoc(collection(db, "services"), {
        name: service.name,
        imageURL: service.imageURL,
        price: Number(service.price),
        category: service.category,
        desc: service.desc,
        createdAt: Timestamp.now().toDate()

      });
      toast.success("Service uploaded successfully.")
      setUploadProgress(0)
      setLoading(false)
      setService({ ...initialState })

      navigate('/allservices')
    } catch (error) {
      toast.error(error.message)

      setLoading(false)
    }
  }

  const editService = (e) => {
    e.preventDefault();
    setLoading(true);

    if(service.imageURL !== serviceEdit.imageURL){
      const storageRef = ref(storage, serviceEdit.imageURL);
      deleteObject(storageRef)
    }

    try {
      setDoc(doc(db, "services", id), {
        name: service.name,
        imageURL: service.imageURL,
        price: Number(service.price),
        category: service.category,
        desc: service.desc,
        createdAt: serviceEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      });

      setLoading(false)
      toast.success("Service Edited Successfully.")
      navigate('/allservices')
    } catch (error) {
      toast.error(error.message)

      setLoading(false)
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className='service'>
        <br></br>
        <h1 className="addhead">{detectForm(id, "Add New Service", "Edit Service")}</h1>
        <br></br>
        <div className="card">
          <form onSubmit={detectForm(id, addService, editService)}>
            <label>Service Name:</label>
            <input type={'text'} placeholder='Service name' required name='name' value={service.name} onChange={(e) => handleInputChange(e)} />

            <label>Service Image:</label>
            <div className='group'>
              {uploadProgress === 0 ? null : (
                <div className='progress'>
                  <div className='progess-bar' style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress < 100 ? `Uploading ${uploadProgress}` : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input type={'file'} accept='image/*' placeholder='Service Image' name='image' onChange={(e) => handleImageChange(e)} />

              {service.imageURL === "" ? null : (
                <input type={'text'} name='imageURL' placeholder='ImageURL' value={service.imageURL} disabled />
              )}

            </div>
                <label>Price</label>
            <input type="number" placeholder="Service price" required name="price" value={service.price} onChange={(e) => handleInputChange(e)} />

            <label>Service Category:</label>
            <select required name='category' value={service.category} onChange={(e) => handleInputChange(e)}>
              <option value={''} disabled>
                --Choose service category--
              </option>
              {categories.map((cate) => {
                return (
                  <option key={cate.id} value={cate.name}>
                    {cate.name}
                  </option>
                )
              })}
            </select>

            <label>Service Description:</label>
            <textarea name='desc' value={service.desc} onChange={(e) => handleInputChange(e)} cols={'30'} rows={'10'}></textarea>

            <button className='--btn --btn-primary'>{detectForm(id, "Save Service", "Edit Service")}</button>

          </form>
        </div>
        <br></br>

      </div>
    </>
  )
}

export default AddServices