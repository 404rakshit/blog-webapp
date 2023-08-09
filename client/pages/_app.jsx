import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { CookiesProvider } from 'react-cookie'

export default function App({ Component, pageProps, router }) {
  return (
    <CookiesProvider>
      <Layout>
        <Component key={router.pathname} {...pageProps} />
      </Layout>
    </CookiesProvider>
  )
}