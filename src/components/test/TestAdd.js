import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import StudijasPievienotPazinojums from './../Studijas/Pievienot/StudijasPievienotPazinojums.js';
import StudijasPievienotLekcija from './../Studijas/Pievienot/StudijasPievienotLekcija.js';
import AktualitatesPievienot from './../Aktualitates/AktualitatesPievienot.js';


class StudijasPievienot extends Component{

    constructor(props)
    {
        super(props);
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
            }            
        }
        else
        {
            return(
                <div className="pievienotForma">
                    <select className="selectBox" value={this.state.selectLabel} onChange={this.ChangeInput}>
                        <option value="pazinojums">Paziņojums</option>
                        <option value="lekcija">Lekcija</option>
                        <option value="aktualitate">Aktualitāte</option>
                    </select>

                    <div className="ievade">
                        {this.state.selectLabel === "pazinojums" &&
                            <div>
                                <StudijasPievienotPazinojums/>
                            </div>
                        }
                        {this.state.selectLabel === "lekcija" &&
                            <div>
                                <StudijasPievienotLekcija/>
                            </div>
                        }
                        {this.state.selectLabel === "aktualitate" &&
                            <div>
                                <AktualitatesPievienot/>
                            </div>
                        }
                    </div>


                </div>
            );
        }

    }
}

export default StudijasPievienot;