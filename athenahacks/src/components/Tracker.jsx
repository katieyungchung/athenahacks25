import React, { useState, useEffect } from "react";
import Stopwatch from "./Stopwatch";
import Notes from "./Notes";
import "../css/Tracker.css";

const Tracker = () => {
    // const [hobby, setHobby] = useState("Loading...");
    const [hobby, setHobby] = useState({ aiInfo: "Loading...", weeklyTimeSpent: [] });

  
    // useEffect(() => {
    //     const fetchHobby = async () => {
    //     try {
    //         const response = await fetch("http://localhost:5000/api/hobbies"); // Update with correct backend URL
    //         const data = await response.json();

    //         if (data.length > 0) {
    //         setHobby(data[0].aiInfo || "No Hobby Found"); // Assuming `aiInfo` contains hobby name
    //         }
    //     } catch (error) {
    //         console.error("Error fetching hobby:", error);
    //         setHobby("Error loading hobby");
    //     }
    //     };

    //     fetchHobby();
    // }, []);

    useEffect(() => {
      const fetchHobby = async () => {
          try {
              const response = await fetch("http://localhost:5000/api/hobbies"); 
              const data = await response.json();
  
              if (data.length > 0) {
                  setHobby({
                      aiInfo: data[0].aiInfo || "No Hobby Found",
                      weeklyTimeSpent: data[0].weeklyTimeSpent || [0, 0, 0, 0, 0, 0, 0] // Ensure it's an array
                  });
              }
          } catch (error) {
              console.error("Error fetching hobby:", error);
              setHobby({ aiInfo: "Error loading hobby", weeklyTimeSpent: [0, 0, 0, 0, 0, 0, 0] });
          }
      };
  
      fetchHobby();
  }, []);
  


    let imageSrc = "";

  // Using if statements to determine the image
  if ( hobby.weeklyTimeSpent &&  hobby.weeklyTimeSpent[0] >= 0 &&  hobby.weeklyTimeSpent[0] < 15) {
    imageSrc = "Bean1.png";
  } else if (hobby.weeklyTimeSpent[0] >= 15 && hobby.weeklyTimeSpent[0] < 30) {
    imageSrc = "Bean2.png";
  } else if (hobby.weeklyTimeSpent[0] >= 30 && hobby.weeklyTimeSpent[0] < 45) {
    imageSrc = "Bean3.png";
  } else if (hobby.weeklyTimeSpent[0] >= 45 && hobby.weeklyTimeSpent[0] < 60){
    imageSrc = "Bean4.png";
  } else {
    imageSrc = "Bean5.png";
  }

  return (
    <div className="tracker-container">
      {/* <h1 className="tracker-title">{hobby}</h1> */}

      <div className="tracker-grid">
        <div className="tracker-card info-card">
          <h2 className="card-title">Info</h2>
          <ul>
            <li>link</li>
            <li>resources</li>
            <li>more stuff</li>
          </ul>
        </div>

        <div className="tracker-card stopwatch-card small-card">
          <h2 className="card-title">Stopwatch</h2>
          <Stopwatch />
        </div>

        <div className="tracker-card notes-card small-card">
          <h2 className="card-title">Notes</h2>
          <Notes />
        </div>

        {/* Weekly Tracker */}
        <div className="tracker-card weekly-tracker">
          <h2 className="card-title">Weekly Tracker</h2>
          <div className="tracker-week">
            <div className="day">mon <span>😞</span> <p>0h</p></div>
            <div className="day">tues <span>😊</span> <p>1h</p></div>
            <div className="day">wed <span>😊</span> <p>1h</p></div>
            <div className="day">thur <span>😊</span> <p>1h</p></div>
            <div className="day">fri <span>😊</span> <p>6h</p></div>
            <div className="day">sat <span>😊</span> <p>1h</p></div>
            <div className="day">sun <span>😊</span> <p>1h</p></div>
            <div className="day">Current Time: {hobby.weeklyTimeSpent[0]} sec <img src={imageSrc} alt="Time-Based Image" width="300" /></div>
     
          </div>
        </div>
      </div>

      {/* Decorative Images */}
      <img src="/Bird.png" alt="Athena Bird" className="tracker-bird" />
      <img src="/Bigstar.png" alt="Sparkles" className="tracker-sparkles sparkles-1" />
      <img src="/Bigstar.png" alt="Sparkles" className="tracker-sparkles sparkles-2" />
      <img src="/Bigstar.png" alt="Sparkles" className="tracker-sparkles sparkles-3" />
      <img src="/Bigstar.png" alt="Sparkles" className="tracker-sparkles sparkles-4" />
    </div>
  );
};

export default Tracker;
