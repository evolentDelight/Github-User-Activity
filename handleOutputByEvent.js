function pushEvent(event) {
  return `Pushed ${event.payload.size} commits to ${event.repo.name}`;
}

function watchEvent(event) {
  return `Started watching ${event.repo.name}`;
}

export default function handleOutputByEvent(events) {
  let outputs = [];

  events.forEach((event) => {
    const eventType = event.type;
    let result = "- "; //Initial console output formatting

    //Handle determining the type of event
    if (eventType == "PushEvent") result += pushEvent(event);

    //Add Date to console output
    const date = new Date(event.created_at);
    result += `\t - ${date.toLocaleString()}`;

    outputs.push(result);
  });

  return outputs;
}
