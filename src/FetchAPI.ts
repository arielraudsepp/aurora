export interface Skill {
    id: number;
    name: string;
    category: string;
};

export interface DiaryEntry {
    entry_date: Date;
    skill_ids: number[];
};

export async function getSkills(route: string): Promise<Skill[]> {
    const response = await fetch('http://localhost:8000'.concat(route), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

export async function submitDiaryEntry(route: string, data: DiaryEntry) {
    const response = await fetch ('http://localhost:8000'.concat(route), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
