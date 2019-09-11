const fetch = require('node-fetch')

const endPoint = 'https://sparql.crssnky.xyz/spql/imas/query'

const query = `
PREFIX schema: <http://schema.org/>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
SELECT ?o ?h
WHERE {
  ?s schema:name|schema:alternateName ?o;
     schema:height ?h.
}order by(?h)
`

const fetchSPARQL = () =>
  fetch(`${endPoint}?output=json&query=${encodeURIComponent(query)}`)
    .then(r => r.json())
    .then(r => r.results.bindings)
;(async () => {
  const json = await fetchSPARQL()
  json.forEach(v => console.log(v.o, v.h))
})().catch(e => console.error(e))
