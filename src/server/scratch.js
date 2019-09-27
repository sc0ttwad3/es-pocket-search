const R = require("ramda");
const chalk = require("chalk");

console.log(chalk.blueBright("Starting..."));

// Datasource
var data = {
  result: "SUCCESS",
  interfaceVersion: "1.0.3",
  requested: "10/17/2013 15:31:20",
  lastUpdated: "10/16/2013 10:52:39",
  tasks: [
    {
      id: 104,
      complete: false,
      priority: "high",
      dueDate: "2013-11-29",
      username: "Scott",
      title: "Do something",
      created: "9/22/2013"
    },
    {
      id: 105,
      complete: false,
      priority: "medium",
      dueDate: "2013-11-22",
      username: "Lena",
      title: "Do something else",
      created: "9/22/2013"
    },
    {
      id: 107,
      complete: true,
      priority: "high",
      dueDate: "2013-11-22",
      username: "Mike",
      title: "Fix the foo",
      created: "9/22/2013"
    },
    {
      id: 108,
      complete: false,
      priority: "low",
      dueDate: "2013-11-15",
      username: "Punam",
      title: "Adjust the bar",
      created: "9/25/2013"
    },
    {
      id: 110,
      complete: false,
      priority: "medium",
      dueDate: "2013-11-15",
      username: "Scott",
      title: "Rename everything",
      created: "10/2/2013"
    },
    {
      id: 112,
      complete: true,
      priority: "high",
      dueDate: "2013-11-27",
      username: "Lena",
      title: "Alter all quuxes",
      created: "10/5/2013"
    }
    // , ...
  ]
};

const getIncompleteTaskSummaries = membername => {
  return fetchData()
    .then(R.get("tasks"))
    .then(R.filter(R.propEq("username", membername)))
    .then(R.reject(R.propEq("complete", true)))
    .then(R.map(R.pick(["id", "dueDate", "title", "priority"])))
    .then(R.sortBy(R.get("dueDate")));
};

const getValue = R.curry((name, obj) => obj[name]);
