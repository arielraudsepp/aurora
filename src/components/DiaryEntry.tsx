import React, { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import { Skill, getSkills, DiaryEntry, getDiaryEntrySkills, DiaryEntrySkills, retreiveDiaryEntry, updateDiaryEntry, Rating, DiaryEntryRecord, RatingValue } from "../FetchAPI";
import { SkillsGroup } from "./DisplaySkill";
import { SetRating } from "./Rating";
import { Accordion, AccordionTitleProps, Button, Grid } from "semantic-ui-react";

type CheckedSkills = {
    [key: number]: boolean;
};

type CategorizedSkills = {
    [key: string]: Skill[];
};

function Diary() {
    let { entryDate } = useParams<string>();
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [diaryEntryId, setDiaryEntryId] = useState<number>(0);
    const [notes, setNotes] = useState<string>("");
    const [checked, setChecked] = useState<CheckedSkills>({});
    const [activeIndex, setActiveIndex] = useState<number>(0);

    let navigate = useNavigate();
    let date = entryDate!;

    useEffect(() => {
        retreiveDiaryEntry(date).then((result) => {
            setDiaryEntryId(result.id);
            setNotes(result.notes);
            initRatings(result);
    });
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

    // create initRatings function
    function initRatings(entry: DiaryEntryRecord) {
        const ratings: Rating[] = [];

        ratings.push({ name: 'pain', value: RatingValue.Four });
        ratings.push({ name: 'sadness', value: entry.sadness });
        ratings.push({ name: 'joy', value: entry.joy });
        ratings.push({ name: 'shame', value: entry.shame });
        ratings.push({ name: 'anger', value: entry.anger });
        ratings.push({ name: 'fear', value: entry.fear });
        ratings.push({ name: 'drug_use', value: entry.drug_use });
        ratings.push({ name: 'suicide', value: entry.suicide });
        ratings.push({ name: 'self_harm', value: entry.self_harm });

        setRatings(ratings);
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

    const diaryentry: DiaryEntry = {
        entry_form: {
            entry_date: new Date(date).toString(),
            notes: notes,
            pain: RatingValue.Four,
            sadness: RatingValue.Four,
            joy: RatingValue.Four,
            shame: RatingValue.Four,
            anger: RatingValue.Four,
            fear: RatingValue.Four,
            drug_use: RatingValue.Four,
            suicide: RatingValue.Four,
            self_harm: RatingValue.Four
        },
        skill_ids: checkSkills
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
                        <div>
                            <Grid>
                                {ratings.map((rating) => (
                                    <div key={rating.name}>
                                        <SetRating
                                            name={rating.name}
                                            value={rating.value}
                                        />
                                    </div>

                                ))}
                            </Grid>
                        </div>
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
        </div >
    );
}

export default Diary;
