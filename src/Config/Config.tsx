import React, {Component} from 'react';
import style from "./config.module.scss";
import {MetaForm} from "./parser";

type ConfigState = {
    rawText?: string;
};


class Config extends Component<{}, ConfigState> {
    static propTypes = {};

    state = {
        rawText: '',
        elements: []
    };

    onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const rawText: string = e.target.value || '';
        this.setState({rawText});
    };

    render() {
        return (
            <div>
                <textarea className={style.textarea} value={this.state.rawText} onChange={this.onTextChange}/>
                <MetaForm code={this.state.rawText} />
            </div>
        );
    }
}

export {Config};