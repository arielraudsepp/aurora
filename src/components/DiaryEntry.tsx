import React, { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import { Skill, getSkills, DiaryEntry, getDiaryEntrySkills, DiaryEntrySkills, retreiveDiaryEntry, updateDiaryEntry } from "../FetchAPI";
import { SkillsGroup } from "./DisplaySkill";
import { Accordion, AccordionTitleProps, Button, Grid, Message } from "semantic-ui-react";

type CheckedSkills = {
    [key: number]: boolean;
};

type CategorizedSkills = {
    [key: string]: Skill[];
};

function Diary() {
    let { entryDate } = useParams<string>();

    const [skills, setSkills] = useState<Skill[]>([]);
    const [diaryEntryId, setDiaryEntryId] = useState<number>(0);
    const [notes, setNotes] = useState<string>("");
    const [checked, setChecked] = useState<CheckedSkills>({});
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isShown, setIsShown] = useState(false);

    let navigate = useNavigate();
    let date = entryDate!;

    useEffect(() => {
        retreiveDiaryEntry(date).then((value) => {
            setDiaryEntryId(value.id);
            setNotes(value.notes);
        })
    }, []);

    useEffect(() => {
        getDiaryEntrySkills(date).then(initChecked)
    }, []);

    useEffect(() => {
        getSkills().then(setSkills);
    }, []);

    let updateNotes = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
    }

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

    let initChecked = (diaryEntrySkills: DiaryEntrySkills[]) => {
        let skillIDs = diaryEntrySkills.map(item => item['skills_id']);
        let checked = skillIDs.reduce(
            (init: CheckedSkills, skillID) => (
                { ...init, [skillID]: true }),
            {}
        );
        setChecked(checked);
    };

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

    const text = new Map();
    text.set(0, "zero");
    text.set(1, "one");
    text.set(2, "two");

    let displayDescription = () => {
        setIsShown(true);
    }

    let hideDescription = () => {
        setIsShown(false);
    }

    const diaryentry: DiaryEntry = {
        entry_date: new Date(date),
        skill_ids: checkSkills,
        notes: notes,
    };

    const entry_id = diaryEntryId;

    let submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        updateDiaryEntry(entry_id, diaryentry);
        navigate("/calendar");
    };

    return (
        <div className="App">
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Accordion>
                            <SkillsGroup
                                category={"mindfulness"}
                                categorized_skills={categorized_skills}
                                category_index={0}
                                update_checked={updateChecked}
                                checkedSkills={checked}
                                active_index={activeIndex}
                                handle_click={toggleAccordion}
                                mouse_on={displayDescription}
                                mouse_off={hideDescription}
                            />
                            <SkillsGroup
                                category={"emotion_regulation"}
                                categorized_skills={categorized_skills}
                                category_index={1}
                                update_checked={updateChecked}
                                checkedSkills={checked}
                                active_index={activeIndex}
                                handle_click={toggleAccordion}
                                mouse_on={displayDescription}
                                mouse_off={hideDescription}
                            />
                            <SkillsGroup
                                category={"distress_tolerance"}
                                categorized_skills={categorized_skills}
                                category_index={2}
                                update_checked={updateChecked}
                                checkedSkills={checked}
                                active_index={activeIndex}
                                handle_click={toggleAccordion}
                                mouse_on={displayDescription}
                                mouse_off={hideDescription}
                            />
        <Message name="desciprion" visible={isShown} hidden={!isShown} content="some text">
                            </Message>
                        </Accordion>
                    </Grid.Column>
                    <Grid.Column>
                        <div>
                            <label> Notes</label>
                            <textarea rows={7} cols={25} value={notes} onChange={updateNotes} name="notes" placeholder="Enter notes about your day!" />
                        </div>
                        <Button content="Submit" onClick={submitForm} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default Diary;
