import React, {Component} from 'react';
import './StudijasPievienot.scss';
import {Redirect} from 'react-router-dom';
import AddPazinojums from './add/AddPazinojums.js';
import AddLekcija from './add/Addlekcija.js';


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

    render()
    {
        if(this.state.submitPressed)
        {
            return <Redirect to="/studijas" />
        }
        else
        {
            // console.log(this.state.selectLabel);
            return(
                <div className="pievienotForma">
                    <select className="selectBox" value={this.state.selectLabel} onChange={this.ChangeInput}>
                        <option value="pazinojums">Paziņojums</option>
                        <option value="lekcija">Lekcija</option>
                    </select>

                    <div className="ievade">
                        {this.state.selectLabel === "pazinojums" &&
                            <div>
                                <AddPazinojums/>
                            </div>
                        }
                        {this.state.selectLabel === "lekcija" &&
                            <div>
                                <AddLekcija/>
                            </div>
                        }
                    </div>


                </div>
            );
        }

    }
}

export default StudijasPievienot;