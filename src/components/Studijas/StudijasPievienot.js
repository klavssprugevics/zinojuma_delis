import React, {Component} from 'react';
import './StudijasPievienot.scss';
import {Redirect} from 'react-router-dom';
import './Pievienot/StudijasPievienotPazinojums.js'
import StudijasPievienotPazinojums from './Pievienot/StudijasPievienotPazinojums.js';


class StudijasPievienot extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            submitPressed: false,
            selectLabel: "pazinojums"
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
        this.setState({
            selectLabel: event.target.value,
        });
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
            console.log(this.state.selectLabel);
            return(
                <div>
                    <select value={this.state.selectLabel} onChange={this.ChangeInput}>
                        <option value="pazinojums">Paziņojums</option>
                        <option value="lekcija">Lekcija</option>
                    </select>

                    {this.state.selectLabel === "pazinojums" &&
                        <div>
                            <h1>this is pazinojums</h1>
                            <StudijasPievienotPazinojums/>
                        </div>
                    }
                    {this.state.selectLabel === "lekcija" &&
                        <h1>this is lekcija</h1>
                    }



                </div>
            );
        }

    }
}

export default StudijasPievienot;