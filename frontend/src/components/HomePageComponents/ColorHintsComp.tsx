import './ColorHintsComp.css';

export const ColorHintsComp: React.FC = () => {

    return (
        <>
            <div className="colors-container">
                <div className="red-color-hint color-hint">
                    <div className="red-square square" />
                    <div className="red-text color-text">
                        <p>Contains Alcohol</p>
                    </div>
                </div>
                <div className="blue-color-hint color-hint">
                    <div className="blue-square square" />
                    <div className="blue-text color-text">
                        <p>Doesn't contain Alcohol</p>
                    </div>
                </div>
            </div>
        </>
    )
};