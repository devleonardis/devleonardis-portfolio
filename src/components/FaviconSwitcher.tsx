"use client";

import { useEffect } from "react";

const D_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23050B13'/%3E%3Crect x='1.2' y='1.2' width='61.6' height='61.6' rx='12.8' fill='none' stroke='%2334D399' stroke-opacity='0.35' stroke-width='2.4'/%3E%3Cpath d='M18 14H33.2C42.2 14 49 20.6 49 30.9V33.1C49 43.4 42.2 50 33.2 50H18V14ZM25.1 20.4V43.6H32.8C37.6 43.6 41.6 40.1 41.6 33.2V30.8C41.6 23.9 37.6 20.4 32.8 20.4H25.1Z' fill='%23E5E7EB'/%3E%3C/svg%3E";

const CODE_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23050B13'/%3E%3Crect x='1.2' y='1.2' width='61.6' height='61.6' rx='12.8' fill='none' stroke='%2334D399' stroke-opacity='0.35' stroke-width='2.4'/%3E%3Cpath d='M20.5 32L29 23.5L26 20.5L14.5 32L26 43.5L29 40.5L20.5 32Z' fill='%2334D399'/%3E%3Cpath d='M43.5 32L35 40.5L38 43.5L49.5 32L38 20.5L35 23.5L43.5 32Z' fill='%2334D399'/%3E%3Cpath d='M24.7 46L36.9 18H40.9L28.7 46H24.7Z' fill='%23E5E7EB'/%3E%3C/svg%3E";

function ensureFaviconLink() {
  const existing = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (existing) return existing;

  const link = document.createElement("link");
  link.rel = "icon";
  document.head.appendChild(link);
  return link;
}

export default function FaviconSwitcher() {
  useEffect(() => {
    const link = ensureFaviconLink();
    const icons = [D_ICON, CODE_ICON];
    let index = 0;

    link.href = icons[index];

    const interval = window.setInterval(() => {
      if (document.hidden) return;
      index = (index + 1) % icons.length;
      link.href = icons[index];
    }, 1500);

    return () => {
      window.clearInterval(interval);
      link.href = D_ICON;
    };
  }, []);

  return null;
}
