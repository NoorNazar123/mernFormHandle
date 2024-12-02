import { useEffect, useState } from "react";

const HeroSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiData = async () => {
      try {
        const response = await fetch("/api/v1/users/register");
        const res = await response.json();
        setData(res); // Update state with fetched data
        console.log(res);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    apiData(); // Call the function inside useEffect
  }, []); // Empty dependency array to run useEffect once on component mount

  return <div>HeroSection: {JSON.stringify(data)}</div>;
};

export default HeroSection;
