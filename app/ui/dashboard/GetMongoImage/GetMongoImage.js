'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

const GetMongoImage = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        const fetchImages = async () => {
            try{
                const response = await fetch('/api/upload-mongo-image');
                const result = await response.json();
                if(result.success){
                    setImages(result.images);
                }
                else {
                    console.log('Error')
                }

            }
            catch(error){
                console.log(error)
            }
        };
        fetchImages();
    }, [])
  return (
    <>
     <h2>Get Image From Mongo DB</h2>
     <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
            images.map((image) => (
                <div key={image._id} style={{ margin: '10px'}}>
                    <Image
                        src={`data:${image.contentType};base64,${Buffer.from(image.data).toString('base64')}`}
                        alt={image.name}
                        width={400}
                        height={400}
                    />
                    <p>{image.name}</p>
                </div>
            ))
        }
     </div>
    </>
  );
}

export default GetMongoImage;