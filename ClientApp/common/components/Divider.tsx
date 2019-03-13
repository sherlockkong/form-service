import * as React from 'react';
import * as classNames from 'classnames';

export type DividerClassKey = {
    root?: string,
    absolute?: string,
    inset?: string,
    inverted?: string,
}

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
    absolute?: boolean;
    // The component used for the root node. Either a string to use a DOM element or a component.
    component?: React.ReactType<DividerProps>;
    // If `true`, the divider will be indented.
    inset?: boolean;
    // Useful to extend the style applied to components.
    classes?: DividerClassKey;
    // Additional classes.
    className?: string;
    // If `true`, the divider will have an inverted color.
    inverted?: boolean;
}

const Divider: React.SFC<DividerProps> = (props) => {

    const {
        absolute,
        classes: classesProp,
        className: classNameProp,
        component: Component,
        inset,
        inverted,
        ...other
    } = props;

    // Default classes
    const classes = {
        root: 'ef-divider',
        inset: 'ef-divider--inset',
        inverted: 'ef-divider--inverted',
        absolute: 'ef-divider--absolute',
        ...classesProp,
    };

    const className = classNames(
        classes.root,
        {
            [classes.absolute]: absolute,
            [classes.inset]: inset,
            [classes.inverted]: inverted,
        },
        classNameProp,
    );
    
    return <Component className={className} {...other} />;
}

Divider.defaultProps = {
    absolute: false,
    component: 'hr',
    inset: false,
    inverted: false,
};

export { Divider };
