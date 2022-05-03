//port & packages
const PORT = 8000
const express = require('express') //Fast, minimalist web framework for node.
const axios = require('axios') //Promise based HTTP client for the browser and node.js
const cheerio = require('cheerio') // Fast, flexible & lean implementation of core jQuery designed specifically for the server.

const app = express()

//array vacaturewebsites
const vacancySites = [
    {
        name: 'randstad',
        address: 'https://www.randstad.nl/vacatures/?pagina=10',
        base: 'https://www.randstad.nl'
    },
    {
        name: 'randstad',
        address: 'https://www.randstad.nl/vacatures/?pagina=20',
        base: 'https://www.randstad.nl'
    },
    {
        name: 'youngcapital',
        address: 'https://www.youngcapital.nl/vacatures',
        base: 'https://www.youngcapital.nl'
    },
    {
        name: 'youngcapital',
        address: 'https://www.youngcapital.nl/vacatures?page=2',
        base: 'https://www.youngcapital.nl'
    },
    {
        name: 'youngcapital',
        address: 'https://www.youngcapital.nl/vacatures?page=3',
        base: 'https://www.youngcapital.nl'
    },
    {
        name: 'youngcapital',
        address: 'https://www.youngcapital.nl/vacatures?page=4',
        base: 'https://www.youngcapital.nl'
    },
    {
        name: 'youngcapital',
        address: 'https://www.youngcapital.nl/vacatures?page=5',
        base: 'https://www.youngcapital.nl'
    },
    {
        name: 'youngcapital',
        address: 'https://www.youngcapital.nl/vacatures?page=6',
        base: 'https://www.youngcapital.nl'
    },
    {
        name: 'youngcapital',
        address: 'https://www.youngcapital.nl/vacatures?page=7',
        base: 'https://www.youngcapital.nl'
    },
    {
        name: 'werkzoeken',
        address: 'https://www.werkzoeken.nl/vacatures/',
        base: ''
    }

]
//empty array
const vacancies = []

//functie: verwerk data van vacancySites(vacaturewebsites)
vacancySites.forEach(vacancySite => {
    axios.get(vacancySite.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("uur")', html).each(function () { //en selecteer op <a> 'uur' </a>
          const title = $(this).text() //vacature titel
          const url = $(this).attr('href') //vacature url
          vacancies.push({ //verwerk in lijst
            title,
            url: vacancySite.base + url
            //source: vacancySite.name
            })
        })
    })
})

app.get('/', (req,res) => { //basis url aanmaken
    res.json('Welcome')
})

app.get('/vacatures', (req,res) => { //url /vacatures aanmaken
    res.json(vacancies)
})

app.listen(PORT, () => console.log('server running on PORT ${PORT}'))
