/* eslint-disable */
import React, { Component } from "react";

const columns = ['Company', 'Role (Seniority)', 'Location', 'Contact', 'Web', 'Industry', 'Description', 'Files'];
const stages = [
    // (1) Use default stages and (2) allow for adding additional stages
    { order: 0, type: 'First contact', dept: 'HR', startDate: new Date(), finishDate: new Date() },
    { order: 1, type: 'Telephone', dept: 'HR', startDate: new Date(), finishDate: new Date() },
    { order: 2, type: 'Videocall', dept: 'Senior Developer', startDate: new Date(), finishDate: new Date() },
    { order: 3, type: 'Face2Face', dept: 'Developer', startDate: new Date(), finishDate: new Date() },
    { order: 3, type: 'Test', dept: 'Technical', startDate: new Date(), finishDate: new Date() },
];
const role = ['Front-end developer', 'JavaScript developer', 'Business analyst', 'Project manager', 'Full stack Javascript Developer'];
const roleSeniority = ['Junior', 'Mid-level', 'Senior'];
let description, web, companyType;

class TrackingTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }
    render() {
        return (
            <table class="ui celled padded table">
                <thead>
                    <tr>
                        {columns.map(text =>
                            <th>{text}</th>
                        )}

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <h2 class="ui center aligned header">A</h2>
                        </td>
                        <td class="single line">Power Output</td>
                        <td>
                            <div class="ui star rating" role="radiogroup">
                                <i aria-checked="false" aria-posinset="1" aria-setsize="3" class="active icon" tabindex="0" role="radio" />
                                <i aria-checked="false" aria-posinset="2" aria-setsize="3" class="active icon" tabindex="0" role="radio" />
                                <i
                                    aria-checked="true"
                                    aria-posinset="3"
                                    aria-setsize="3"
                                    class="active icon"
                                    tabindex="0"
                                    role="radio"
                                />
                            </div>
                        </td>
                        <td class="right aligned">
                            80% <br />
                            <a href="#">18 studies</a>
                        </td>
                        <td>
                            Creatine supplementation is the reference compound for increasing muscular creatine levels;
                            there is variability in this increase, however, with some nonresponders.
                </td>
                    </tr>
                    <tr>
                        <td>
                            <h2 class="ui center aligned header">A</h2>
                        </td>
                        <td class="single line">Weight</td>
                        <td>
                            <div class="ui star rating" role="radiogroup">
                                <i
                                    aria-checked="false"
                                    aria-posinset="1"
                                    aria-setsize="3"
                                    class="active icon"
                                    tabindex="0"
                                    role="radio"
                                />
                                <i
                                    aria-checked="false"
                                    aria-posinset="2"
                                    aria-setsize="3"
                                    class="active icon"
                                    tabindex="0"
                                    role="radio"
                                />
                                <i
                                    aria-checked="true"
                                    aria-posinset="3"
                                    aria-setsize="3"
                                    class="active icon"
                                    tabindex="0"
                                    role="radio"
                                />
                            </div>
                        </td>
                        <td class="right aligned">
                            100% <br />
                            <a href="#">65 studies</a>
                        </td>
                        <td class="">
                            Creatine is the reference compound for power improvement, with numbers from one
                            meta-analysis to assess potency
                </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default TrackingTable