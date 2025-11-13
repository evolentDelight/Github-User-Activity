#!/usr/bin/env node

import handleOutputByEvent from "./handleOutputByEvent.js";

function processUserEvents(username, events) {
  //Types of Events: https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28
  if (events.length === 0) {
    console.log(`Account \[${username}\] does not have any recent activity`);
  }
  const result = handleOutputByEvent(events);

  //Output results onto console
  result.forEach((event) => console.log(event));
}

async function getUserActivity(username) {
  if (!username) {
    console.error(
      `Error: you have not entered a github account. Please follow the command: \`github-activity <github username>\``
    );
    process.exit(1);
  }

  const url = `https://api.github.com/users/${username}/events`;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      switch (response.status) {
        case 404:
          console.error(
            `Account \[${username}\] is not valid. Please type in a valid Github Account.`
          );
          console.error(`Error Status: ${response.status}`);
          console.error(`Error Message: ${response.statusText}`);
          break;
        case 403:
          console.error(`Account \[${username}\] is currently not available.`);
          console.error(`Error Status: ${response.status}`);
          console.error(`Error Message: ${response.statusText}`);
          break;
        case 503:
          console.error(
            `Github server is temporarily unavailable. Try again later.`
          );
          console.error(`Error Status: ${response.status}`);
          console.error(`Error Message: ${response.statusText}`);
          break;
      }
      process.exit(1);
    }

    const result = await response.json();

    processUserEvents(username, result);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

const args = process.argv.slice(2);

getUserActivity(args[0]);
