"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const node_fetch_1 = require("node-fetch");
const endPoint = 'http://ja.dbpedia.org/sparql';
const output = 'json';
const query = `
select distinct ?p ?o
where {
  <http://ja.dbpedia.org/resource/東京都> ?p ?o .
}
LIMIT 100
`;
const fetchSPARQL = (query) => node_fetch_1.default(`${endPoint}?output=${output}&query=${encodeURIComponent(query)}`)
    .then(r => r.json())
    .then(r => r.results.bindings);
(async () => {
    const json = await fetchSPARQL(query);
    fs.writeFileSync('sparql.json', JSON.stringify(json.map(v => ({ p: v.p, o: v.o }))));
    console.log('I wrote in it.');
})().catch(e => console.error(e));
