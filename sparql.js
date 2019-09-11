const fetch = require('node-fetch')

const endPoint = 'http://ja.dbpedia.org/sparql'

const Query = `
select distinct ?p ?o
where {
  <http://ja.dbpedia.org/resource/東京都> ?p ?o .
}
LIMIT 100
`

const fetchSPARQL = () =>
  fetch(`${endPoint}?output=json&query=${encodeURIComponent(Query)}`)
    .then(r => r.json())
    .then(r => r.results.bindings)
;(async () => {
  const json = await fetchSPARQL()
  json.forEach(v => console.log(v.p, v.o))
})().catch(e => console.error(e))
