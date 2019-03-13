import * as React from 'react';
import * as classNames from 'classnames';

export type ListItemClassKey = {
    root?: string,
    dense?: string,
    divider?: string,
    gutters?: string,
    button?: string,
    container?: string,
}

export type ListItemProps = {
    // If 'true', the list item will be a button.
    button?: boolean;
    // The content of the component.
    children?: React.ReactNode;
    // Useful to extend the style applied to components.
    classes?: ListItemClassKey;
    // Additional classes.
    className?: string;
    // The component used for the root node. Either a string to use a DOM element or a component.
    component?: React.ReactType<ListItemProps>;
    // If `true`, compact vertical padding designed for keyboard and mouse input will be used.
    dense?: boolean;
    // If `true`, the item will be displayed in a disabled state.
    disabled?: boolean;
    // If `true`, the left and right padding is removed.
    disableGutters?: boolean;
    // If `true`, a 1px light border is added to the bottom of the list item.
    divider?: boolean;
}

export class ListItem extends React.Component<
    ListItemProps &
    React.LiHTMLAttributes<HTMLElement> &
    React.LinkHTMLAttributes<HTMLElement> &
    React.HTMLAttributes<HTMLDivElement>
> {

    public static defaultProps: Partial<ListItemProps> = {
        button: false,
        dense: false,
        disabled: false,
        disableGutters: false,
        divider: false,
    };

    public render() {
        const {
            button,
            children: childrenProp,
            classes: classesProp,
            className: classNameProp,
            component: componentProp,
            dense,
            disabled,
            disableGutters,
            divider,
            ...other
        } = this.props;

        const classes = {
            root: 'ef-list-group-item',
            button: 'ef-list-group-item-button',
            container: 'ef-list-group-item-container',
            dense: 'ef-list-group-item--dense',
            gutters: 'ef-list-group-item--gutters',
            divider: 'ef-list-group-item--divider',
            disabled: 'ef-list-group-item--disabled',
            ...classesProp,
        };

        const className = classNames(
            classes.root,
            {
                [classes.dense]: dense,
                [classes.gutters]: !disableGutters,
                [classes.divider]: divider,
                [classes.disabled]: disabled,
                [classes.button]: button,
            },
            classNameProp,
        );

        const componentProps = { className, disabled, ...other };
        let Container = componentProp || 'li';
        const Component = Container === 'li' ? 'div' : Container; // avoid nesting of li > li.

        const renderChildren = () => React.Children.map(childrenProp, child =>
            React.cloneElement(child as React.ReactElement<any>, { dense })
        );

        if (button) {
            if (Container === 'a') {
                Container = 'div'; // avoid nesting of a > a.
            }
        }
        
        return button ? (
            <Container className={classes.container}>
                <Component {...componentProps}>
                    {renderChildren()}
                </Component>
            </Container>
        ) : (
            <Container {...componentProps}>
                {renderChildren()}
            </Container>
        );
    }
}
