"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const endPoint = 'https://sparql.crssnky.xyz/spql/imas/query';
const output = 'json';
const query = `
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?name ?cv ?title
WHERE {
  ?s rdfs:label ?name;
     imas:cv ?cv.
  FILTER (lang(?cv) = 'ja').
}
`;
const fetchSPARQL = (query) => node_fetch_1.default(`${endPoint}?output=${output}&query=${encodeURIComponent(query)}`)
    .then(r => r.json())
    .then(r => r.results.bindings);
(async () => {
    const json = await fetchSPARQL(query);
    json
        .map(v => ({
        name: v.name.value,
        cv: v.cv.value,
    }))
        .forEach(v => console.log(v));
})().catch(e => console.error(e));
