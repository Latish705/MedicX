export const Avatar = ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div className={`relative inline-block ${className}`}>{children}</div>
  );
  
  Avatar.Image = ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
  );
  
  Avatar.Fallback = ({ children }: { children: React.ReactNode }) => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-300 rounded-full">
      {children}
    </div>
  );
  