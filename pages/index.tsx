// This is the BlankIndex component.
// It is the top-level component so it is being rendered as the Index page.

import Head from 'next/head'
import {
  BlankLayout,
  TWCenteredContent,
  NextLink
} from './_components'

const Index = () => {
  return (
    <div className="font-roboto-mono">
      <Head>
        <title>Blank.Foundation</title>
        <meta name="description" content="A community art and entrepreneurship project." />
      </Head>

      <BlankLayout>
        <TWCenteredContent>
          <p>CONTENT!</p>
          <p>
            <NextLink 
              href='/mint' 
              passHref
            >
              <a className='text-blue-500 underline'>
                Mint!
              </a>
            </NextLink>
          </p>
          <p>
            <NextLink 
              href='/voucher' 
              passHref
            >
              <a className='text-blue-500 underline'>
                Voucher!
              </a>
            </NextLink>
          </p>
        </TWCenteredContent>
      </BlankLayout>
    </div>
  );
}

export default Index;