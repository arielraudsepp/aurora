import React, { ChangeEvent, useState } from 'react';
import logo from './rustacean.svg';
import './App.css';
import ButtonExampleButton from './components/Button';
import { Skill, getSkills } from './FetchAPI';

interface DisplaySkillProps {
  skill: Skill
}
function DisplaySkill(props: DisplaySkillProps) {
  let { skill } = props;
  return <li>{skill.name}</li>
}

function App() {

  const [skills, setSkills] = useState<Skill[]>([]);

  const [phrasing, updatePhrasing] = useState("");

  // to prevent request each time page is rendered
  if (skills.length === 0) {
    getSkills('/skills').then(setSkills);
  }

  let rephrase = (event: ChangeEvent<HTMLInputElement>) => {
    let text: string = event.target.value;
    updatePhrasing(text);
  }

  let displayedSkills = skills.map((skill: Skill, index: number) => {
    return <DisplaySkill skill={skill} key={index} />
  });

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <ul>
          {displayedSkills}
        </ul>
        <p>
          {phrasing}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input onChange={rephrase} type="text" />
        <ButtonExampleButton text={skills ? "Do nothing" : "clear"} onClick={(_: any) => setSkills([])} />
      </header>
    </div>
  );
}

export default App;
