/* Test script for handleOutputByEvent.js
*
*
*
  Description: Feed test data for each event
*/

import handleOutputByEvent from "../handleOutputByEvent.js";
import fs from "fs";

let events; // JSON object from JSON file

try {
  let jsonData = fs.readFileSync("./events.json");
  events = JSON.parse(jsonData);
} catch (error) {
  console.error(error);
}

let results = handleOutputByEvent(events);

results.forEach((event) => console.log(event));
