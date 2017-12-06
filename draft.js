const d3 = require('d3');

const data = [
  { region: 'west',
    country: 'Germany',
    money: 100 },
  { region: 'west',
    country: 'USA',
    money: 1000 },
  { region: 'east',
    country: 'Russia',
    money: 50 },
  { region: 'east',
    country: 'China',
    money: 1500 },
];
const regions = data.reduce((accumulator, row) => {
  const region = row.region;
  if (!accumulator[region]) {
    // eslint-disable-next-line no-param-reassign
    accumulator[region] = [];
  }
  accumulator[region].push(row);
  return accumulator;
}, {});
const regionsPercentTurnout = Object.entries(regions).map(([region, areas]) => ({
  region, meanPctTurnout: d3.mean(areas, area => area.money),
}));
const regionsPercentTurnout2 = d3.nest()
  .key(row => row.region)
  .rollup(areas => d3.mean(areas, area => area.money))
  .entries(data);
console.log();
