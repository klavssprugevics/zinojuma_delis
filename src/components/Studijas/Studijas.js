import React, {Component} from 'react';
import './Studijas.scss';
import {NavLink} from "react-router-dom";
import StudijasSkatitPazinojumi from './Skatit/StudijasSkatitPazinojumi.js';
import StudijasSkatitLekcijas from './Skatit/StudijasSkatitLekcijas.js';


class Studijas extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            selectLabel: "pazinojums"
        }
        this.ChangeInput = this.ChangeInput.bind(this);
    }
    

    ChangeInput(event) {
        this.setState({
            selectLabel: event.target.value,
        });
    }


    render()
    {
        return(
            <div>
                <NavLink className="studijasPievienot" to={`/studijas/pievienot`}>Pievienot info</NavLink>
                <select className="selectBox" value={this.state.selectLabel} onChange={this.ChangeInput}>
                        <option value="pazinojums">Paziņojums</option>
                        <option value="lekcija">Lekcija</option>
                </select>
                <div className="izvelne">
                    {this.state.selectLabel === "pazinojums" &&
                        <div>
                            <StudijasSkatitPazinojumi/>
                        </div>
                    }
                    {this.state.selectLabel === "lekcija" &&
                        <div>
                            <StudijasSkatitLekcijas/>
                        </div>
                    }
                </div>
            
            </div>
        );
    }
}

export default Studijas;