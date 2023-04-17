import { ChangeEvent } from 'react';

export type Submit<T> = (model: T) => void;
export type Event = ChangeEvent<HTMLInputElement>;
export type EventTextarea = ChangeEvent<HTMLTextAreaElement>;

export type HandleSubmit<T> = (onSubmit: Submit<T>) => (e: Event) => void;
export type HandleChange<T> = (e: Event, setForm: (state: T) => void, form: T) => void;
export type HandleChangeTextarea<T> = (e: EventTextarea, setForm: (state: T) => void, form: T) => void;

export type ITypeInput = Record<string, string | boolean>;

export interface Form<T, K> {
	handleSubmit: HandleSubmit<T>;
	handleChange: HandleChange<T>;
	handleChangeTextarea: HandleChangeTextarea<T>;
	setValuesDefault: (name: string, value: string | number | boolean) => void;
	validateFields: (model: T, fieldRequerids: K[]) => boolean;
	errors: K[];
	setSelect: (name: string, value: string | number | boolean, setForm: (state: T) => void, form: T) => void;
	model: T;
	setModel: (value: T) => void;
}