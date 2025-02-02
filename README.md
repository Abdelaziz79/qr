# QR Code Reader & Generator

A simple QR code reader and generator built with Next.js. This web app allows users to generate QR codes, scan QR codes using a camera, and save generated QR codes in local storage for future use.

## Demo
[Live Demo](https://qr-iota-six.vercel.app/)

## Features
- Generate QR codes from text input
- Scan QR codes using a camera
- Save generated QR codes to local storage
- Responsive and user-friendly interface

## Technologies Used
- **Next.js** - Framework for React applications
- **react-qr-reader-es6** - QR code scanner
- **qrcode.react** - QR code generator

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Abdelaziz79/qr.git
   cd qr
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Generate QR Code
1. Enter text in the input field.
2. Click the "Generate QR Code" button.
3. The QR code will be displayed.
4. You can save the generated QR code in local storage.

### Scan QR Code
1. Click the "Scan QR Code" button.
2. Allow camera access when prompted.
3. Point your camera at a QR code.
4. The scanned result will be displayed.

## Dependencies
```javascript
const QrReader = dynamic(() => import("react-qr-reader-es6"), { ssr: false });
import { QRCodeSVG } from "qrcode.react";
```

## Deployment
This project is deployed using Vercel. To deploy your own version:
1. Push your changes to GitHub.
2. Connect your repository to Vercel.
3. Deploy with a single click.

## License
This project is open-source and available under the MIT License.

## Author
[Abdelaziz Elhadry](https://github.com/Abdelaziz79)

