"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Download, QrCode, Camera, X } from "lucide-react";

// Dynamically import QrReader to avoid SSR issues
const QrReader = dynamic(() => import("react-qr-reader-es6"), { ssr: false });

const QRCodeComponent: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [qrCodes, setQrCodes] = useState<string[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedResult, setScannedResult] = useState("");

  useEffect(() => {
    const storedCodes = JSON.parse(localStorage.getItem("qrCodes") || "[]");
    setQrCodes(storedCodes);
  }, []);

  const handleGenerateQR = () => {
    if (inputText.trim() !== "") {
      const updatedCodes = [inputText, ...qrCodes];
      setQrCodes(updatedCodes);
      localStorage.setItem("qrCodes", JSON.stringify(updatedCodes));
      setInputText("");
    }
  };

  const handleScan = (data: string | null) => {
    if (data) {
      setScannedResult(data);
      setIsScannerOpen(false);
      const updatedCodes = [data, ...qrCodes];
      setQrCodes(updatedCodes);
      localStorage.setItem("qrCodes", JSON.stringify(updatedCodes));
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  const handleClear = () => {
    setQrCodes([]);
    localStorage.removeItem("qrCodes");
  };

  const downloadQR = (text: string) => {
    const svg = document.getElementById(`qr-code-${text}`);
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `qr-code-${text}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center">
            <QrCode className="mr-2" />
            QR Code Generator & Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex space-x-2 mb-6">
            <Input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text for QR code"
              className="flex-grow"
            />
            <Button
              onClick={handleGenerateQR}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Generate
            </Button>
          </div>
          <div className="flex justify-center mb-6">
            <Button
              onClick={() => setIsScannerOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Camera className="mr-2" />
              Scan QR Code
            </Button>
          </div>
          {isScannerOpen && (
            <div className="relative mb-6">
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
              <Button
                onClick={() => setIsScannerOpen(false)}
                className="absolute top-2 z-10 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
              >
                <X size={20} />
              </Button>
            </div>
          )}
          {scannedResult && (
            <div className="mb-6 p-4 bg-green-100 border-green-400 text-green-700 rounded">
              <h4 className="font-semibold">Scanned Result:</h4>
              <p>{scannedResult}</p>
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              QR Codes:
            </h3>
            <ScrollArea className="h-64 rounded-md border p-4">
              {qrCodes.length > 0 ? (
                <ul className="space-y-4">
                  {qrCodes.map((code, index) => (
                    <li
                      key={index}
                      className="flex flex-col items-center bg-gray-100 p-4 rounded-md"
                    >
                      <QRCodeSVG
                        id={`qr-code-${code}`}
                        value={code}
                        size={128}
                      />
                      <p className="mt-2 text-sm text-gray-600">{code}</p>
                      <Button
                        onClick={() => downloadQR(code)}
                        className="mt-2 bg-green-500 hover:bg-green-600 text-white"
                        size="sm"
                      >
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">
                  No QR codes generated or scanned yet
                </p>
              )}
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-gray-50 rounded-b-lg p-4 gap-1">
          <p className="text-sm text-gray-500">
            QR codes stored in localStorage
          </p>
          <Button
            onClick={handleClear}
            variant="destructive"
            size="sm"
            className="flex items-center"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Clear All
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QRCodeComponent;
