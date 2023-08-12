import { useState } from "react";
import { RatingValue } from "../FetchAPI";
import { Slider } from "react-semantic-ui-range";
import { Grid, Input, Label } from "semantic-ui-react";

interface RatingProps {
    name: string;
    val: RatingValue;
}

const NumToEnum: Record<number, RatingValue> = {
    0: RatingValue.Zero,
    1: RatingValue.One,
    2: RatingValue.Two,
    3: RatingValue.Three,
    4: RatingValue.Four,
    5: RatingValue.Five
}

const EnumToNum: Record<RatingValue, number> ={
    [RatingValue.Zero]: 0,
    [RatingValue.One]: 1,
    [RatingValue.Two]: 2,
    [RatingValue.Three]: 3,
    [RatingValue.Four]: 4,
    [RatingValue.Five]: 5
}

export function SetRating(props: RatingProps) {
    let { name, val } = props;
    const [ value, setValue ] = useState<number>(EnumToNum[val]);

    const settings = {
        start: val,
        min: 0,
        max: 5,
        step: 1,
        onChange: (value: number) => {
            setValue(value);
            val = NumToEnum[value];
        }
    }

    return (
        <div>
            <label>{name}</label>
            <Grid>
                <Grid.Column width={12}>
                    <Slider
                        value={value}
                        color="blue"
                        inverted={false}
                        settings={settings}
                    />
                    <Label color="blue">{value}</Label>
                </Grid.Column>
            </Grid>
        </div>
    )
}
