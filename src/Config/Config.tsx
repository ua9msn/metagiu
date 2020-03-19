import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from "./config.module.scss";

type ConfigState = {
    rawText?: string,
};



class Config extends Component<{}, ConfigState> {
    static propTypes = {};

    state = {
        rawText: ''
    };

    onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const rawText:string = e.target.value || '';
        this.setState({rawText});
    };

    render() {
        return (
            <textarea className={style.textarea} value={this.state.rawText} onChange={this.onTextChange} />
        );
    }
}

export {Config};