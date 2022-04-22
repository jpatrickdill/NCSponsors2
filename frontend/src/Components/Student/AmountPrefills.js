import {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';

function Toggle(props) {
    const [enabled, setEnabled] = useState(false);

    return <a className={"inline button" + (enabled ? " enabled" : "")}
              onClick={() => {
                  let v = !enabled
                  setEnabled(!enabled);
                  if (props.onChange) {
                      props.onChange(v);
                  }
              }}
    >
        {props.children}
    </a>
}

function getTotal(options, _selected) {
    let total = 0;

    for (let [key, value] of Object.entries(options)) {
        if (_selected[key]) {
            total += value
        }
    }

    return total
}

function AmountPrefills(props) {
    const [custom, setCustom] = useState(0);

    let choices = props.choices || {}

    let selectedInitial = {}
    for (let [key, val] of Object.entries(choices)) {
        selectedInitial[key] = false;
    }

    const [selected, _setSelected] = useState(selectedInitial)

    function setSelected(key, val) {
        let new_selected = Object.assign(selected, {[key]: val})
        _setSelected(
            new_selected
        );

        let total = getTotal(choices, new_selected)

        if (props.onTotal) {
            props.onTotal(total + custom)
        }
        console.log(total + custom)
    }


    return (
        <div className="amount-prefills">
            <h2>Select items:</h2>
            {Object.entries(choices).map(([key, val]) => {
                return (
                    <Toggle
                        onChange={(v) => {
                            setSelected(
                                key, v
                            );
                        }}
                    >
                        {key} - ${val}
                    </Toggle>
                )
            })}

            <div className="custom">
                <label>Custom amount: </label>
                <input type="number" placeholder="0"
                       value={custom.toString()} onChange={(e) => {
                    let n_custom = parseFloat(e.target.value || 0);
                    setCustom(n_custom);

                    if (props.onTotal) {
                        let total = getTotal(choices, selected)
                        props.onTotal(total + n_custom)
                    }
                }}/>
            </div>
        </div>
    )
}

AmountPrefills.propTypes = {
    choices: PropTypes.object,
    onTotal: PropTypes.func
}

export default AmountPrefills;