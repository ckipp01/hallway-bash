'use strict'

const path = require('path')
const Table = require('cli-table3')
const test = require('ava')

const { listRss, listSites } = require('../commands/list')

const validSiteLoc = path.join(__dirname, 'resources', 'valid', 'sites.json')
const invalidSiteLoc = path.join(__dirname, 'resources', 'invalid', 'sites.json')

test('That the the webring sites command correctly reads and displays all the sites in the webring', t => {
  const sitesTable = listSites(validSiteLoc)

  const testTable = new Table({
    style: {
      head: ['grey']
    },
    head: ['webring sites', '']
  })

  testTable.push(
    ['https://wiki.xxiivv.com', 'http://estevancarlos.com'],
    ['https://electro.pizza']
  )

  t.deepEqual(sitesTable, testTable)
})

test(`That the right message is displayed if sync hasn't been ran yet before you run webring sites`, t => {
  try {
    listSites('fake/site/list/location')
  } catch (err) {
    t.deepEqual(err, new Error(`fake/site/list/location does not exist\nPlease run webring sync first`))
  }
})

test(`If a syntax error exists in the file when you read it, the correct error is shown when webring sites is called`, t => {
  try {
    listSites(invalidSiteLoc)
  } catch (err) {
    t.deepEqual(err, new SyntaxError(`Unexpected end of JSON input`))
  }
})

test('That the webring rss command correctly reads, and displays the rss feeds correctly', t => {
  const rssTable = listRss(validSiteLoc)

  const testTable = new Table({
    style: {
      head: ['grey']
    },
    head: ['rss feeds', '']
  })

  testTable.push(
    ['https://wiki.xxiivv.com/links/rss.xml', 'https://electro.pizza/feed.xml']
  )

  t.deepEqual(rssTable, testTable)
})

test(`That the right message is displayed if sync hasn't been ran yet before you run webring rss`, t => {
  try {
    listRss('fake/site/list/location')
  } catch (err) {
    t.deepEqual(err, new Error(`fake/site/list/location does not exist\nPlease run webring sync first`))
  }
})

test(`If a syntax error exists in the file when you read it, the correct error is shown when webring rss is called`, t => {
  try {
    listRss(invalidSiteLoc)
  } catch (err) {
    t.deepEqual(err, new SyntaxError(`Unexpected end of JSON input`))
  }
})
