function pushEvent(event) {
  return `Pushed ${event.payload.size} commits to ${event.repo.name}`;
}

function watchEvent(event) {
  return `Started watching ${event.repo.name}`;
}

function createEvent(event) {}

function pullRequestEvent(event) {} //Added test json data

function pullRequestReviewEvent(event) {}

function pullRequestReviewCommentEvent(event) {}

function issuesEvent(event) {}

function issueCommentEvent(event) {}

export default function handleOutputByEvent(events) {
  let outputs = [];

  events.forEach((event) => {
    const eventType = event.type;
    let result = "- "; //Initial console output formatting

    //Handle determining the type of event
    switch (eventType) {
      case "PushEvent":
        result += pushEvent(event);
        break;
      case "WatchEvent":
        result += watchEvent(event);
        break;
    }

    //Add Date to console output
    const date = new Date(event.created_at);
    result += `\t - ${date.toLocaleString()}`;

    outputs.push(result);
  });

  return outputs;
}
