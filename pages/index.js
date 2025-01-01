import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useSocket } from "@/context/socket";
import { useEffect } from "react";
import  usePeer  from "@/Hooks/usePeer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  usePeer();

  const socket = useSocket();

  useEffect(() => {
    socket?.on('connect',() => {
      console.log("Socket id ", socket.id)
    })
  },[socket]);

  return (
    <div>Welcome</div>
  );
}
