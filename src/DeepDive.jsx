import data_restructure from "./data_restructure.js";
import * as structure from "./structure.json";
import React from "react";
import Plot from "react-plotly.js";
import { plotlyFormat } from "./SingleGraph.jsx";
import { useState } from "react";


export default function DeepDive() {

    const [smallData, setSmallData] = useState(plotlyFormat()[0]);
    const [mainData, setMainData] = useState(plotlyFormat()[0]);

    let numberOfRings = 0;
    structure.default.forEach((row) => {
        if (row.length > numberOfRings) {numberOfRings = row.length}
    });

    const [data, _numberStructure] = data_restructure();

    const labels = [];
    const parents = [];
    const values  = [];
    const text  = []; 
    const ids = [];

    Object.keys(data).forEach((key) => {
        const node = data[key];
        const parent = data[node['parent']];
        if (parent !== undefined) {parents.push(parent['node'])} else {parents.push('')};
        ids.push(node['node'])
        labels.push(node['label']);
        values.push(node['color']);
        let count = 1;
        let currentNode = node;
        let currentParent = data[currentNode['parent']]
        while (currentParent !== undefined) {
            count++;
            currentNode = currentParent;
            currentParent = data[currentNode['parent']];
        }
        if (count > 4) {
            text.push("");
        } else {
            text.push(node['label']);
        }
    });

    const layout = {
        "autosize": false,
        "width": "775",
        "height": "775",
        "margin": { l: 0, r: 0, b: 0, t: 0 },
        "padding": { l: 0, r: 0, b: 0, t: 0 },
      };

    function sunburstEvent(plotData) {
        const selectedNode = plotData.points[0].id;
        let currentNode;
        const currentPath = plotData.points[0].currentPath.split("/").slice(0,-1);
        let currentLayer = currentPath.length + 1;
        console.log("selectedNode" + selectedNode);
        
        const keys = Object.keys(data);

        const parentsSmall = [""];
        console.log("hi");
        const childrenSmall = [data[selectedNode]['label']];
        const valuesSmall = [data[selectedNode]['color']];
        const nodesSmall = [data[selectedNode]['node']];
        const idsSmall = [data[selectedNode]['node']];
        currentNode = selectedNode;

        let tempChildNodes = [];
        let tempParentNodes = [];

        if (data[selectedNode]['children'].length !== 0) {
            [...new Set(data[selectedNode]['children'])].forEach((child) => {
                parentsSmall.push(data[selectedNode]['node']);
                childrenSmall.push(data[child]['label']);
                valuesSmall.push(data[child]['color']);
                tempParentNodes.push(data[child]['node']);
                nodesSmall.push(data[child]['node']);
                idsSmall.push([data[child]['node']]);
            });
        }
        
        currentLayer++;

        while (currentLayer < numberOfRings) {
            currentLayer ++;
            tempParentNodes.forEach((parent) => {
                currentNode = parent;
                if (data[currentNode]['children'].length !== 0) {
                    [...new Set(data[currentNode]['children'])].forEach((child) => {
                        parentsSmall.push(data[currentNode]['node']);
                        childrenSmall.push(data[child]['label']);
                        valuesSmall.push(data[child]['color']);
                        tempChildNodes.push(data[child]['node']);
                        nodesSmall.push(data[child]['node']);
                        idsSmall.push([data[child]['node']]);
                    });
                }
            });
            tempParentNodes = tempChildNodes;
            tempChildNodes = [];
        }

        const newColors = [];
        keys.forEach((nodeNumber) => {
            if (nodesSmall.includes(Number(nodeNumber))) {
                newColors.push(data[nodeNumber]['color']);
            } else {
                newColors.push(data[nodeNumber]['color'] + 5)
            }
        });

        plotData.points[0].data.marker.colors = newColors;

        const textSmall = [];
        idsSmall.forEach((child) => {
            textSmall.push(data[child]['label']);
        });

        setSmallData([{
            type: 'sunburst',
            insidetextorientation: "radial",
            ids: idsSmall,
            labels: childrenSmall,
            parents: parentsSmall,
            leaf: {'opacity': 1},
            marker: {
                line: {"width": 2},
                colors: valuesSmall,
                cmin: 1,
                cmax: 11,
                colorscale: [
                    [0, '#99CC00'], [0.1, '#F0E400'], [0.2, '#FF9900'], [0.3, '#FB3232'], [0.4, 'rgb(0,0,0)'], [0.5, 'rgba(112, 173, 71, 0.5)'], [0.6, 'rgba(255, 255, 0, 0.3)'], [0.7, 'rgba(237, 125, 49, 0.5)'], [0.8, 'rgba(255, 0, 0, 0.5)'], [0.9, 'rgba(0,0,0,0.5)'], [1, 'rgba(0,0,0,0.5)']
                ],
                showscale: false,
                autocolorscale: false,
            },
            text: textSmall,
            textinfo: "text",
            hoverinfo: "label"
        }]);

        setMainData([{
            type: "sunburst",
            insidetextorientation: "radial",
            labels: plotData.points[0].data.labels,
            ids: plotData.points[0].data.ids,
            parents: plotData.points[0].data.parents,
            marker: {
              line: { "width": 2 },
              colors: newColors,
              cmin: 1,
              cmax: 11,
              colorscale: [
                  [0, '#70AD47'], [0.1, '#FFFF00'], [0.2, '#ED7D31'], [0.3, '#FF0000'], [0.4, 'rgb(0,0,0)'], [0.5, 'rgba(112, 173, 71, 0.5)'], [0.6, 'rgba(255, 255, 0, 0.3)'], [0.7, 'rgba(237, 125, 49, 0.5)'], [0.8, 'rgba(255, 0, 0, 0.5)'], [0.9, 'rgba(0,0,0,0.5)'], [1, 'rgba(0,0,0,0.5)']
              ],
              showscale: false,
              autocolorscale: false,
            },
            text: plotData.points[0].data.text,
            textinfo: "text",
            hoverinfo: "label"
          }])

    }

    return(
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1 bg-secondary" style={{height: "895px", borderRight: "3px solid grey"}}></div>
                        <div className="col-10 pl-0 pr-0" style={{padding: "0px"}}>
                        <div className="d-flex justify-content-around pt-2" style={{backgroundColor: "rgb(240,240,240)"}}>
                            <h3>Main Plot</h3>
                            <h3>Sub Plot</h3>
                        </div>
                            <hr style={{padding:"0", margin:"0"}}></hr>
                            <div className="row">
                                <div className="col-6">
                                    <Plot 
                                        data={mainData} 
                                        layout={layout} 
                                        onSunburstClick={(data) => {
                                            sunburstEvent(data);
                                        }}
                                        id="main-plot"/>
                                </div>
                                <div className="col-6" id="smallPlotDiv">
                                    <Plot data={smallData} layout={layout} id="sub-plot"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 bg-secondary" style={{height: "895px", borderRight: "3px solid grey"}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}