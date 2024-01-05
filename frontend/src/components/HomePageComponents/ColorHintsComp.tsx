import './ColorHintsComp.css';

export const ColorHintsComp: React.FC = () => {

    return (
        <>
            <div className="colors-container">
                <div className="red-color-hint">
                    <div className="red-square" />
                    <div className="red-text">
                        <p>Contains Alcohol</p>
                    </div>
                </div>
                <div className="blue-color-hint">
                    <div className="blue-square" />
                    <div className="blue-text">
                        <p>Doesn't contain Alcohol</p>
                    </div>
                </div>
            </div>
        </>
    )
};