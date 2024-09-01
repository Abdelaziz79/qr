import Image from "next/image";
import NavBar from "./_components/NavBar";
import QRScanner from "./_components/QRScanner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <NavBar />
      <QRScanner />
    </main>
  );
}
