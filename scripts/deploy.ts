import { ethers } from "ethers";
import hre from "hardhat";

async function main() {
  const ENTROPY_ADDRESS = "0x549ebba8036ab746611b4ffa1423eb0a4df61440"; // Arbitrum Entropy
  const DEFAULT_PROVIDER = "0x6CC14824Ea2918f5De5C2f75A9Da968ad4BD6344";
  const PYUSD_TOKEN_ADDRESS = process.env.PYUSD_TOKEN_ADDRESS as string; // Mock PYUSD on Arbitrum Sepolia
  const FUNDING_AMOUNT = ethers.parseEther("0.01"); // ETH to seed each new raffle

  // Get the contract artifact
  const contractArtifact = await hre.artifacts.readArtifact("RaffleFactory");
  
  // Create a provider and signer for hardhat network
  const provider = new ethers.JsonRpcProvider(process.env.RPC);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
  
  // Create contract factory using ethers directly
  const RaffleFactory = new ethers.ContractFactory(
    contractArtifact.abi,
    contractArtifact.bytecode,
    signer
  );
  
  const factory = await RaffleFactory.deploy(
    ENTROPY_ADDRESS,
    DEFAULT_PROVIDER,
    PYUSD_TOKEN_ADDRESS,
    FUNDING_AMOUNT
  );

  console.log("RaffleFactory deployed to:", await factory.getAddress());
  console.log("PYUSD Token Address:", PYUSD_TOKEN_ADDRESS);
  console.log("Funding amount (wei):", FUNDING_AMOUNT.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});