import React, {useState} from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import PassionCard from './PassionCard.tsx';

//   const { passions, explanation, recommendations } = results;

function GatherHobby({description}){
    
    const [hobbies, setHobbies] = useState([]);

    const genAI = new GoogleGenerativeAI("AIzaSyDE46VnSmG-meU4BYukixykeVVWh5o2z_w");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fetchRecommendations = async (desc) => {
        try {
            const prompt = `Give a unique hobby for this personality: "${description}" in JSON format witht he following structure: 
            {
                "name": "Hobby Name",
                "description": "Short description of the hobby",
                "resources": ["Resource 1", "Resource 2", "Resource 3"]
            }`;
            const result = await model.generateContent(prompt);
            const text = await result.response.text();
            const cleanText = text.replace(/```json|```/g, "").trim();
            const json = JSON.parse(cleanText);
            return json;
        } catch(error){
            console.error("Error fetching recommendations: ", error);
        }
    };

    const handleRecs = async () => {
        setHobbies([]);
        const recommendations = await Promise.all(
            description.map(async (desc) => await fetchRecommendations(desc))
        );
        setHobbies(recommendations.filter((hobby)=>hobby!==null));
    };


    return (
        <>
        <div>
            <button onClick={handleRecs}>Get Recommendations</button>
            <div className="hobbies-list">
                {hobbies.map((hobbyArray, index) => (
                    <div key={index}>
                        <PassionCard name={hobbyArray.name} description={hobbyArray.description}/>
                    </div>
                ))}
            </div>
        </div>
        </>
    );

}

export default GatherHobby