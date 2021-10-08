// This is the BlankMinting component.
// It is the page-level component so it is being rendered based on its specified route.

import {
  BlankLayout,
  TWCenteredContent
} from './_components'

const BlankMinting = () => {
  return (
    <BlankLayout>
      <TWCenteredContent>
        MINTING!
      </TWCenteredContent>
    </BlankLayout>
  );
}

export default BlankMinting;