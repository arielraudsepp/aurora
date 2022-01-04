export interface Skill {
    id: number;
    name: string;
};

export async function getSkills(route: string): Promise<Skill[]> {
    const response = await fetch('http://localhost:8000'.concat(route), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}
