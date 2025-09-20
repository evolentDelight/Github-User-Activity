#!/usr/bin/env node

function processUserEvents(username, events) {
  //Types of Events: https://docs.github.com/en/rest/using-the-rest-api/github-event-types?apiVersion=2022-11-28
  if (events.length === 0) {
    console.log(`Account \[${username}\] does not have any recent activity`);
  }
  console.log(events);
}

async function getUserActivity(username) {
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
          break;
        case 403:
          console.error(`Account \[${username}\] is currently not available.`);
          break;
        case 503:
          console.error(
            `Github server is temporarily unavailable. Try again later.`
          );
          break;
      }
      return 0;
    }

    const result = await response.json();

    processUserEvents(username, result);
  } catch (error) {
    console.error(error.message);
  }
}

const args = process.argv.slice(2);

getUserActivity(args[0]);
