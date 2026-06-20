import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geo Explorer - 3D 地理探索地球",
  description: "一个基于 Web 的 3D 地理知识探索应用，点击地球即可查看国家与地区信息。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}
