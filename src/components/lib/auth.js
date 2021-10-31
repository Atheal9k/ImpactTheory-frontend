import { ethers } from "ethers";

export async function signMessage(signer) {
  let message = "I am proving that I control this account.";
  //hash it
  let messageHash = ethers.utils.keccak256(ethers.utils.id(message));
  //encode hash + msg
  let payload = ethers.utils.defaultAbiCoder.encode(
    ["bytes32", "string"],
    [messageHash, message]
  );
  //hash the payload
  let payloadHash = ethers.utils.keccak256(payload);
  //get user to sign the hash

  let signing = await signer.signMessage(ethers.utils.arrayify(payloadHash));
  //split the msg into signitures
  let sig = ethers.utils.splitSignature(signing);
  //console.log(sig);
  const bundle = [];
  bundle.push(payloadHash, sig);
  return bundle;
}
