const fetch = require('node-fetch')

const endPoint = 'http://ja.dbpedia.org/sparql'
const output = 'json'
const query = `
select distinct ?p ?o
where {
  <http://ja.dbpedia.org/resource/東京都> ?p ?o .
}
LIMIT 100
`

const fetchSPARQL = () =>
  fetch(`${endPoint}?output=${output}&query=${encodeURIComponent(query)}`)
    .then(r => r.json())
    .then(r => r.results.bindings)
;(async () => {
  const json = await fetchSPARQL()
  json.forEach(v => console.log(v.p, v.o))
})().catch(e => console.error(e))
