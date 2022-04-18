import {useState} from "react";
import PropTypes from 'prop-types';

function AmountSlider(props) {
    const [amount, setAmount] = useState(props.initial);
    const [editingCustom, setEditing] = useState(false);
    let round = props.round || 1;

    let amountDisplay;
    if (props.custom) {
        if (editingCustom) {
            amountDisplay = (
                <input className="amount" type="number" value={amount}
                       onBlur={() => {
                           setEditing(false)
                       }}
                       onChange={(e) => {
                           let clamped = Math.max(props.min, e.target.value)
                           setAmount(clamped);

                           if (props.onChange) {
                               props.onChange(clamped);
                           }
                           setAmount(clamped);
                       }}/>

            )
        } else {
            amountDisplay = (
                <>
                    <a onClick={() => {
                        setEditing(true)
                    }}>Click to enter custom amount</a>
                    <h3 className="amount">
                        ${amount}
                    </h3>
                </>
            )
        }
    } else {
        amountDisplay = (
            <h3 className="amount">
                ${amount}
            </h3>
        )
    }

    return (
        <div className="amount-slider">
            <h2>Select amount:</h2>
            <input type="range" min={props.min} max={props.max}
                   value={amount}
                   onChange={(e) => {
                       let rounded = Math.round(e.target.value / round) * round
                       rounded = Math.max(props.min, rounded);
                       rounded = Math.min(props.max, rounded);
                       setAmount(rounded);

                       if (props.onChange) {
                           props.onChange(rounded);
                       }
                   }}
            />
            {amountDisplay}
        </div>
    )
}

AmountSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    initial: PropTypes.number.isRequired,
    round: PropTypes.number,
    onChange: PropTypes.func
}

export default AmountSlider;