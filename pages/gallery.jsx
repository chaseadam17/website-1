import Head from "next/head";
import { BlankLayout, ViewAllNfts } from "../components";

const GalleryPage = () => {
  return (
    <div>
      <Head>
        <title>Gallery: Blank.Foundation</title>
        <meta name="description" content="Blank: All claimed Blank NFTs." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <BlankLayout>
        <div className='container mx-auto pl-36'>
          <ViewAllNfts />
        </div>
      </BlankLayout>
    </div>    
  )
}

export default GalleryPage;