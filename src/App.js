import React from "react";
import ClassSection from "./component/classSection";
import AttributeSection from "./component/attributeSection";
import "./App.css";
import SkillSection from "./component/skillSection";
import SkillCheck from './component/skillCheck'
import Save from './component/save'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div><Save/></div>
        <div className='skill-check'>
          <h2>Skill Check</h2>
          <SkillCheck/>
        </div>
        <div className="character-detail">
          <div className="attribute-section">
            <AttributeSection />
          </div>
          <div className="class-section">
            <ClassSection />
          </div>
          <div className="skill-section"><SkillSection/></div>
        </div>
      </section>
    </div>
  );
}

export default App;
