// import { type JSX } from "react";

// export function Card({
//   className,
//   title,
//   children,
//   href,
// }: {
//   className?: string;
//   title: string;
//   children: React.ReactNode;
//   href: string;
// }): JSX.Element {
//   return (
//     <a
//       className={className}
//       href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
//       rel="noopener noreferrer"
//       target="_blank"
//     >
//       <h2>
//         {title} <span>-&gt;</span>
//       </h2>
//       <p>{children}</p>
//     </a>
//   );
// }


export const Card = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <div className={`border border-gray-300 rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

Card.Header = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b p-4">{children}</div>
);

Card.Content = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
);

Card.Title = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

Card.Description = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-500">{children}</p>
);
