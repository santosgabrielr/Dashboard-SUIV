import { useState } from "react";

export default function DashboardSidebar(){ 
  const [isHovered, setIsHovered] = useState(false);

  return(
    <div className="DashboardSidebar"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <>
        <div className="DashboardSidebar-content">
          <h1>Filtros</h1>
        </div>
        </>
      )}
    </div>
  );
}