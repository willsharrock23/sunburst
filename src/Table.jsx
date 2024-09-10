import data_restructure from "./data_restructure";
import * as structure from "./structure.json";

export default function Table() {

    const [data, numberStructure] = data_restructure();
    const tableStructure = [];
  
    structure.default.forEach((row, rowNumber) => {
      const tableStructureRow = [];
      row.forEach((element, colNumber) => {
        if (element !== null) {
          tableStructureRow.push(
            <td
              rowspan={JSON.stringify(
                data[numberStructure[rowNumber][colNumber]]["weight"],
              )}
            >
              {element}
            </td>,
          );
        }
      });
      tableStructure.push(JSON.stringify(tableStructureRow.join("")));
    });
  
    const [datalist, _numberStructure] = data_restructure();
  
    const nodeNumbers = [];
    const labels = [];
    const parents = [];
    const values = [];
    const text = [];
  
    Object.keys(datalist).forEach((key) => {
      const node = datalist[key];
      const parent = datalist[node["parent"]];
      if (parent !== undefined) parents.push(parent["label"]);
      else parents.push("");
      labels.push(node["label"]);
      values.push(node["color"]);
      nodeNumbers.push(node["node"]);
      let count = 1;
      let currentNode = node;
      let currentParent = datalist[currentNode["parent"]];
      while (currentParent !== undefined) {
        count++;
        currentNode = currentParent;
        currentParent = datalist[currentNode["parent"]];
      }
      if (count > 4) {
        text.push("");
      } else {
        text.push(node["label"]);
      }
    });

    return (
        <div className="row" style={{backgroundColor: "rgb(240, 240, 240)"}}>
            <div className="row">
                <div className="col-1"></div>

                <div className="col-10" style={{padding: 0}}>
                    <table className="table-bordered" width="100%">
                    <thead className="table-secondary">
                        <tr
                        height="60px"
                        style={{backgroundColor: "#3d3c3c", fontSize: "1.5rem", border: "1px solid black"}}
                        class="text-white"
                        >
                        <th scope="col" width="20%" style={{textAlign: "center"}}>
                            Force Element
                        </th>
                        <th scope="col" width="20%" style={{textAlign: "center"}}>FCWG</th>
                        <th scope="col" width="20%" style={{textAlign: "center"}}>
                            Capability
                        </th>
                        <th scope="col" width="20%" style={{textAlign: "center"}}>
                            Descriptor
                        </th>
                        <th scope="col" width="20%" style={{textAlign: "center"}}>
                            Fielded Solution
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {structure.default.map((row, rowNumber) => {
                        return (
                            <tr index={rowNumber}>
                            {row.map((element, colNumber) => {
                                if (element !== null) {
                                return (
                                    <td
                                    className={"theme" +
                                        JSON.stringify(
                                        data[numberStructure[rowNumber][colNumber]][
                                            "color"
                                        ],
                                        )}
                                    id={JSON.stringify(
                                        data[numberStructure[rowNumber][colNumber]]["node"],
                                    ) + "td"}
                                    style={{fontSize: "1rem", verticalAlign: "text-top", textAlign: "center", border: "1px solid black", margin: "0", padding: "0"}}
                                    rowspan={JSON.stringify(
                                        data[numberStructure[rowNumber][colNumber]][
                                        "weight"
                                        ],
                                    )}
                                    >
                                    <div className="d-flex justify-content-between" style={{marginLeft: "20px", padding: "0px", marginBottom: "0"}}>
                                        <div style={{padding: "0px", margin: "0px"}}>
                                        {element}
                                        </div>
                                        <div
                                        className="dropdown d-grid"
                                        style={{width: "100px", margin: "0", padding: "0"}}
                                        >
                                        <button
                                            style={{margin: "0", padding: "0", height: "20px"}}
                                            className="btn"
                                            type="button"
                                            id={"node-" +
                                            JSON.stringify(
                                                data[numberStructure[rowNumber][colNumber]][
                                                "node"
                                                ],
                                            ) + "-menu-button"}
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <input
                                            style={{fontSize: "1rem", backgroundColor: "rgba(0,0,0,0)", textAlign: "center", margin: "0", padding: "0", height: "20px"}}
                                            type="text"
                                            id={JSON.stringify(
                                                data[numberStructure[rowNumber][colNumber]][
                                                "node"
                                                ],
                                            )}
                                            placeholder="..."
                                            className={"col-12 border-0 theme" +
                                                JSON.stringify(
                                                data[
                                                    numberStructure[rowNumber][colNumber]
                                                ]["color"],
                                                )}
                                            value={JSON.stringify(
                                                data[numberStructure[rowNumber][colNumber]][
                                                "color"
                                                ],
                                            )}
                                            />
                                        </button>
                                        <div
                                            style={{margin: "0", padding:"0"}}
                                            className="dropdown-menu col-12"
                                            id={"node-" +
                                            JSON.stringify(
                                                data[numberStructure[rowNumber][colNumber]][
                                                "node"
                                                ],
                                            ) + "-risk"}
                                            aria-labelledby={"node-" +
                                            JSON.stringify(
                                                data[numberStructure[rowNumber][colNumber]][
                                                "node"
                                                ],
                                            ) + "-menu-button"}
                                        >
                                            {[1, 2, 3, 4, 5].map((item, index) => {
                                            return (
                                                <button
                                                style={{margin: "0", padding: "0"}}
                                                className="dropdown-item"
                                                onClick={(event) => {
                                                    const { target } = event;
                                                    if (target) {
                                                    (document.getElementById(
                                                        JSON.stringify(
                                                        data[
                                                            numberStructure[rowNumber][
                                                            colNumber
                                                            ]
                                                        ]["node"],
                                                        ),
                                                    )).value =
                                                        (target)
                                                        .innerHTML;
                                                    }
                                                    data[
                                                    numberStructure[rowNumber][colNumber]
                                                    ]["color"] =
                                                    (target)
                                                        .innerHTML;
                                                    document.getElementById(
                                                    JSON.stringify(
                                                        data[
                                                        numberStructure[rowNumber][
                                                            colNumber
                                                        ]
                                                        ]["node"],
                                                    ) + "td",
                                                    )?.setAttribute(
                                                    "class",
                                                    "theme" +
                                                        (target)
                                                        .innerHTML,
                                                    );
                                                    document.getElementById(
                                                    JSON.stringify(
                                                        data[
                                                        numberStructure[rowNumber][
                                                            colNumber
                                                        ]
                                                        ]["node"],
                                                    ),
                                                    )?.setAttribute(
                                                    "class",
                                                    "col-12 border-0 theme" +
                                                        (target)
                                                        .innerHTML,
                                                    );
                                                    values[
                                                    nodeNumbers.indexOf(
                                                        data[
                                                        numberStructure[rowNumber][
                                                            colNumber
                                                        ]
                                                        ]["node"],
                                                    )
                                                    ] = (target)
                                                    .innerHTML;
                                                }}
                                                key={index}
                                                >
                                                {item}
                                                </button>
                                            );
                                            })}
                                        </div>
                                        </div>
                                    </div>
                                    </td>
                                );
                                }
                            })}
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                </div>

                <div className="col-1"></div>
                </div>
        </div>
    )
}