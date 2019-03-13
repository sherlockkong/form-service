import * as React from 'react';
import * as classNames from 'classnames';

export type ListItemTextClassKey = {
    root?: string,
    inset?: string,
    dense?: string,
    primary?: string,
    secondary?: string,
    textDense?: string,
}

export type ListItemTextProps = {
    // Alias for the `primary` property.
    children?: React.ReactNode;
    // Useful to extend the style applied to components.
    classes?: ListItemTextClassKey;
    // Additional classes.
    className?: string;
    // If `true`, compact vertical padding designed for keyboard and mouse input will be used.
    dense?: boolean;
    // If `true`, the children won't be wrapped by a typography component.
    disableTypography?: boolean;
    // If `true`, the children will be indented.
    // This should be used if there is no left avatar or left icon.
    inset?: boolean,
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
}

export class ListItemText extends React.Component<ListItemTextProps, any> {

    public static defaultProps: Partial<ListItemTextProps> = {
        disableTypography: false,
        dense: false,
        inset: false,
    };

    public render() {
        const {
            children,
            classes: classesProp,
            className: classNameProp,
            disableTypography,
            dense,
            inset,
            primary: primaryProp,
            secondary: secondaryProp,
            ...other
        } = this.props;

        const classes = {
            root: 'ef-list-group-item-text',
            dense: 'ef-list-group-item-text--dense',
            inset: 'ef-list-group-item-text--inset',
            primary: 'ef-list-group-item-text--primary',
            secondary: 'ef-list-group-item-text--secondary',
            textDense: 'ef-list-group-item-text--td',
            ...classesProp,
        };

        let primary = primaryProp || children;
        if (primary && !disableTypography) {
          primary = (
            <h6 className={classNames(classes.primary, { [classes.textDense]: dense })}>
              {primary}
            </h6>
          );
        }
      
        let secondary = secondaryProp;
        if (secondary && !disableTypography) {
          secondary = (
            <p className={classNames(classes.secondary, {[classes.textDense]: dense })}>
              {secondary}
            </p>
          );
        }

        return (
            <div
                className={classNames(
                    classes.root,
                    {
                        [classes.dense]: dense,
                        [classes.inset]: inset,
                    },
                    classNameProp,
                )}
                {...other}
            >
                {primary}
                {secondary}
            </div>
        );
    }
}
