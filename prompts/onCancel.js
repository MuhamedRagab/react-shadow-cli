import * as p from "@clack/prompts";

export default {
  onCancel: () => {
    p.cancel("Operation cancelled.");
    process.exit(0);
  },
};
