#!/usr/bin/env node
import "dotenv/config";

async function getUserActivity(username) {
  const url = `https://api.github.com/users/${username}/events`;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    Authorization: `Bearer ${process.env.access_token}`,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(
        `Response status: ${response.status}`,
        response.statusText
      );
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

const args = process.argv.slice(2);

getUserActivity(args[0]);
