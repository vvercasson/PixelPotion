import './CustomInstructions.css'

interface CustomInstructionsProps {
    onInstructionsChange: (instr: string) => void
}

export const CustomInstructions: React.FC<CustomInstructionsProps> = ({ onInstructionsChange }) => {


    const handleInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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