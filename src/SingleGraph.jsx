import React from "react";
import Plot from "react-plotly.js";

import data_restructure from "./data_restructure.js";

export function plotlyFormat() {
    const [data, _numberStructure] = data_restructure();

    const labels = [];
    const parents = [];
    const values = [];
    const text = [];
    const ids = [];

    Object.keys(data).forEach((key) => {
    const node = data[key];
    const parent = data[node["parent"]];
    if (parent !== undefined) parents.push(parent["node"]);
    else parents.push("");
    labels.push(node["label"]);
    ids.push(node["node"]);
    values.push(node["color"]);
    let count = 1;
    let currentNode = node;
    let currentParent = data[currentNode["parent"]];
    while (currentParent !== undefined) {
        count++;
        currentNode = currentParent;
        currentParent = data[currentNode["parent"]];
    }
    if (count > 4) {
        text.push("");
    } else {
        text.push(node["label"]);
    }
    });
    
      const graphData = [{
        "type": "sunburst",
        "insidetextorientation": "radial",
        "labels": labels,
        "ids": ids,
        "parents": parents,
        "marker": {
          "line": { "width": 2 },
          "colors": values,
          "cmin": 1,
          "cmax": 5,
          "colorscale": [
            [0, '#99CC00'], [0.25, '#F0E400'], [0.5, '#FF9900'], [0.75, '#FB3232'], [1, 'rgba(0,0,0,1)'],
          ],
          "showscale": false,
          "autocolorscale": false,
        },
        "text": labels,
        "textinfo": "text",
        "hoverinfo": "label"
      }];
    
      const graphLayout = {
        "autosize": false,
        "width": "945",
        "height": "900",
        "margin": { l: 0, r: 0, b: 0, t: 0 },
        "padding": { l: 0, r: 0, b: 0, t: 0 },
      };

    return [graphData, graphLayout];
}

export default class SingleGraph extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-1 bg-secondary" style={{height: "945px", borderRight: "3px solid grey"}}></div>
                                <div className="col-10 pl-0 pr-0" style={{padding: "0px"}}>
                                    <div style={{height: "100vh", width: "100vh", marginLeft: "auto", marginRight: "auto"}} id="sunburst-plot">
                                        <Plot data={plotlyFormat()[0]} layout={plotlyFormat()[1]} />
                                    </div>
                                </div>
                                <div className="col-1 bg-secondary" style={{height: "945px", borderRight: "3px solid grey"}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}