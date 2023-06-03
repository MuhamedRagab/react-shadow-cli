const commands = {
  buildProject: {
    vite: {
      buildBy: {
        npm: "npm create vite@latest",
        yarn: "yarn create vite",
      },
      dash: {
        npm: "--",
        yarn: "",
      },
      template: {
        js: "--template react",
        ts: "--template react-ts",
      },
    },
    webpack: {
      buildBy: {
        npm: "npx create-react-app",
        yarn: "yarn create react-app",
      },
      dash: {
        npm: "",
        yarn: "",
      },
      template: {
        js: "",
        ts: "--template typescript",
      },
    },
  },
  installCommand: {
    npm: "npm install",
    yarn: "yarn add",
  },
  devDependencies: {
    tailwindcss: {
      vite: {
        library: "-D tailwindcss postcss autoprefixer",
        config: "npx tailwindcss init -p",
      },
      webpack: {
        library: "-D tailwindcss",
        config: "npx tailwindcss init",
      },
    },
  },
};

export default commands;
