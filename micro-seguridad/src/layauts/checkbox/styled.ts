import styled from "styled-components";

interface ILabel {
    borderColor: string | null;
    isAfter: boolean;
    isBeetween: boolean;
}

interface IInput {
    colorInput: string | null;
}

const afterBefore = (borderColor: string | null): string => (`
    content: "✓";
    border: 0.1em solid ${borderColor ?? '#CCC1F9'};
    border-radius: 0.2em;
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    color: transparent;
    transition: .2s;
    text-align: center;
    font-size: 13px;
`);

export const ContainerCheckbox = styled.div`
    margin-top: 20px;
`;

export const Input = styled.input<IInput>`
    display: none;

    &:checked + label::before {
        background-color: ${({ colorInput }) => colorInput ?? '#226EB5'};
        border-color: ${({ colorInput }) => colorInput ?? '#226EB5'};
        color: #fff;
    }

    &:disabled + label::before {
        transform: scale(1);
    }

    &:checked:disabled + label::before {
        transform: scale(1);
    }
`;

export const Label = styled.label<ILabel>`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: ${({ isBeetween }) => isBeetween ? 'space-between' : 'flex-start'};

    ${({ isAfter, borderColor }) => isAfter
        ? `
            &::after {
                ${afterBefore(borderColor)}
            }
        `
        : `
            &::before {
                ${afterBefore(borderColor)}
            }
        `
    }

    &:active::before {
        transform: scale(0);
    }

    span {
        margin-left: 10px;
        color: #424242;
        font-weight: bold;
    }
`;