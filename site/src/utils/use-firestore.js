import { useEffect, useState } from 'react'

function useFirestore() {
  const [instance, setInstance] = useState(null)

  useEffect(() => {
    Promise.all([
      import('firebase/app'),
      import('firebase/firestore')
    ])
      .then(([mod]) => {
        const fb = mod.default

        /*
         * Initialize once
         */
        if (!fb.apps.length) {
          fb.initializeApp({
            apiKey: process.env.GATSBY_FIREBASE_API_KEY,
            authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.GATSBY_FIREBASE_PROJECT_ID
          })
        }

        setInstance(fb.firestore())
      })
  })

  return instance
}

export { useFirestore }