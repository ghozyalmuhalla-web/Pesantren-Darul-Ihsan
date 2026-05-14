import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      {/* Background Layer */}
      <div className="fixed inset-0 z-[-2]">
        <Image 
          src="/images/hero-main.png" 
          alt="Admin Background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      <div className="admin-bg-overlay"></div>
      
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}
