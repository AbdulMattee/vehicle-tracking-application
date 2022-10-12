import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
const firebaseConfig = {
  apiKey: 'AIzaSyDahAZLP3Fe68j9C-7ZT9i0nAqiQWXhs_4',
  authDomain: 'tracknerd-staging.firebaseapp.com',
  projectId: 'tracknerd-staging',
  appId: '1:847967007196:web:ae4df284f5560af4139f19',
  storageBucket: 'tracknerd-staging.appspot.com',
  databaseUrl: 'https://tracknerd-staging-default-rtdb.firebaseio.com'
}
const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
