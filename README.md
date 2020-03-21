# MetaGUI

The task - make configurable form.

First section - textarea, where the user inputs the declarative description of the from.

Second section - the form, built by the descritpion. 

## Usecase

User inputs the next:

```
label: name
text: NAME 
label: greeting
text: = "Hello " + NAME + " !"
submit: SUBMIT
```

The `label`, `text`, `submit` - allowed types of elements.
`Hello`, `SUBMIT` - text.
`NAME` - id/value of the texxt input

The only allowed operator is `+`

## Render

```
name
---------------
| Chase       |
----------------

greeting
----------------
| Hello Chase ! |
----------------
-------------
| SUBMIT |
-------------
```

This project was bootstrapped with Create React App (https://github.com/facebook/create-react-app).
So all commands are valid.
Clone and start
