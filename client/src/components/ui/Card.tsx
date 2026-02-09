// client/src/components/ui/Card.tsx

interface CardProps {
  // The card component
  children: React.ReactNode;
  className?: string;
}

// The card component
function Card({children, className = ""}: CardProps) {
  return (
     <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
            {children}
        </div>
  );
}

export default Card;