import fs from "fs";

const routerFileContentInit = `import { createBrowserRouter } from "react-router-dom"

//** Layout is the root component of the router, and the child component of the layout is the page component
import Layout from "../layout/layout";

//** Import the page component here
`;

const layoutConfig = `import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h2>Layout</h2>
      <Outlet />
    </div>
  );
}`;

const initPageConfig = (pageName) => `import React from "react";

export default function ${pageName[0].toUpperCase()}${pageName.slice(1)}() {
  return (
    <div>
      <h2>${pageName}</h2>
    </div>
  );
}`;

const rootConfig = `import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./routers/routers.js"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)`;

export default function reactRouterConfig(buildTool, language, installPath) {
  let pagesCount = 0;
  const fileExtention =
    language === "ts" ? "tsx" : buildTool === "vite" ? "jsx" : "js";
  const rootFile =
    buildTool === "vite" ? `main.${fileExtention}` : `index.${fileExtention}`;

  const [pagesFolder, routersFolder, routersFile] = [
    `${installPath}/src/pages`,
    `${installPath}/src/routers`,
    `${installPath}/src/routers/routers.js`,
    ,
  ];

  if (!fs.existsSync(pagesFolder)) fs.mkdirSync(pagesFolder);
  if (!fs.existsSync(routersFolder)) fs.mkdirSync(routersFolder);

  changeAppToIndexFile();
  createLayoutFile();
  fileRootConfig();
  createRoutersForPages();
  onPageCreate();

  function fileRootConfig() {
    fs.writeFileSync(`${installPath}/src/${rootFile}`, rootConfig);
  }

  function changeAppToIndexFile() {
    const appFile = `${installPath}/src/App.${fileExtention}`;
    const indexPageFile = `${installPath}/src/pages/index.${fileExtention}`;
    if (fs.existsSync(appFile)) fs.unlinkSync(appFile);
    fs.writeFileSync(indexPageFile, initPageConfig("Home"));
  }

  function createLayoutFile() {
    const layoutFolder = `${installPath}/src/layout`;
    const layoutFile = `${layoutFolder}/layout.${fileExtention}`;
    if (!fs.existsSync(layoutFolder)) fs.mkdirSync(layoutFolder);
    fs.writeFileSync(layoutFile, layoutConfig);
  }

  function createRoutersForPages(file) {
    let routerFileContent = routerFileContentInit;
    const pages = fs.readdirSync(pagesFolder);
    const layoutChildren = [];
    if (pages.length > pagesCount && file) initNewPage(file);
    pagesCount = pages.length;

    pages.forEach((page) => {
      const [pageName] = page.split(".");
      routerFileContent += `import ${pageName} from "../pages/${page}";\n`;
      layoutChildren.push({
        path: `/${pageName === "index" ? "" : pageName}`,
        Component: pageName,
      });
    });

    const routers = [
      {
        path: "/",
        Component: "Layout",
        children: layoutChildren,
      },
    ];

    routerFileContent += `\nexport const router = createBrowserRouter(${JSON.stringify(
      routers,
      null,
      2
    )
      .replace(/"Component": "(.*?)"/g, "Component: $1")
      .replace(/"path"/g, "path")
      .replace(/"children"/g, "children")})`;

    fs.writeFileSync(routersFile, routerFileContent);
  }

  function onPageCreate() {
    fs.watch(pagesFolder, (event, file) => {
      console.log({
        event,
        file,
      });
      createRoutersForPages(file);
    });
  }

  function initNewPage(file) {
    fs.writeFileSync(
      `${installPath}/src/pages/${file}`,
      initPageConfig(file.split(".")[0])
    );
  }
}

// reactRouterConfig("vite", "js", "mrs-app");
// reactRouterConfig("webpack", "js", "webpack");
