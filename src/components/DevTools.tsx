"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

// Agentation: toolbar per annotare la UI e passare feedback strutturato agli agenti AI. Solo in sviluppo.
const Agentation = dynamic(() => import("agentation").then((mod) => mod.Agentation), { ssr: false });

const banner = `
 ____             _                                  _ _
|  _ \\  _____   _| |    ___  ___  _ __   __ _ _ __ __| (_)___
| | | |/ _ \\ \\ / / |   / _ \\/ _ \\| '_ \\ / _\` | '__/ _\` | / __|
| |_| |  __/\\ V /| |__|  __/ (_) | | | | (_| | | | (_| | \\__ \\
|____/ \\___| \\_/ |_____\\___|\\___/|_| |_|\\__,_|_|  \\__,_|_|___/
`;

export default function DevTools() {
  useEffect(() => {
    console.log(`%c${banner}`, "color:#5cf2b0;font-family:monospace");
    console.log(
      "%cHai aperto la console: parliamo la stessa lingua. info@devleonardis.com\n%cTip: premi ⌘K / Ctrl+K.",
      "color:#ece6d9;font-size:13px",
      "color:#ffb547",
    );
  }, []);

  if (process.env.NODE_ENV !== "development") return null;
  return <Agentation />;
}
