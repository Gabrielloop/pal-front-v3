import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { cleanTitle, cleanCreatorName, removeAfterFirstParentheses } from '@/services/cleanString'

const SRU_ENDPOINT = 'http://localhost:5000/api/sru'

function extractValue(value) {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.flatMap((v) => extractValue(v))
  if (typeof value === 'object' && value['#text']) return value['#text']
  if (typeof value === 'number') return value.toString()
  return 'Valeur inconnue'
}

function extractISBN(identifiers) {
  const isbn = identifiers.find((id) => id.includes('ISBN'))
  return isbn ? isbn.replace('ISBN', '').trim() : 'ISBN inconnu'
}

function extractDocType(types) {
  const type = types.find((t) => t['#text']?.toLowerCase().includes('texte imprimé'))
  return type ? type['#text'] : undefined
}

export async function searchByQuery(query, page) {
  const isbnRegex = /^(?:\d{9}[\dX]|\d{13})$/
  const isISBN = isbnRegex.test(query.trim())
  const finalQuery = isISBN
    ? `isbn="${query.trim()}"`
    : `bib.doctype all "a" AND title="${query.trim()}" AND bib.language any "fre"`

  const params = {
    version: '1.2',
    operation: 'searchRetrieve',
    query: finalQuery,
    startRecord: 1 + (page - 1) * 10,
    maximumRecords: isISBN ? 1 : 10,
    recordSchema: 'dc',
  }

  try {
    const response = await axios.get(SRU_ENDPOINT, { params })
    const parser = new XMLParser({ ignoreAttributes: false })
    const parsed = parser.parse(response.data)
    const rawRecords = parsed?.['srw:searchRetrieveResponse']?.['srw:records']?.['srw:record']

    const records = Array.isArray(rawRecords) ? rawRecords : rawRecords ? [rawRecords] : []

    return records.map((record) => {
      const data = record['srw:recordData']?.['oai_dc:dc'] || {}
      const identifiers = Array.isArray(data['dc:identifier'])
        ? extractValue(data['dc:identifier'])
        : [extractValue(data['dc:identifier'])]

      const types = Array.isArray(data['dc:type'])
        ? extractValue(data['dc:type'])
        : [extractValue(data['dc:type'])]

      return {
        title: cleanTitle(extractValue(data['dc:title']) || 'Titre inconnu'),
        identifier: extractISBN(identifiers),
        creators:
          cleanCreatorName(
            Array.isArray(data['dc:creator'])
              ? extractValue(data['dc:creator']).join(', ')
              : extractValue(data['dc:creator'])
          ) || 'Auteur inconnu',
        date: extractValue(data['dc:date']) || 'Date inconnue',
        publisher:
          removeAfterFirstParentheses(extractValue(data['dc:publisher'])) || 'Éditeur inconnu',
        docType: extractDocType(types),
      }
    })
  } catch (e) {
    console.error('Erreur BNF:', e.message || e)
    return []
  }
}

export async function searchByISBNs(isbns) {
  const books = []
  for (const isbn of isbns) {
    const result = await searchByQuery(isbn, 1)
    books.push(...result)
  }
  return books
}
