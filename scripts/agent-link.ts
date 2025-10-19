import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  organization: process.env.OPENAI_ORG_ID,
  project: process.env.OPENAI_PROJECT_ID,
});

async function main() {
  // 1) Load local definitions
  const connectors = fs.readFileSync("connectors.yaml", "utf8");
  const agentYaml  = fs.readFileSync("agents/commerce.yaml", "utf8");

  // 2) Register tools (pseudo; replace with your SDK’s register call)
  await client.beta.agents.tools.import({ yaml: connectors });

  // 3) Import agent and bind to workflow by name
  await client.beta.agents.import({
    workflowName: "Suburbmates-Commerce-Workflow",
    yaml: agentYaml,
  });

  // 4) Dry run a test job
  const job = await client.beta.agents.runs.create({
    workflowName: "Suburbmates-Commerce-Workflow",
    input: { user_id: "U1", listing_id: "L123" }
  });

  console.log("Run started:", job.id);
}
main();
