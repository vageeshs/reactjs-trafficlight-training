import React from "react";
import {  Button } from 'react-bootstrap';

class ShowInconsistent extends React.Component {
    state = { startTime: '', endTime: '', list : null}

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
                
    handleSubmit = e => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({"query" : {"type" : "malfunction" , 
                "startTime" : this.state.startTime, "endTime" : this.state.endTime} })
            }
        fetch('http://localhost:8080/api/lightstates/logs/search', requestOptions)
            .then(resp => resp.json())
            .then(data => this.setState({list : data}))
    }
    
    renderInvalidSignals = () => {
        return Object.keys(this.state.list).map( l => {
            return this.state.list[l].map(e => {
                return (
                    <tr key={e.startTime}>
                        <td>{l}</td>
                        <td>{e.startTime}</td>
                        <td>{e.endTime}</td>
                        <td>{e.invalidState}</td>
                    </tr>
                )
            })
        })
    }

    renderTable = () => {
        if (this.state.list) {
            return (
                <div style={{ margin: "30px 0 20px 0" }}>
                    <table className="table" striped id='invalidSignals'>
                        <thead>
                            <tr>
                                <th scope="col">Direction</th>
                                <th scope="col">Start Time </th>
                                <th scope="col">End Time</th>
                                <th scope="col">Invalid State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderInvalidSignals()}
                        </tbody>
                    </table>
                </div>           
            )
        }
    }
           
    render() {
        return (
            <div className="container" >
                < h1 style={{ fontSize: "20px", margin: "50px 0 20px 0" }} > Find inconsistent signal states < /h1> 
                <form onSubmit={this.handleSubmit} className="form-container">
                    <input className="date"
                        type="date"
                        placeholder="Start time..."
                        value={this.state.startTime}
                        name="startTime"
                        onChange={this.onChange} />
                    <input className="date"
                        type="date"
                        placeholder="End time..."
                        value={this.state.endTime}
                        name="endTime"
                        onChange={this.onChange}/>
                    <Button type="submit" variant="primary">Find</Button>
                </form>
                {this.renderTable()}
            </div>
        )
    }
}

export default ShowInconsistent;