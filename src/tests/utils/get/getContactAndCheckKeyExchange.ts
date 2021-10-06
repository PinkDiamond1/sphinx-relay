import { getContacts } from './getContacts'
import { Assertions } from 'ava'
import { Contact, NodeConfig } from '../../types'

export function getContactAndCheckKeyExchange(
  t: Assertions,
  node1: NodeConfig,
  node2: NodeConfig
): Promise<Contact[]> {
  return new Promise((resolve, reject) => {
    let i = 0
    const interval = setInterval(async () => {
      i++
      const [node1contact, node2contact] = await getContacts(t, node1, node2)
      console.log('got contactw', i)
      if (node1contact.contact_key && node2contact.contact_key) {
        clearInterval(interval)
        resolve([node1contact, node2contact])
      }
      if (i >= 15) {
        clearInterval(interval)
        reject('failed to getContactAndCheckKeyExchange')
      }
    }, 1000)
  })
}
