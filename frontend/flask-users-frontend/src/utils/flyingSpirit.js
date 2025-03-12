import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FlyingSpirit = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const moveSpirit = (event) => {
      setPosition({
        x: event.pageX, // Uses absolute page position (fixes scroll issue)
        y: event.pageY, 
      });
    };

    window.addEventListener("mousemove", moveSpirit);

    return () => {
      window.removeEventListener("mousemove", moveSpirit);
    };
  }, []);

  return (
    <motion.div
      animate={{ x: position.x - 20, y: position.y - 20 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      style={{
        position: "absolute",
        fontSize: "2rem",
        pointerEvents: "none",
        zIndex: 5
      }}
    >
      💸
    </motion.div>
  );
};

export default FlyingSpirit;
