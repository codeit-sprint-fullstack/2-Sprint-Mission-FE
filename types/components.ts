import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface ButtonProps {
    $pill?: boolean,
    $appearance?: string,
}

export interface ConfirmModalProps {
    content: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onReject?: () => void;
}

export interface DeleteButtonProps {
    onClick: () => void;
    label: string;
}

export interface DropdownMenuProps {
    onSortSelection: (sortType: string) => void;
}

export interface ImageUploadProps {
    id: string;
    label: string;
    value: string[];
    onChange: (newValue: string[]) => void;
}

export interface InputItemProps {
    id?: string;
    label: string;
    error?: string;
    register?: React.InputHTMLAttributes<HTMLInputElement>;
    value?: string | number;
    placeholder: string;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface LineDividerProps {
    $margin?: string;
}

export interface PaginationBarProps {
    totalPageNum: number;
    activePageNum: number;
    onPageChange: (pageNum: number) => void;
}

export interface SimpleModalProps {
    isOpen: boolean;
    text?: string;
    onClose: () => void;
}

export interface ModalProps extends SimpleModalProps {
    closeButton?: boolean;
    children: ReactNode;
}

export interface TagInputProps {
    label?: string;
    value: string[];
    onChange: (tags: string[]) => void;
}

export interface TextareaItemProps {
    id: string;
    label?: string;
    error?: string;
    register?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder: string;
}

export interface Option {
    value: string;
    label?: string;
}

export interface ToggleMenuProps {
    className: string;
    children: React.ReactNode;
    options: Option[];
    onSelect: (option: Option) => void;
}

export interface PasswordInputProps {
    id: string;
    label: string;
    error?: string;
    register?: any;
    placeholder?: string;

}

export interface SocialLoginLinkProps {
    name: string;
    url: string;
    logoSrc: string | StaticImageData;
}

export interface LikeButtonProps {
    isFavorite: boolean | undefined;
    favoriteCount: number;
    onClick: () => void;
}