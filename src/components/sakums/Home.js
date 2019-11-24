import React, {Component} from 'react';

import ViewInfoMini from '../shared-functions/ViewInfoMini.js';

import './HomeLayout.scss'

class Home extends Component
{
    constructor()
    {
        super();
        this.state =
        {

        }
    }

    render()
    {
        return(
            <div>
                <div className="miniDisplay">
                    <div className="miniPazinojumi">

                        <span className="virsraksts">Jaunākie paziņojumi</span>
                        <hr/>
                        <ViewInfoMini
                            urlParams="pazinojumi"
                            fieldNames = {[
                                "nosaukums",
                                "apraksts"
                            ]}
                            cssNames ={[
                                "nosaukums",
                                "apraksts"
                            ]}
                        />
                    </div>
                    <div className="miniPazinojumi">

                        <span className="virsraksts">Jaunākās lekciju izmaiņas</span>
                        <hr/>
                        <ViewInfoMini
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
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;