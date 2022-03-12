import walletHasToken from './walletHasToken.js'

const providerSignerHasToken = async (provider, contract) => {
  const signer = await provider.getSigner();
  const walletAddress = await signer.getAddress();
  return walletHasToken(contract, walletAddress)
}

export default providerSignerHasToken;