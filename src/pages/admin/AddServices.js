import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from 'react'
import { toast } from "react-toastify";
import { db, storage } from '../../config/config'
import Loader from '../../component/Loader';
// import { collection, addDoc } from "../../config/config";
// import Card from '../../component/Card';
import './../../styles/Admin/AddServices.css'
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  desc: "",
}

const AddServices = () => {

  const [service, setService] = useState({
    ...initialState
  })

  const [uploadProgress, setUploadProgress] = useState(0);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  

  const categories = [
    { id: 1, name: "Plumbing" },
    { id: 2, name: "Electricity" }

  ]

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

  const addService = async (e) => {
    e.preventDefault()
    // console.log(service)
    setLoading(true)

    try {
      const docRef = await addDoc(collection(db, "services"), {
        name: service.name,
        imageURL: service.imageURL,
        price: Number(service.price),
        category: service.category,
        desc: service.desc,
        createAt: Timestamp.now().toDate()

      });
      toast.success("Service uploaded successfully.")
      setUploadProgress(0)
      setLoading(false)
      setService({...initialState})

      navigate('/allservices')
    } catch (error) {
      toast.error(error.message)

      setLoading(false)
    }
  }

  return (
    <>
    {loading && <Loader />}
    <div className='service'>
      <h1 className="headertext">Add New Service</h1>
      <div className="card">
        <form onSubmit={addService}>
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

          <input
            type="number"
            placeholder="Service price"
            required
            name="price"
            value={service.price}
            onChange={(e) => handleInputChange(e)}
          />

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

          <button className='--btn --btn-primary'>Save Service</button>

        </form>
      </div>

    </div>
    </>
  )
}

export default AddServices