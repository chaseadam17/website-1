import { ethers } from 'ethers';

const web3Connection = async (expectedNetwork, onBadNetwork, onConnection) => {
  await window.ethereum.enable()
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()

  if (network.name !== expectedNetwork.toLowerCase()) {
    onBadNetwork(`Wrong network. Please connect to the ${expectedNetwork} test network.`)
    setTimeout(
      () => web3Connection(expectedNetwork, onBadNetwork, onConnection), 
      500
    )
    return
  }

  onConnection(provider);
}

export default web3Connection