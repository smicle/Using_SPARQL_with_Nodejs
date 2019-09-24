const fetch = require('node-fetch')

const endPoint = 'https://sparql.crssnky.xyz/spql/imas/query'
const output = 'json'
const query = `
PREFIX schema: <http://schema.org/>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>

SELECT ?name ?cv
WHERE {
  ?s schema:name ?name;
     imas:cv ?cv.
  FILTER (lang(?name) = 'ja').
  FILTER (lang(?cv) = 'ja').
}
LIMIT 1000
`

const fetchSPARQL = query =>
  fetch(`${endPoint}?output=${output}&query=${encodeURIComponent(query)}`)
    .then(r => r.json())
    .then(r => r.results.bindings)
;(async () => {
  const json = await fetchSPARQL(query)

  const list = json.map(v => ({
    name: v.name.value,
    cv: v.cv.value,
  }))

  list.forEach((v, i) => console.log(i, v))
})().catch(e => console.error(e))
