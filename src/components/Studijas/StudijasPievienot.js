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
                <div className="pievienotForma">
                    <select className="selectBox" value={this.state.selectLabel} onChange={this.ChangeInput}>
                        <option value="pazinojums">Paziņojums</option>
                        <option value="lekcija">Lekcija</option>
                    </select>

                    <div className="ievade">
                        {this.state.selectLabel === "pazinojums" &&
                            <div>
                                <StudijasPievienotPazinojums/>
                            </div>
                        }
                        {this.state.selectLabel === "lekcija" &&
                            <h1>this is lekcija</h1>
                        }
                    </div>


                </div>
            );
        }

    }
}

export default StudijasPievienot;