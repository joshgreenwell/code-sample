import logger from '../lib/logger'

import { thoughtsTable } from '../lib/dynamodb'
import { decryptThought, encryptThought } from '../lib/crypto'

export const getThoughts = async (event) => {
  const { id } = event.queryStringParameters
  const res = {}

  try {
    logger.info('thoughts:getThoughts', { msg: `Getting thoughts for ${id}` })
    const thoughts = await thoughtsTable.get(id)
    logger.info('thoughts:getThoughts', { msg: `Found ${thoughts.length} thought(s)` })

    const decryptedThoughts = []
    logger.info('thoughts:getThoughts', { msg: `Decrypting thoughts` })
    thoughts.forEach(thought => {
      const newThought = {...thought}
      newThought.thought = decryptThought(newThought.thought)
      decryptedThoughts.push(newThought)
    })
    logger.info('thoughts:getThoughts', { msg: `Done decrypting thoughts` })

    res.statusCode = 200
    res.body = JSON.stringify({ thoughts: decryptedThoughts })
  } catch (err) {
    logger.error('thoughts:getThoughts', `Error getting thoughts ${err}`)
    res.statusCode = 500
  }

  return res
}

export const postThought = async (event) => {
  const res = {}

  try {
    const { id, timestamp, thought } = JSON.parse(event.body)
    logger.info('thoughts:postThought', { msg: `Encrypting thought` })
    const encryptedThought = encryptThought(thought)

    logger.info('thoughts:postThought', { msg: `Posting thought for ${id}` })

    const newThought = await thoughtsTable.post(id, timestamp, encryptedThought)
    logger.info('thoughts:postThought', { msg: `Decrypting new thought` })
    newThought.thought = decryptThought(newThought.thought)
    logger.info('thoughts:postThought', { msg: 'Returning new thought' })

    res.statusCode = 200
    res.body = JSON.stringify({ thought: newThought })
  } catch (err) {
    logger.error('thoughts:postThought', `Error posting thoughts ${err}`)
    res.statusCode = 500
  }

  return res
}

export const deleteThought = async (event) => {
  const res = {}

  try {
    const { id, timestamp } = JSON.parse(event.body)
    logger.info('thoughts:postThought', { msg: `Deleting thought for ${id}` })
    await thoughtsTable.delete(id, timestamp)
    res.statusCode = 200
  } catch (err) {
    logger.error('thoughts:deleteThought', `Error deleting thoughts ${err}`)
    res.statusCode = 500
  }

  return res
}
