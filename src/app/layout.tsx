import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Earth Garden - 3D 地球花园",
  description: "一个基于 Web 的 3D 地球数据可视化应用，展示世界各地的代表性植物",
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
