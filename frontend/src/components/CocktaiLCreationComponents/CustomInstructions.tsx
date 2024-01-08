import { useState } from "react"

import './CustomInstructions.css'

interface CustomInstructionsProps {
    onInstructionsChange: (instr: string) => void
}

export const CustomInstructions: React.FC<CustomInstructionsProps> = ({ onInstructionsChange }) => {

    const [instructions, setInstructions] = useState<string>('')

    const handleInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInstructions(e.target.value)
        onInstructionsChange(e.target.value)
    }

    return (
        <>
            <div className="instructions-container">
                <h3>Write the instructions to create your potion !</h3>
                <textarea className="custom-instr" onChange={handleInstructionsChange} />
            </div>
        </>
    )
}