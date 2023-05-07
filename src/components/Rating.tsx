import React from "react";
import { RatingValue } from "../FetchAPI";
import { Slider } from "react-semantic-ui-range";
import { Grid, Label } from "semantic-ui-react";

interface RatingProps {
    name: string;
    value: RatingValue;
}

const NumToEnum: Record<number, RatingValue> = {
    0: RatingValue.Zero,
    1: RatingValue.One,
    2: RatingValue.Two,
    3: RatingValue.Three,
    4: RatingValue.Four,
    5: RatingValue.Five
}

const EnumToNum: Record<RatingValue, number> = {
    [RatingValue.Zero]: 0,
    [RatingValue.One]: 1,
    [RatingValue.Two]: 2,
    [RatingValue.Three]: 3,
    [RatingValue.Four]: 4,
    [RatingValue.Five]: 5
}

export function SetRating(props: RatingProps) {
    let { name, value } = props;

    const [ val, setVal ] = React.useState<number>(EnumToNum[value]);

    const settings = {
        start: 3,
        min: 0,
        max: 5,
        step: 1,
        onChange: (num: number) => {
            setVal(num);
        }
    };

    return (
        <Grid>
        <Grid.Row>
            <Grid.Column width={4}>
                <label>{name}</label>
                <Slider value={value} color="blue" settings={settings} />
                <Label color="blue">{val}</Label>
            </Grid.Column>
        </Grid.Row>
        </Grid>
    )
}
