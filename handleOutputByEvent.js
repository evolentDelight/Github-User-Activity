function pushEvent(event) {
  return `Pushed ${event.payload.size} commits to ${event.repo.name}`;
}

function watchEvent(event) {
  return `Started watching ${event.repo.name}`;
}

function createEvent(event) {
  return `Created a ${event.payload.ref_type}${
    event.payload.ref_type === "repository" ? `:` : ` in repository:`
  } ${event.repo.name}`;
}

function pullRequestEvent(event) {} //Added test json data

function pullRequestReviewEvent(event) {}

function pullRequestReviewCommentEvent(event) {}

function issuesEvent(event) {}

function issueCommentEvent(event) {}

function releaseEvent(event) {}

function deleteEvent(event) {}

export default function handleOutputByEvent(events) {
  let outputs = [];

  events.forEach((event) => {
    //Add Date to console output
    const date = new Date(event.created_at);
    let result = `${date.toLocaleString()}`;
    result += "\t- "; //Console output formatting

    //Handle determining the type of event
    switch (event.type) {
      case "PushEvent":
        result += pushEvent(event);
        break;
      case "WatchEvent":
        result += watchEvent(event);
        break;
      case "CreateEvent":
        result += createEvent(event);
        break;
    }

    outputs.push(result);
  });

  return outputs;
}
