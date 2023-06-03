import * as p from "@clack/prompts";

export default (buildProjectResults) => {
  let noteMessage;
  if (buildProjectResults.buildTool === "vite") {
    if (buildProjectResults.packageManager === "yarn")
      noteMessage = "Run `yarn dev` to start the dev server.";
    else noteMessage = "Run `npm run dev` to start the dev server.";
  } else if (buildProjectResults.buildTool === "webpack") {
    noteMessage = `Run ${buildProjectResults.packageManager} to start the dev server.`;
  }

  noteMessage = `cd ${buildProjectResults.name}\n${noteMessage}`;
  p.note(noteMessage, "Your project is ready!");
};
