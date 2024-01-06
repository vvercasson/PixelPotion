import './ColorHintsComp.css';

export const ColorHintsComp: React.FC = () => {

    return (
        <>
            <div className="colors-container">
                <div className='color-hint'>
                    <h3 className='red before'>Red cocktails</h3>
                    <h3 className='before'>contain alcohol,</h3>
                    <h3 className='blue before'>Blue ones</h3>
                    <h3 className='end'>don't !</h3>
                </div>
            </div>
        </>
    )
};