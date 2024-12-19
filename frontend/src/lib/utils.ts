import { clsx, type ClassValue } from "clsx";
import { io } from "socket.io-client";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const socket = io("https://socket-app-examples.onrender.com", {
  transports: ["websocket", "polling"], // Explicitly specify transports
});
