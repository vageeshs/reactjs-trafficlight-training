import React from "react";
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import ShowInconsistent from "./InvalidStates";

class Signal extends React.Component {
    render() {
        const {
            lightId,
            currState
        } = this.props.signal;

        const handleChange = (val) => {
            this.props.changeState(lightId, val[1]);
        };

        return ( 
            <div className = "signal-item" >
                <span className="signal-button">{lightId}</span>
                < ToggleButtonGroup type = "checkbox" value = {currState } onChange = {handleChange} >
                    <ToggleButton className="signal-button" variant={currState === "Red" ? "danger" : "outline-danger"} value={"Red"} > Red < /ToggleButton>
                    <ToggleButton className="signal-button" variant={currState === "Green" ? "success" : "outline-success"} value={"Green"} > Green < /ToggleButton> 
                </ToggleButtonGroup >
            </div>
        );
    }
}

class SignalsContainer extends React.Component {
    state = {
        signals: [{ lightId: "North", currState: "" },
            { lightId: "East",currState: "" },
            { lightId: "South", currState: "" },
            { lightId: "West", currState: ""}],
    }
            
    changeState = (lightId, newState) => {
        this.setState({
            signals: this.state.signals.map((s) => {
                if (s.lightId === lightId) {
                    s.currState = newState;
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ lightId, newState })
                    };
                    fetch('http://localhost:8080/api/lightstates/logs/', requestOptions)
                        .then(resp => resp.json())
                }
                return s;
            }),
        })
    }

    render() {
        return ( 
            < div className = "container" >
                < header className = "header" >
                    < h1 style = {{ fontSize: "25px", margin: "30px 0"}} > Change Traffic Light Signal < /h1> 
                </header >
                <div>
                    {this.state.signals.map(s => (
                        <Signal key = {s.lightId}
                            signal={s}
                            changeState={this.changeState} />
                    ))}
                </div>
                <ShowInconsistent/>
            </div>
        );
    }
}
export default SignalsContainer;