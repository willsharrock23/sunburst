import * as XLSX from 'xlsx';
import * as fs from "fs";

async function excel_import() {
  const workbook = XLSX.readFile("database/Excel/patrick_test_data.xlsx", {
    type: "binary",
  });
  const structureX = XLSX.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]],
    { header: 1 },
  );
  const structure = [];
  structureX.forEach((row) => {
    if (row.length !== 0) {
      structure.push(row);
    }
  });
  const valuesX = XLSX.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[1]],
    { header: 1 },
  );
  const values = [];
  valuesX.forEach((row) => {
    if (row.length !== 0) {
      values.push(row);
    }
  });
  await fs.writeTextFile(
    "database/JSON/structure.json",
    JSON.stringify(structure),
  );
  await fs.writeTextFile("database/JSON/values.json", JSON.stringify(values));
  let column = 0;
  structure.forEach((row) => {
    structure.forEach((row) =>
      column = row[0] = row[0] != null ? row[0] : column
    );
    structure.forEach((row) =>
      column = row[1] = row[1] != null ? row[1] : column
    );
    structure.forEach((row) =>
      column = row[2] = row[2] != null ? row[2] : column
    );
    structure.forEach((row) =>
      column = row[3] = row[3] != null ? row[3] : column
    );
  });
  await fs.writeTextFile(
    "database/JSON/fullStructure.json",
    JSON.stringify(structure),
  );
  console.log("\x1b[32m%s\x1b[0m", "Data successfully imported.");
}

export default excel_import;
