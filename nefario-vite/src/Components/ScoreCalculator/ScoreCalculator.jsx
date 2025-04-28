import React, { useState } from "react";
import { handleInputChange, handleCalculate } from "/src/Common/Services/ScoreService";
import { parseTimeInput } from '/src/Common/Utils/parseTimeInput';
import { isValidTime } from '/src/Common/Utils/isValidTime';
import { individualPoints, relayPoints } from '/src/Common/Utils/scoringRules';
import ScoreList from "./ScoreList";

const ScoreModule = () => {
  const [selections, setSelections] = useState({});
  const [teamScores, setTeamScores] = useState({ teamA: 0, teamB: 0 });

  const events = [
    { id: 1, name: "200 Medley Relay", type: "relay" },
    { id: 2, name: "200 Free", type: "individual" },
    { id: 3, name: "200 IM", type: "individual" },
    { id: 4, name: "50 Free", type: "individual" },
    { id: 6, name: "100 Fly", type: "individual" },
    { id: 7, name: "100 Free", type: "individual" },
    { id: 8, name: "500 Free", type: "individual" },
    { id: 9, name: "200 Free Relay", type: "relay" },
    { id: 10, name: "100 Back", type: "individual" },
    { id: 11, name: "100 Breast", type: "individual" },
    { id: 12, name: "400 Free Relay", type: "relay" },
  ];
  
  return (
    <section>
      <h2 className="indent">Meet Scoring Calculator</h2>
      <p className="indent">Fill out swimmers' times for each event, then calculate the score.</p>
      <ScoreList 
        selections={selections} 
        setSelections={setSelections} 
        teamScores={teamScores} 
        setTeamScores={setTeamScores} 
      />
    </section>
  );
};

export default ScoreModule;
