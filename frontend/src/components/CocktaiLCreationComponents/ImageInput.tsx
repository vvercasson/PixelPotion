import { ChangeEvent, useState } from "react"
import './ImageInput.css'

interface ImageInputProps {
    onImageChange: (img: File) => void
}

export const ImageInput: React.FC<ImageInputProps> = ({ onImageChange }) => {

    const [image, setImage] = useState<File | null>(null)

    function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
        if (event.target.files) {
            setImage(event.target.files[0])
            onImageChange(event.target.files[0])
        }
    }

    return (
        <>
            <div className="custom-img-container">
                <div className="custom-img-container">
                    <h3>Add the image of your potion !</h3>
                    <input className='custom-img-input' type="file" onChange={handleImageChange} multiple={false} accept="image/*" />
                    <div className="preview-container">
                        {image && <img className="preview" src={URL.createObjectURL(image)} alt="preview unavailable" />}
                    </div>
                </div>
            </div>
        </>
    )
}