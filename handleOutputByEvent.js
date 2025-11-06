function pushEvent(event) {
  return `Pushed commit(s) to ${event.repo.name}`;
}

function watchEvent(event) {
  return `Started watching ${event.repo.name}`;
}

function createEvent(event) {
  return `Created a ${event.payload.ref_type}${
    event.payload.ref_type === "repository" ? `:` : ` in repository:`
  } ${event.repo.name}`;
}

function forkEvent(event) {
  return `${
    event.payload.action[0].toUpperCase() + event.payload.action.slice(1)
  } a repository: ${event.payload.forkee.name}`;
}

function memberEvent(event) {
  let result = "";
  switch (event.payload.action) {
    case "added":
      result += `${
        event.payload.action[0].toUpperCase() + event.payload.action.slice(1)
      } user ${event.payload.member.login} to repository: ${event.repo.name}`;
      break;
    case "edited":
      result += `${
        event.payload.action[0].toUpperCase() + event.payload.action.slice(1)
      } user ${event.payload.member.login}'s permission in repository ${
        event.repo.name
      }`;
      break;
    default:
      result += `Event action [${event.action}] has not been implemented because it does not exist in the documentation.`;
      result += `\nPlease inform the developer with the exact data.`;
  }

  return result;
}

function pullRequestEvent(event) {
  let result = "";
  switch (event.payload.action) {
    case "assigned":
    case "unassigned":
      result += `${
        event.payload.action[0].toUpperCase() + event.payload.action.slice(1)
      } ${event.payload.assignee.login} to issue #${
        event.payload.number
      } in repository: ${event.repo.name}`;
      break;
    case "labeled":
    case "unlabeled":
      result += `${
        event.payload.action[0].toUpperCase() + event.payload.action.slice(1)
      } \'${event.payload.label.name}\' to issue #${
        event.payload.number
      } in repository: ${event.repo.name}`;
      break;
    default: // 'opened', 'closed', 'reopened' a pull request
      result += `${
        event.payload.action[0].toUpperCase() + event.payload.action.slice(1)
      } a Pull Request #${event.payload.number} in repository: ${
        event.repo.name
      }`;
  }
  return result;
}

function pullRequestReviewEvent(event) {
  return `${
    event.payload.action[0].toUpperCase() + event.payload.action.slice(1)
  } a Pull Request Review on pull request #${
    event.payload.pull_request.number
  } in repository: ${event.repo.name}`;
}

function pullRequestReviewCommentEvent(event) {
  return `${
    event.payload.action[0].toUpperCase() + event.payload.action.slice(1)
  } a Pull Request Review Comment on pull request #${
    event.payload.pull_request.number
  } in repository: ${event.repo.name}`;
}

function issuesEvent(event) {
  return `${
    event.payload.action[0].toUpperCase() + event.payload.action.slice(1)
  } issue #${event.payload.issue.number} in repository: ${event.repo.name}`;
}

function issueCommentEvent(event) {
  let type = "pull_request" in event.payload.issue ? "Pull Request" : "Issue";
  return `${
    event.payload.action[0].toUpperCase() + event.payload.action.slice(1)
  } a(n) ${type} Comment in ${type.toLowerCase()} #${
    event.payload.issue.number
  } in repository: ${event.repo.name}`;
}

function releaseEvent(event) {
  return `Released a(n) ${event.payload.action} activity in repository: ${event.repo.name}`;
}

function deleteEvent(event) {
  return `Deleted a ${event.payload.ref_type} in repository: ${event.repo.name}`;
}

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
      case "DeleteEvent":
        result += deleteEvent(event);
        break;
      case "ForkEvent":
        result += forkEvent(event);
        break;
      case "MemberEvent":
        result += memberEvent(event);
        break;
      case "IssuesEvent":
        result += issuesEvent(event);
        break;
      case "IssueCommentEvent":
        result += issueCommentEvent(event);
        break;
      case "PullRequestEvent":
        result += pullRequestEvent(event);
        break;
      case "PullRequestReviewEvent":
        result += pullRequestReviewEvent(event);
        break;
      case "PullRequestReviewCommentEvent":
        result += pullRequestReviewCommentEvent(event);
        break;
      case "ReleaseEvent":
        result += releaseEvent(event);
        break;
      default:
        result += `Sorry, event, ${event.type}, has not been implemented yet.`;
    }

    outputs.push(result);
  });

  return outputs;
}
