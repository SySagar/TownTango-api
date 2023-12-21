// Creating an OrbitDB instances
import { createOrbitDB } from '@orbitdb/core'
import { create } from 'ipfs-core'

const ipfs = await create();
const db = await orbitdb.open('my-db');

export default db;