import React, {Component} from 'react';
import style from "./config.module.scss";
import {MetaForm} from "./MetaFrom";

type ConfigState = {
    rawText?: string;
};


class MetaGui extends Component<{}, ConfigState> {
    static propTypes = {};

    state = {
        rawText: ''
    };

    onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const rawText: string = e.target.value || '';
        this.setState({rawText});
    };

    render() {
        return (
            <div className={style.metaGui}>
                <textarea className={style.textarea} value={this.state.rawText} onChange={this.onTextChange}/>
                <MetaForm code={this.state.rawText} />
            </div>
        );
    }
}

export {MetaGui};