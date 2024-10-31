import { createApp } from "./app";

export * from "./app";

export function startApp() {
  createApp().listen(3000, () => {
    console.log("App is running on port 3000");
  });
}

startApp()