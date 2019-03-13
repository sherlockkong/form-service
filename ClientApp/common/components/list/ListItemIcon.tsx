import * as React from 'react';
import * as classNames from 'classnames';

export type ListItemIconClassKey = {
    root?: string,
}

export type ListItemIconProps = {
    // The content of the component, normally `Icon`.
    children?: React.ReactElement<any>;
    // Useful to extend the style applied to components.
    classes?: ListItemIconClassKey;
    // Additional classes.
    className?: string;
    // If `true`, compact vertical padding designed for keyboard and mouse input will be used.
    dense?: boolean;
}

/**
 * A simple wrapper to apply `List` styles to an `Icon`.
 */
export const ListItemIcon: React.SFC<ListItemIconProps> = (props) => {
    const { children, classes: classesProp, className: classNameProp, dense, ...other } = props;

    const classes = {
        root: 'ef-list-group-item-icon',
        ...classesProp,
    };

    return React.cloneElement(children, {
        className: classNames(classes.root, classNameProp, children.props.className),
        ...other,
    });
}
