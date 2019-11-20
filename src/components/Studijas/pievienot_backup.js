import React, {Component} from 'react';
import './StudijasPievienot.scss';
import {Redirect} from 'react-router-dom';


class StudijasPievienot extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            submitPressed: false,
            selectedInput: "pazinojums",
        }
        this.ParseInput = this.ParseInput.bind(this);
        this.ChangeInput = this.ChangeInput.bind(this);
    }

    ParseInput()
    {
        this.setState({
            submitPressed: true
        })
    }

    ChangeInput(event) {
        this.setState({selectedInput: event.target.value});
    }


    componentDidMount()
    {

    }

    render()
    {
        if(this.state.submitPressed)
        {
            return <Redirect to="/studijas" />
        }
        else
        {
            console.log(this.state.selectedInput);

            if(this.state.selectedInput==="pazinojums")
            {
                return(
                    <div>
                        <select value={this.state.selectedInput} onChange={this.ChangeInput}>
                            <option value="pazinojums">Paziņojums</option>
                            <option value="lekcija">Lekcija</option>
                        </select>
                        <h1>Pazinojums</h1>
                    </div>
                );
            }
            else
            {
                return(
                    <div>
                        <select value={this.state.selectedInput} onChange={this.ChangeInput}>
                            <option value="pazinojums">Paziņojums</option>
                            <option value="lekcija">Lekcija</option>
                        </select>
                        <h1>Lekcija</h1>
                    </div>
                );
            }

            return(
                <div>

                    
                    <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Publicēt!</button> 
                </div>
            );
        }

    }
}

export default StudijasPievienot;