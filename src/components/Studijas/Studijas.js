import React, {Component} from 'react';
import './Studijas.scss';
import {NavLink} from "react-router-dom";
import StudijasSkatitPazinojumi from './Skatit/StudijasSkatitPazinojumi.js';
import StudijasSkatitLekcijas from './Skatit/StudijasSkatitLekcijas.js';
import {Redirect} from 'react-router-dom';
import TestView from './../test/TestView.js';


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
                        <TestView
                        customMessage="Jaunākie paziņojumi studijās!"
                        urlParams="pazinojumi"
                        fieldNames = {[
                        "nosaukums",
                        "apraksts"
                        ]}
                        cssNames ={[
                        "nosaukums",
                        "apraksts",
                        ]}
                        />
                    
                    }
                    {this.state.selectLabel === "lekcija" &&
                            <TestView
                            customMessage="Lekciju izmaiņas"
                            urlParams="lekcijas"
                            fieldNames = {[
                                "kurss",
                                "datums",
                                "laiks",
                                "kabinets",
                                "statuss"
                            ]}
                            cssNames ={[
                                "nosaukums",
                                "datums",
                                "laiks",
                                "kabinets",
                                "statuss"
                            ]}
                            />
                    }
                </div>
            
            </div>
        );
    }
}

export default Studijas;