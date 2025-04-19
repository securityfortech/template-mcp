import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getIpInfo } from "./ipinfo.js";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// IP Info tool
server.tool(
    "ip-info",
    { ip: z.string() },
    async ({ ip }) => {
      const ipData = await getIpInfo(ip);
      return {
        content: [{
          type: "text",
          text: `IP Information for ${ip}:\nCity: ${ipData.city}\nRegion: ${ipData.region}\nCountry: ${ipData.country}\nLocation: ${ipData.loc}\nOrganization: ${ipData.org}`
        }]
      };
    }
  );

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);