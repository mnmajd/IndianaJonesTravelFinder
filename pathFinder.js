// Optional datastructure, but it helps reduce the algorithm time
const PriorityQueue = require("./helpers");

// convert time format to minutes, optional since string comparator
// are enough, but reduce pain when adding different times
const minutesToTime = (mm) =>
  `${Math.floor(mm / 60) % 24}`.padStart(2, "0") +
  ":" +
  `${mm % 60}`.padStart(2, "0");
const timeToMinutes = (hhmm) => {
  const [hh, mm] = hhmm.split(":").map((e) => parseInt(e));
  return hh * 60 + mm;
};


// used to parse the entry of each line formatted as DepCity;HH:MM;ArrCity;HH:MM
const lineParse = (line) => {
  const [departureTime, departureCity, arrivalCity, timeToArrive] = line.split(
    ";"
  );
  return {
    departureTime: timeToMinutes(departureTime),
    departureCity,
    arrivalCity,
    tripTime: timeToMinutes(timeToArrive),
  };
};

/**
 * converts the given statement into variables required for
 * the problem solving
 * @param {string} problemStatment statement of the problme
 */

const graphBuilder = (problemStatment) => {
  const [first, second, ...lines] = problemStatment.split("\n");
  const [departureTime, departureCity, arrivalCity] = first.split(";");
  const edges = parseInt(second);
  const graph = {
    [departureCity]: {},
    [arrivalCity]: {},
  };
  lines
    .filter((e) => e.length)
    .map(lineParse)
    .forEach(({ departureTime, departureCity, arrivalCity, tripTime }) => {
      if (!graph[departureCity]) graph[departureCity] = {};
      graph[departureCity] = {
        ...graph[departureCity],
        [arrivalCity]: {
          departureTime,
          tripTime,
        },
      };
    });
  return {
    departureCity,
    arrivalCity,
    departureTime: timeToMinutes(departureTime),
    edges,
    graph,
  };
};

/**
 * implementation of Dijkstra to solve the problem
 * every node is the city
 * given the train departure time and trip time to the next city
 * we update our shortest path everytime we reach that city before
 * departure time then we update that edge weight with
 * that city departure time + trip time, and so on until we reach
 * the target city
 * @param {Object<String:Object<string:number>>} graph representation of the problems city set {city:{dist:{departureTime, tripTime}}}
 * @param {String} startNode departure city
 * @param {String} endNode target city
 * @param {Number} adventureTime start time of the adventure
 */
const findShortestPath = (graph, startNode, endNode, adventureTime) => {
  /**
   * first we make every weight in the graph to Infinity
   * except for start node with the adventure time which states
   * the time he got to the train station
   */
  let weights = {};
  for (const city in graph) {
    weights[city] = Infinity;
  }
  weights[startNode] = adventureTime;
  /**
   * if you don't want to use PriorityQueue, simply replace it with a list of
   * object and sort it everytime you shift a {node,weight}.
   * Priority queues, simply does the same thing with lower cost, as it does
   * binary sorts upon every new insert/enq
   */
  let pq = new PriorityQueue((a, b) => a.weight - b.weight);
  /**
   * for start we set our first node (startNode) for the algorithm to run
   */
  pq.enq({ node: startNode, weight: weights[startNode] });
  while (!pq.isEmpty()) {
    // every time we get the priority queue's first item, which is the current
    // advanced most node toward the end node with lowest weight from start node
    let { node } = pq.deq();
    //  we get adjacent nodes
    let children = graph[node];
    for (let child in children) {
      // for each one, if its departure time coming from our most advanced node
      // is after our path/journey total time
      // we will skip it
      if (weights[node] > graph[node][child].departureTime) {
        continue;
      } else {
        // else it is our new top most of the queue
        let newweight =
          children[child].departureTime + children[child].tripTime;
        if (weights[child] > newweight) {
          weights[child] = newweight;
          pq.enq({ node: child, weight: newweight });
        }
      }
    }
  }
  return weights[endNode];
};
module.exports = { findShortestPath, graphBuilder, minutesToTime ,timeToMinutes};
