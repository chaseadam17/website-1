import { ethers } from "ethers";

const NETWORK_NAMES = {
  1: "Ethereum Mainnet",
  4: "Rinkeby Testnet",
};

const web3Connection = async (
  expectedNetworkId,
  onBadNetwork,
  onConnection
) => {
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const network = await provider.getNetwork();

  if (network.chainId !== expectedNetworkId) {
    onBadNetwork(
      `Wrong network. Please connect to ${NETWORK_NAMES[expectedNetworkId]} and try again.`
    );
    setTimeout(
      () => web3Connection(expectedNetworkId, onBadNetwork, onConnection),
      500
    );
    return;
  }

  onConnection(provider);
};

export default web3Connection;
