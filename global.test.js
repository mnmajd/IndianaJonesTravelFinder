const { IndianaPathFinder } = require("./index");
const { graphBuilder, minutesToTime, timeToMinutes } = require("./pathFinder");
const {
  BerlinDestinations,
  GraphExample,
  PassauDestinations,
} = require("./shared");

describe("Run Indiana Jones Tests", () => {

  test("it should return the minimum arrival time from Paris to Berlin ", () => {
    expect(IndianaPathFinder(BerlinDestinations)).toBe("18:40");
  });

  test("it should return the minimum arrival time from Paris to Passau ", () => {
    expect(IndianaPathFinder(PassauDestinations)).toBe("19:40");
  });

  test("it should return a Graph", () => {
    expect(graphBuilder(BerlinDestinations)).toEqual(GraphExample);
  });

  test("it should return the correct Time based on minutes", () => {
    expect(minutesToTime(150)).toBe("02:30");
    expect(minutesToTime(60 * 24)).toBe("00:00");
    expect(minutesToTime(60 * 2)).toBe("02:00");
    expect(minutesToTime(1120)).toBe("18:40");
  });

  test("it should convert time to minutes", () => {
    expect(timeToMinutes("23:30")).toBe(1410);
    expect(timeToMinutes("14:19")).toBe(859);
    expect(timeToMinutes("08:30")).toBe(510);
  });
});
