const BerlinDestinations = `08:10;Paris;Berlin
5
09:20;Paris;Amsterdam;03:20
08:30;Paris;Bruxelles;01:20
10:00;Bruxelles;Amsterdam;02:10
12:30;Amsterdam;Berlin;06:10
11:30;Bruxelles;Berlin;09:20`;

const PassauDestinations = `07:40;Paris;Passau
5
07:40;Paris;Prague;06:40
10:30;Paris;Nuremberg;05:20
16:10;Nuremberg;Prague;02:10
19:00;Nuremberg;Passau;01:30
15:30;Prague;Passau;04:10`;

const GraphExample = {
  departureCity: "Paris",
  arrivalCity: "Berlin",
  departureTime: 490,
  edges: 5,
  graph: {
    Paris: {
      Amsterdam: { departureTime: 560, tripTime: 200 },
      Bruxelles: { departureTime: 510, tripTime: 80 },
    },
    Berlin: {},
    Bruxelles: {
      Amsterdam: { departureTime: 600, tripTime: 130 },
      Berlin: { departureTime: 690, tripTime: 560 },
    },
    Amsterdam: { Berlin: { departureTime: 750, tripTime: 370 } },
  },
};
module.exports = {
  BerlinDestinations,
  GraphExample,
  PassauDestinations
};
