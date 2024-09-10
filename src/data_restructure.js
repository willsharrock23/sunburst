import * as structure from "./structure.json";
import * as colors from "./values.json";

export default function data_restructure() {
  const numberStructure = [];
  let numberCount = 0;
  for (let row = 0; row < structure.default.length; row++) {
    numberStructure.push([]);
    for (let col = 0; col < structure.default[row].length; col++) {
      const node = structure.default[row][col];
      if (node === null) {
        numberStructure[row].push(null);
      } else {
        numberStructure[row].push(numberCount);
        numberCount++;
      }
    }
  }
  let column = 0;
  numberStructure.forEach((row) => {
    numberStructure.forEach((row) =>
      column = row[0] = row[0] != null ? row[0] : column
    );
    numberStructure.forEach((row) =>
      column = row[1] = row[1] != null ? row[1] : column
    );
    numberStructure.forEach((row) =>
      column = row[2] = row[2] != null ? row[2] : column
    );
    numberStructure.forEach((row) =>
      column = row[3] = row[3] != null ? row[3] : column
    );
  });

  const nodes = {};
  let count = 0;

  for (let row = 0; row < structure.default.length; row++) {
    for (let col = 0; col < structure.default[row].length; col++) {
      const node = structure.default[row][col];
      if (node !== null) {
        const currentNode = { "node": count, "label": node };
        if (col !== 0) {
          Object.assign(currentNode, { "color": colors.default[row][col - 1] });
        } else {
          Object.assign(currentNode, { color: 1 });
        }
        let weight = 1;
        let j = 1;
        while (
          row + j < structure.default.length &&
          structure.default[row + j][col] === null
        ) {
          weight++;
          j++;
        }
        Object.assign(currentNode, { "weight": weight });
        Object.assign(currentNode, { "column": col });
        Object.assign(currentNode, { "parent": numberStructure[row][col - 1] });
        const nodeChildren = [];
        if (col + 1 !== structure.default[row].length) {
          JSON.stringify(structure.default[row][col + 1]) === "null" ||
            nodeChildren.push(numberStructure[row][col + 1]);
          let i = row + 1;
          while (
            structure.default[i][col] === null &&
            i + 1 < structure.default.length
          ) {
            if (numberStructure[i][col + 1] !== null) {
              nodeChildren.push(numberStructure[i][col + 1]);
            }
            i++;
          }
        }
        Object.assign(currentNode, { "children": nodeChildren });
        Object.assign(nodes, { [JSON.stringify(count)]: currentNode });
        count++;
      }
    }
  }
  return [nodes, numberStructure];
}
