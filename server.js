// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {

  const district = request.params.district
  const slug = request.params.slug


  const params = {
    // Sorteren op datum, van nieuw naar oud (dus met een minteken ervoor)
    'sort': '-date',

    // alle locaties tonen
    //  'filter[district]': 'algemeen, nieuw-west, zuidoost, oost',

    // Alleen de volgende velden tonen, zodat we niet onnodig veel data ophalen
    'fields': 'cover, date, title, intro, status, district, slug',
  }

  const apiStoriesResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params))
  const apiStoriesResponseJSON = await apiStoriesResponse.json()

  // console.log(apiStoriesResponseJSON);
  // console.log(params);

  response.render('index.liquid', { stories: apiStoriesResponseJSON.data, district: district, slug: slug })
})

app.get('/search', async function (request, response) {
  const search = request.query.search || ''

  const params = {
    'fields': 'cover, date, title, intro, status, district, slug',
    ...(search && { 'filter[title][_icontains]': search }),
    'filter[status][_eq]': 'published',
    limit: -1,
  }

  const apiStoriesResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params))
  const apiStoriesResponseJSON = await apiStoriesResponse.json()
  // console.log(personResponseJSON.data)
  console.log(apiStoriesResponseJSON.data.length)

  response.render('search.liquid', { stories: apiStoriesResponseJSON.data, search })

})

app.get('/:district', async function (request, response) {

  const district = request.params.district
  const slug = request.params.slug

  const params = {
    // Sorteren op datum, van nieuw naar oud (dus met een minteken ervoor)
    // 'sort': '-date',

    // alleen locatie algemeen tonen
    'filter[district]': district,

    // Alleen de volgende velden tonen, zodat we niet onnodig veel data ophalen
    'fields': 'cover, date, title, intro, status, district, slug',
  }

  const apiStoriesResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params))
  const apiStoriesResponseJSON = await apiStoriesResponse.json()

  // console.log(apiStoriesResponseJSON);
  // console.log(params);

  response.render('district.liquid', { stories: apiStoriesResponseJSON.data, district: district, slug: slug })
})

app.get('/:district/nieuw-oud', async function (request, response) {

  const district = request.params.district
  const slug = request.params.slug

  const params = {
    // Sorteren op datum, van nieuw naar oud (dus met een minteken ervoor)
    'sort': '-date',

    // alleen locatie algemeen tonen
    'filter[district]': district,

    // Alleen de volgende velden tonen, zodat we niet onnodig veel data ophalen
    'fields': 'cover, date, title, intro, status, district, slug',
  }

  const apiStoriesResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params))
  const apiStoriesResponseJSON = await apiStoriesResponse.json()

  // console.log(apiStoriesResponseJSON);
  // console.log(params);

  response.render('district.liquid', { stories: apiStoriesResponseJSON.data, district: district, slug: slug })
})

app.get('/:district/oud-nieuw', async function (request, response) {

  const district = request.params.district
  const slug = request.params.slug

  const params = {
    // Sorteren op datum, van nieuw naar oud (dus met een minteken ervoor)
    'sort': 'date',

    // alleen locatie algemeen tonen
    'filter[district]': district,

    // Alleen de volgende velden tonen, zodat we niet onnodig veel data ophalen
    'fields': 'cover, date, title, intro, status, district, slug',
  }

  const apiStoriesResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params))
  const apiStoriesResponseJSON = await apiStoriesResponse.json()

  // console.log(apiStoriesResponseJSON);
  // console.log(params);

  response.render('district.liquid', { stories: apiStoriesResponseJSON.data, district: district, slug: slug })
})

app.get('/:district/:slug', async function (request, response) {

  const district = request.params.district
  const slug = request.params.slug
  const story = request.params.story


  const params = {
    // Sorteren op datum, van nieuw naar oud (dus met een minteken ervoor)
    'sort': '-date',

    'filter[district]': district,
    'filter[story]': story,

    // Alleen de volgende velden tonen, zodat we niet onnodig veel data ophalen
    'fields': 'cover, date, title, intro, status, district, slug, body',
  }

  const apiStoriesResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' + new URLSearchParams(params))
  const apiStoriesResponseJSON = await apiStoriesResponse.json()

  const apiCommentsResponse = await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories_comments?' + new URLSearchParams(params))
  const apiCommentsResponseJSON = await apiCommentsResponse.json()


  response.render('details.liquid', { stories: apiStoriesResponseJSON.data, comments: apiCommentsResponseJSON.data, district: district, slug: slug })
})



// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/:district/:slug/comment', async function (request, response) {

  // console.log(request.body.story);


  await fetch('https://fdnd-agency.directus.app/items/buurtcampuskrant_stories_comments', {
    method: 'POST',

    body: JSON.stringify({
      name: request.body.name,
      comment: request.body.comment,
      story: request.body.story,
    }),

    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, `/${request.params.district}/${request.params.slug}/`);
})





app.use((req, res, next) => {
  res.status(404).send("Deze pagina bestaat niet")
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})