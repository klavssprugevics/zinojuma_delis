import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import AddPazinojums from './../studijas/add/AddPazinojums.js';
import AddLekcija from './../studijas/add/AddLekcija.js';
import AddAktualitate from './../aktualitates/add/AddAktualitate.js';

import './../utils/Design.scss';
import './TestAddLayout.scss'



class TestAdd extends Component{

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
            const choice = this.state.selectLabel;
            switch(choice)
            {
                case "pazinojums": return <Redirect to="/studijas"/>
                case "lekcija": return <Redirect to="/studijas"/>
                case "aktualitate": return <Redirect to="/aktualitates"/>
                default: return <Redirect to="/aktualitates"/>
            }            
        }
        else
        {
            return(
                <div className="addPage">
                    <select className="selectBox" value={this.state.selectLabel} onChange={this.ChangeInput}>
                        <option value="pazinojums">Paziņojums</option>
                        <option value="lekcija">Lekcija</option>
                        <option value="aktualitate">Aktualitāte</option>
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
                        {this.state.selectLabel === "aktualitate" &&
                            <div>
                                <AddAktualitate/>
                            </div>
                        }
                    </div>
                </div>
            );
        }

    }
}

export default TestAdd;