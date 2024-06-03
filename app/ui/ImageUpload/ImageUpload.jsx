'use client'

import { useState } from "react";
import Image from 'next/image'



export default function ImageUpload(){
   const [image, setImage] = useState("")

    function covertToBase64(e){
        console.log(e);
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
console.log(reader.result);
setImage(reader.result)
        }
        reader.onerror = error => {
            console.log("Eroor:", error)
        }
    }
    return(
        <>
        <input type="file"
            className="file-input w-full max-w-xs"
            onChange={covertToBase64} />
            {image == '' || image == null?'': <Image
      src={image}
      width={500}
      height={500}
      alt="Picture of the author"
    />}
            
            </>
    )
}