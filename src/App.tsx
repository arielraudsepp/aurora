import React, { useEffect, useState, MouseEvent } from "react";
import logo from "./rustacean.svg";
import "./App.css";
import { Skill, getSkills, DiaryEntry, submitDiaryEntry } from "./FetchAPI";
import { SkillsGroup } from "./components/DisplaySkill";
import { Accordion, AccordionTitleProps } from "semantic-ui-react";

type CheckedSkills = {
  [key: number]: boolean;
};

type CategorizedSkills = {
  [key: string]: Skill[];
};

function App() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [checked, setChecked] = useState<CheckedSkills>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    getSkills("/skills").then(setSkills);
  }, []);

  let categorized_skills = skills.reduce(
    (init: CategorizedSkills, skill: Skill) => {
      if (!init[skill.category]) {
        init[skill.category] = [];
      }
      init[skill.category].push(skill);
      return init;
    },
    {}
  );

  let updateChecked = (id: number) => {
    setChecked({ ...checked, [id]: !checked[id] });
  };

  let checkSkills = Object.entries(checked).reduce(
    (init: number[], [key, value]) => {
      if (value === true) {
        init.push(parseInt(key));
      }
      return init;
    },
    []
  );

  let toggleAccordion = (
    event: MouseEvent<HTMLDivElement>,
    data: AccordionTitleProps
  ) => {
    const { index } = data;
    if (typeof index === "undefined") {
      return setActiveIndex(-1);
    } else if (typeof index === "string") {
      return setActiveIndex(-1);
    }

    const newIndex: number = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const diaryentry: DiaryEntry = {
    entry_date: new Date(),
    skill_ids: checkSkills,
  };

  let submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    submitDiaryEntry("/diary_entries", diaryentry);
  };

  return (
    <div className="App">
      <h1 className="ui header">
        <img src={logo} className="ui circular image" />
        DBT Skills{" "}
      </h1>
      <Accordion>
        <SkillsGroup
          category={"mindfulness"}
          categorized_skills={categorized_skills}
          category_index={0}
          update_checked={updateChecked}
          checkedSkills={checked}
          active_index={activeIndex}
          handle_click={toggleAccordion}
        />
        <SkillsGroup
          category={"emotion_regulation"}
          categorized_skills={categorized_skills}
          category_index={1}
          update_checked={updateChecked}
          checkedSkills={checked}
          active_index={activeIndex}
          handle_click={toggleAccordion}
        />
        <SkillsGroup
          category={"distress_tolerance"}
          categorized_skills={categorized_skills}
          category_index={2}
          update_checked={updateChecked}
          checkedSkills={checked}
          active_index={activeIndex}
          handle_click={toggleAccordion}
        />
      </Accordion>
      <button className="ui primary button" type="submit" onClick={submitForm}>
        Submit
      </button>
    </div>
  );
}

export default App;
