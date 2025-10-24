import { ethers } from "ethers";
import hre from "hardhat";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function main() {
  // Create a provider and signer
  const provider = new ethers.JsonRpcProvider(process.env.RPC);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
  
  console.log("🔍 Checking ETH Balance for Raffle Creation...");
  console.log("👤 Your Address:", signer.address);
  
  // Check current ETH balance
  const balance = await provider.getBalance(signer.address);
  const balanceInETH = ethers.formatEther(balance);
  
  console.log("💰 Current ETH Balance:", balanceInETH, "ETH");
  
  // Check if balance is sufficient for raffle creation
  const requiredETH = ethers.parseEther("0.01"); // 0.01 ETH required
  
  if (balance >= requiredETH) {
    console.log("✅ Sufficient ETH balance for raffle creation!");
    console.log("🎉 You can create raffles now!");
  } else {
    console.log("❌ Insufficient ETH balance for raffle creation");
    console.log("💸 Required: 0.01 ETH");
    console.log("📊 Current:", balanceInETH, "ETH");
    console.log("📈 Need:", ethers.formatEther(requiredETH - balance), "ETH more");
    
    console.log("\n🔧 Solutions:");
    console.log("1. Get test ETH from Arbitrum Sepolia faucet:");
    console.log("   https://faucet.quicknode.com/arbitrum/sepolia");
    console.log("   https://faucet.triangleplatform.com/arbitrum/sepolia");
    console.log("\n2. Or ask team members to send you some test ETH");
    console.log("\n3. Or use a different wallet with sufficient ETH");
  }
  
  // Also check PYUSD balance
  console.log("\n🔍 Checking PYUSD Balance...");
  const PYUSD_TOKEN_ADDRESS = "0x79Bd6F9E7B7B25B343C762AE5a35b20353b2CCb8";
  
  const pyusdAbi = [
    "function balanceOf(address owner) external view returns (uint256)",
    "function decimals() external view returns (uint8)"
  ];
  
  try {
    const pyusdContract = new ethers.Contract(PYUSD_TOKEN_ADDRESS, pyusdAbi, provider);
    const pyusdBalance = await pyusdContract.balanceOf(signer.address);
    const decimals = await pyusdContract.decimals();
    const pyusdBalanceFormatted = ethers.formatUnits(pyusdBalance, decimals);
    
    console.log("🪙 PYUSD Balance:", pyusdBalanceFormatted, "PYUSD");
    
    if (pyusdBalance > 0) {
      console.log("✅ You have PYUSD tokens for testing!");
    } else {
      console.log("⚠️ No PYUSD tokens. You may need to get some for testing raffle participation.");
    }
  } catch (error) {
    console.log("❌ Could not check PYUSD balance:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
