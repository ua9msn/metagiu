import React, {FunctionComponent} from 'react';
import PropTypes from 'prop-types';
import style from './input.module.scss';


type InputProps = {
    text?: string
}

export const Input: FunctionComponent<InputProps> = ({text}) =>
    <textarea className={style.textarea} value={text}/>;

Input.propTypes = {
    text: PropTypes.string,
};
