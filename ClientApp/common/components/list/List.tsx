import * as React from 'react';
import * as classNames from 'classnames';

export type ListClassKey = {
    root?: string,
    padding?: string,
    dense?: string,
    subheader?: string,
}

export type ListProps = {
    // The content of the component.
    children?: React.ReactNode;
     // Useful to extend the style applied to components.
    classes?: ListClassKey;
    // Additional classes.
    className?: string; 
    // The component used for the root node. Either a string to use a DOM element or a component.
    component?: React.ReactType<ListProps>; 
    // If `true`, compact vertical padding designed for keyboard and mouse input will be used for
    // the list and list items. The property is available to descendant components as the
    // `dense` context.
    dense?: boolean;
    // If `true`, vertical padding will be removed from the list.
    disablePadding?: boolean; 
    // The content of the subheader, normally `ListSubheader`.
    subheader?: React.ReactElement<any>; 
}

export class List extends React.Component<ListProps & React.HTMLAttributes<HTMLUListElement>> {

    public static defaultProps: Partial<ListProps> = {
        component: 'ul',
        dense: false,
        disablePadding: false,
    };

    public render() {
        const {
            children,
            className: classNameProp,
            classes: classesProp,
            component: Component,
            dense,
            disablePadding,
            subheader,
            ...other
        } = this.props;

        const classes = {
            root: 'ef-list-group',
            padding: 'ef-list-group--padding',
            dense: 'ef-list-group--dense',
            subheader: 'ef-list-group--subheader',
            ...classesProp,
        };

        const className = classNames(
            classes.root,
            {
                [classes.dense]: dense && !disablePadding,
                [classes.padding]: !disablePadding,
                [classes.subheader]: subheader,
            },
            classNameProp,
        );

        // Transferring `dense` prop
        const renderChildren = () => React.Children.map(children, (child, index) =>
            children[index] && children[index].props && children[index].props.hasOwnProperty('dense')
                ? React.cloneElement(child as React.ReactElement<any>, { dense })
                : React.cloneElement(child as React.ReactElement<any>)
        );

        return (
            <Component className={className} {...other}>
                {subheader}
                {renderChildren()}
            </Component>
        );
    }
}
