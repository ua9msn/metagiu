import React, {Component} from 'react';

const TYPES = Object.freeze({
    LABEL:  'label',
    TEXT:   'text',
    SUBMIT: 'submit'
});
const stringMatcher = new RegExp(/^".+"$/);

function tokenize(code) {
    return code
        .split('\n')
        .map(line => {
            const [type, param = ''] = line.split(':').map(x => x.trim());
            return {type, param}
        })
        .map(({type, param}) => {
        switch (type) {
            case TYPES.LABEL:
                return props => <LabelElement value={param} {...props} />;
            case TYPES.TEXT:
                const isFormula = param.charAt(0) === '=';
                return isFormula
                    ? props => <ExpressionElement formula={param} {...props} />
                    : props => <TextElement name={param} {...props} />;
            case TYPES.SUBMIT:
                return props => <SubmitElement value={param} {...props} />;
            default:
                return () => <NilEl/> ;
        }
    });
}

const NilEl = props => <div/>;
const LabelElement = props => <label>{props.value}</label>;
const TextElement = props => <input name={props.name} value={props.data[props.name] || ''} onChange={props.onChange} />;
const SubmitElement = props => <input type="submit" value={props.value || 'submit'}/>;
const ExpressionElement = ({data, formula}) => {
    const tokens = formula
        .trim()
        .substr(1)
        .split('+')
        .map(t => t.trim());
    let text = '';
    tokens.forEach(t => {
        const isString = stringMatcher.test(t);
        text += isString
            ? t.slice(1, -1)
            : data && data[t] || ''
    });
    return (
        <input type="text" value={text} readOnly />
    )
};

export class MetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            elements: [],
            code: ''
        }
    }

    static getDerivedStateFromProps(props, state){
        if(props.code === state.code) return null;
        const elements = tokenize(props.code);
        return {elements, code: props.code}
    }

    onElChange = e => {
        e.stopPropagation();
        const data = {
            ...this.state.data,
            [e.target.name]:  e.target.value
        };
        this.setState({data});
    };

    render() {

        const Elements = this.state.elements.map((El, index) => {
            return (
                <El onChange={this.onElChange} data={this.state.data} key={index} />
            )
        });
        return (
            <form>
                {Elements}
            </form>
        )
    }
}