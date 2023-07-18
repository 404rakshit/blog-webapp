import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { CookiesProvider } from 'react-cookie'

export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  )
}