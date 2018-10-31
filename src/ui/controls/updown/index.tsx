import {html} from 'malevic';
import Button from '../button';
import Slider from '../slider';
import {getLocalMessage} from '../../../utils/locales';

interface UpDownProps {
    value: number;
    min: number;
    max: number;
    step: number;
    default: number;
    name: string;
    onChange: (value: number) => void;
}

export default function UpDown(props: UpDownProps) {

    const buttonDownCls = {
        'updown__button': true,
        'updown__button--disabled': props.value === props.min
    };

    const buttonUpCls = {
        'updown__button': true,
        'updown__button--disabled': props.value === props.max
    };

    function normalize(x: number) {
        const exp = Math.ceil(Math.log10(props.step));
        if (exp >= 1) {
            const m = Math.pow(10, exp);
            return Math.round(x / m) * m;
        } else {
            const m = Math.pow(10, -exp);
            return Math.round(x * m) / m;
        }
    }

    function clamp(x: number) {
        return Math.max(props.min, Math.min(props.max, x));
    }

    function onButtonDownClick() {
        props.onChange(clamp(normalize(props.value - props.step)));
    }

    function onSliderChange(sliderValue: number) {
        props.onChange(clamp(normalize(sliderValue)));
    }

    function onButtonUpClick() {
        props.onChange(clamp(normalize(props.value + props.step)));
    }

    const valueText = (props.value === props.default
        ? getLocalMessage('off').toLocaleLowerCase()
        : props.value > props.default
            ? `+${normalize(props.value - props.default)}`
            : `-${normalize(props.default - props.value)}`
    );

    return (
        <div class="updown">
            <div class="updown__line">
                <Button class={buttonDownCls} onclick={onButtonDownClick} >
                    <span class="updown__icon updown__icon-down"></span>
                </Button>
                <Slider
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    value={props.value}
                    label={props.name}
                    onchange={onSliderChange}
                />
                <Button class={buttonUpCls} onclick={onButtonUpClick} >
                    <span class="updown__icon updown__icon-up"></span>
                </Button>
            </div>
            <label class="updown__value-text">
                {valueText}
            </label>
        </div>
    );
}
