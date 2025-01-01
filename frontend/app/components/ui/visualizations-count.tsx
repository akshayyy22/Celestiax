import React, { useEffect, useState } from 'react';

export default function VisualizationsCount() {
  const [count, setCount] = useState<number>(() => {
    // Load the initial count from localStorage, or use a default value
    const savedCount = localStorage.getItem('visualizationCount');
    return savedCount ? parseInt(savedCount, 10) : 534;
  });

  useEffect(() => {
    const updateCount = () => {
      const increment = Math.floor(Math.random() * 3 + 1); // Increment by 1-3
      setCount((prevCount) => {
        const newCount = prevCount + increment;

        // Save the new count in localStorage
        localStorage.setItem('visualizationCount', newCount.toString());
        return newCount;
      });

      // Set a random interval for the next update (5 to 10 seconds)
      const nextInterval = Math.random() * (42000 - 21000) + 5000; // Random between 5000ms and 10000ms
      setTimeout(updateCount, nextInterval);
    };

    // Start the first update
    const initialInterval = Math.random() * (10000 - 5000) + 5000; // Random between 5000ms and 10000ms
    const timeout = setTimeout(updateCount, initialInterval);

    return () => clearTimeout(timeout); // Cleanup on component unmount
  }, []);

  return (
    <div className="font-normal text-sm text-neutral-300 px-4 py-2 rounded-full border border-blue-500/30 bg-gradient-to-b from-blue-400/10 to-blue-900/10 inline-block">
      <strong>{count}</strong> visualizations generated and counting
    </div>
  );
}
