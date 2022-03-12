const walletHasToken = async (contract, walletAddress) => {
  if (!contract.balanceOf) {
    throw "Contract must implement balanceOf()"
  }
  const balanceOfToken = await contract.balanceOf(walletAddress)
  return balanceOfToken > 0
}

export default walletHasToken;