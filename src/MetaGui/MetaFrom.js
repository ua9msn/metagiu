import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './config.module.scss';

const TYPES = Object.freeze({
    LABEL:  'label',
    TEXT:   'text',
    SUBMIT: 'submit'
});

const stringMatcher = new RegExp(/^".+"$/);

const LabelElement = props => <label>{props.value}</label>;
const TextElement = props => <input name={props.name} value={props.data[props.name] || ''} onChange={props.onChange} autoComplete='off' />;
const SubmitElement = props => <input type="submit" value={props.value || 'submit'} onClick={props.onSubmit} />;
const ExpressionElement = ({data = {}, formula}) => {
    const tokens = formula
        .trim()
        .substr(1)
        .split('+')
        .map(t => t.trim());
    let text = '';
    tokens.forEach(t => {
        const isString = stringMatcher.test(t);
        text += isString
            ? t.slice(1, -1)  // remove quotes
            : data[t] || ''
    });
    return (
        <input type="text" value={text} readOnly/>
    )
};

export class MetaForm extends Component {

    static propTypes = {
        code: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            data:     {},
            elements: [],
            code:     ''
        }
    }

    static tokenize(code) {
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
                        return () => null;
                }
            });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.code === state.code) return null;
        const elements = MetaForm.tokenize(props.code);
        return {
            data: {}, // kill previously entered names
            elements,
            code: props.code
        }
    }
    onElChange = e => {
        e.stopPropagation();
        const data = {
            ...this.state.data,
            [e.target.name]: e.target.value
        };
        this.setState({data});
    };
    render() {
        const Elements = this.state.elements
            .map((El, index) =>
                <div className={style.formElement}  key={index}>
                    <El onChange={this.onElChange} data={this.state.data}/>
                </div>
            );
        return (
            <form className={style.form}>
                {Elements}
            </form>
        )
    }
}