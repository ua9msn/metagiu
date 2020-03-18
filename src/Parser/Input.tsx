import React, {FunctionComponent} from 'react';
import PropTypes from 'prop-types';
import style from './input.module.scss';


interface InputProps {
    text?: string,
}

export const Input: FunctionComponent<InputProps> = ({text}) =>
    <textarea className={style.textarea} value={text}/>;

Input.propTypes = {
    text: PropTypes.string,
};
