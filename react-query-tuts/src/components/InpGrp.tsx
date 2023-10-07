import { HTMLInputTypeAttribute } from 'react';
import useDarkLightTheme from '../context/DarkLightContext';
import clsx from 'clsx';

type props = {
    id: string,
    type: HTMLInputTypeAttribute,
    placeholder: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    label: string,
    textarea?: true
}

/**
 * @description Dont forget to include "inpgrp.scss" for styling
 */

export default function InpGrp(props: props) {
    const { theme } = useDarkLightTheme();

    return (
        <div className={clsx("inpgrp", theme === "light" && "inpgrp-light")}>
            <label htmlFor={props.id}>{props.label}</label>
            {
                props.textarea ? (
                    <textarea id={props.id} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
                ) : (
                    <input type={props.type} id={props.id} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
                )
            }
        </div>
    );
}