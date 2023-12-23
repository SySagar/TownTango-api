// Creating an OrbitDB instances
import { createOrbitDB } from '@orbitdb/core'
import { create } from 'ipfs-core'

let randDir = (Math.random() + 1).toString(36).substring(2)
export async function initOrbitDB() {
    const ipfs = await create();
    const orbitdb = await createOrbitDB({ ipfs , directory: './' + randDir + '/orbitdb' });
    const db = await orbitdb.open('my-db');
  
    return db;
  }

  const db = await initOrbitDB();
  export default db;