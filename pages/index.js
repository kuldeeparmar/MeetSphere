import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { v4  } from 'uuid';
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '@/styles/home.module.css'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const router = useRouter();
  const [roomId,setRoomId] = useState('');

  const handleClick = () => {
    const roomId = v4();
    router.push(`/${roomId}`);
  }

  const joinRoom = () => {
    if(roomId){
      router.push(`/${roomId}`);
    }
    else {
      alert('Provide a correct Room ID');
    }
  }

  return (
    <div className={styles.homeContainer}>
      <h1>MeetSphere</h1>
      <div className={styles.enterRoom}>
        <input placeholder="Enter Room ID" value={roomId} onChange={(e) => {setRoomId(e?.target?.value)}}/>
        <button onClick={joinRoom}>Join a Room</button>
      </div>
      <span className={styles.separatorText}>--------------- OR ---------------</span>
      <button onClick={handleClick}>Create a new Room</button>
    </div>

  );
}
