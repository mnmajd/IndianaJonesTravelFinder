const {
  findShortestPath,
  graphBuilder,
  minutesToTime,
} = require("./pathFinder");
const { BerlinDestinations } = require("./shared");
const IndianaPathFinder = (input) => {
  const {
    departureCity: startNode,
    arrivalCity: endNode,
    departureTime: adventureTime,
    graph,
  } = graphBuilder(input);
  return minutesToTime(
    findShortestPath(graph, startNode, endNode, adventureTime)
  );
};
console.log(IndianaPathFinder(BerlinDestinations));

module.exports = { IndianaPathFinder };
