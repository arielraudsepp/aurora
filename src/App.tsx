import React, { ChangeEvent, useEffect, useState } from 'react';
import logo from './rustacean.svg';
import './App.css';
import { Button } from 'semantic-ui-react'
import { Skill, getSkills, DiaryEntry, submitDiaryEntry } from './FetchAPI';

interface DisplaySkillProps {
  skill: Skill,
  onChecked: (id: number) => void,
  checked: boolean
}

function DisplaySkill(props: DisplaySkillProps) {
  let { skill, onChecked, checked } = props;
  let onChange = (_event: ChangeEvent<HTMLInputElement>) => {
      onChecked(skill.id);
  }
  return (
    <ul>
      <label>
        {skill.name}:
          <input type="checkbox" id={skill.name} name={skill.name} onChange={onChange} checked={!!checked}/>
      </label>
    </ul>
  );
}


type CheckedSkills = {
    [key: number]: boolean;
}

function App() {

  const [skills, setSkills] = useState<Skill[]>([]);
  const [checked, setChecked] = useState<CheckedSkills>({});
  const [phrasing, updatePhrasing] = useState("");

  useEffect(() => {
    getSkills('/skills').then(setSkills);
  }, []);

  let updateChecked = (id: number) => {
      setChecked({...checked, [id]: !checked[id]});
  }

  let checkSkills = Object.entries(checked).reduce((init: number[], [key, value]) => {
    if (value === true) {
        init.push(parseInt(key))
    };
    return init
  }, []);

  const diaryentry: DiaryEntry = {
      entry_date: new Date(),
      skill_ids: checkSkills
  };

  let handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    submitDiaryEntry('/diary_entries', diaryentry);
  }

  function rephrase(event: ChangeEvent<HTMLInputElement>) {
    let text: string = event.target.value;
    updatePhrasing(text);
  }

  let displayedSkills = skills.map((skill: Skill) => {
      return <DisplaySkill skill={skill} onChecked={updateChecked} checked={checked[skill.id]} key={skill.id} />
  });



  return (
    <div className="App">
      <header className="App-body">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <form>
          {displayedSkills}
          <div>
            <Button type="submit" onClick={handleClick}>Submit</Button>
          </div>
        </form>
        <p>
          {phrasing}
        </p>
        <input onChange={rephrase} type="text" />
      </header>
    </div>
  );
}

export default App;
