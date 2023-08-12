import { useState, ChangeEvent, MouseEvent } from "react";
import { Accordion, AccordionTitleProps, Icon, Message } from "semantic-ui-react";
import { Skill } from "../FetchAPI";

interface ToggleSkillProps {
  skill: Skill;
  onChecked: (id: number) => void;
  checked: boolean;
}

interface SkillsGroupProps {
  categorized_skills: {
    [key: string]: Skill[];
  };
  category: string;
  update_checked: (id: number) => void;
  checkedSkills: {
    [key: number]: boolean;
  };
  category_index: number;
  active_index: number;
  handle_click: (
    e: MouseEvent<HTMLDivElement>,
    data: AccordionTitleProps
  ) => void;
}

const messageStyle = {
  position: 'absolute',
  right: 0,
  top: 0
}

function CapitalizeSkill(word: string): string {
    return word.split('_').map(str => str[0].toUpperCase() + str.substring(1)).join(' ');
};

function ToggleSkill(props: ToggleSkillProps) {
  const [isHovered, setHovering] = useState<boolean>(false);
  let { skill, onChecked, checked } = props;
  let onChange = (_event: ChangeEvent<HTMLInputElement>) => {
    onChecked(skill.id);
  };
  let skill_name = CapitalizeSkill(skill.name);

  return (
      <div>
          <div className="skill">
              <div className="ui toggle checkbox">
                  <input
                      type="checkbox"
                      id={skill.name}
                      name={skill.name}
                      onChange={onChange}
                      checked={!!checked}
                  />
                  <label onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                      {skill_name}
                    </label>
                </div>
            </div>
            <div className="helperText">
                <Message visible={isHovered} hidden={!isHovered}>
                    {skill.description}
                </Message>
            </div>
        </div>
    );
}

export function SkillsGroup(props: SkillsGroupProps) {
  let {
    category,
    category_index,
    categorized_skills,
    update_checked,
    checkedSkills,
    active_index,
    handle_click,
  } = props;
  let skills_group;
  if (!categorized_skills[category]) {
    skills_group = (
      <div className="ui placeholder">
        <div className="line"></div>
        <div className="line"></div>
      </div>
    );
  } else {
    skills_group = categorized_skills[category].map((skill: Skill) => {
      return (
        <ToggleSkill
          skill={skill}
          onChecked={update_checked}
          checked={checkedSkills[skill.id]}
          key={skill.id}
        />
      );
    });
  };
  let CategoryName = CapitalizeSkill(category);
  return (
    <>
      <Accordion.Title
        active={active_index === category_index}
        index={category_index}
        onClick={handle_click}
      >
        <Icon name="dropdown" />
        {CategoryName}
      </Accordion.Title>
      <Accordion.Content active={active_index === category_index}>
        {skills_group}
      </Accordion.Content>
    </>
  );
}
