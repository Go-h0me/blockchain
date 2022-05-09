import contract from "@truffle/contract";

export const loadContract = async (name, provider) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();
  const _contract = contract(Artifact);
  _contract.setProvider(provider);

  // ket noi mang chinh matamask

  let deployedContract = null;

  try {
   deployedContract = await _contract.deployed();
  } catch (error) {
    console.log("You are connected to wrong network!");
  }

  return deployedContract;
};
