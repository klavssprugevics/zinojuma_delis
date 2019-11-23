import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import TestView from './../test/TestView.js';
import './Studijas.scss';

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
            <div className="pageStuff">
                <select className="selectBox" value={this.state.selectLabel} onChange={this.ChangeInput}>
                    <option value="pazinojums">Paziņojumi</option>
                    <option value="lekcija">Lekciju izmaiņas</option>
                </select>
               
                <div>
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