export class CssClass {
	classes: string[];

	constructor(classNames: string[]) {
		this.classes = [...classNames];
	}

	add = (className: string) => {
		this.classes.push(className)
	};

	css = (): string => this.classes.join(' ');
}
