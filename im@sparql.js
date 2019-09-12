const fetch = require('node-fetch')

const endPoint = 'https://sparql.crssnky.xyz/spql/imas/query'
const output = 'json'
const query = `
PREFIX schema: <http://schema.org/>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>

SELECT ?name ?cv
WHERE {
  ?s schema:name|schema:alternateName ?name;
     imas:cv ?cv.
}
LIMIT 1000
`

const fetchSPARQL = () =>
  fetch(`${endPoint}?output=${output}&query=${encodeURIComponent(query)}`)
    .then(r => r.json())
    .then(r => r.results.bindings)
;(async () => {
  const json = await fetchSPARQL()
  const list = json
    .filter(v => v.name['xml:lang'] === 'ja')
    .filter(v => v.cv.type === 'literal')
    .map(v => ({
      name: v.name.value,
      cv: v.cv.value,
    }))
  list.forEach(v => console.log(v))
})().catch(e => console.error(e))
