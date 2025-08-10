import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Test Task',
  description: 'test application for employment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
