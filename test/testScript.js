/* Test script for handleOutputByEvent.js
*
*
*
  Description: Feed test data for each event
*/

import handleOutputByEvent from "../handleOutputByEvent.js";
import fs from "fs";

/* Test Data */
let general = "./data/events.json";
let douwem = "./data/DouweM-public-events.json";
let isodal = "./data/isodal-public-events.json";
let ruvnet = "./data/ruvnet-public-events.json";

let test_datas = {
  general: general,
  douwem: douwem,
  isodal: isodal,
  ruvnet: ruvnet,
};

for (let [testName, fileName] of Object.entries(test_datas)) {
  console.log("=========================================");
  console.log(`====== Testing ${testName} ======`);
  let events; // JSON object from JSON file

  try {
    let jsonData = fs.readFileSync(fileName);
    events = JSON.parse(jsonData);
  } catch (error) {
    console.error(error);
  }

  let results = handleOutputByEvent(events);

  results.forEach((event) => console.log(event));
  console.log("\n=========================================\n");
}
