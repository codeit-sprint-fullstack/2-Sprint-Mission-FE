export interface Comment {
    id?: number;
    content?: string;
    writer?: {
        id: number;
        nickname: string;
        image?: string | null;
    };
    updatedAt?: string;
}

export interface CommentFormProps {
    defaultValue: string;
    submitLabel?: string;
    onSubmit: (content: string) => Promise<void>,
    onCancel?: () => void,
}

export interface CommentFormValue {
    content: string;
}

export interface CommentItemProps {
    comment: Comment;
    onSubmit: () => void;
}

export interface CommentThreadProps {
    productId: number;
}

