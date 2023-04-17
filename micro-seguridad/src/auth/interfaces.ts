type TypeChildren = JSX.Element | JSX.Element[];

export interface Props {
	children: TypeChildren;
}

interface ISubmitLogin {
	email: string;
	password: string;
}

export type SubmitLogin = Readonly<ISubmitLogin>;