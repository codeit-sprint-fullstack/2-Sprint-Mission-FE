import { Dispatch, MouseEvent, SetStateAction } from 'react';
import Delete from './Delete.tsx';
import styles from '@/styles/RegisPage.module.css';

function Tags({ tags, setValues }: {
	tags: string[],
	setValues: Dispatch<SetStateAction<{
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    tags: string[];
    favoriteCount: number;
    createdAt: Date;
    updatedAt: Date;
    owner: {
        id: number;
        nickname: string;
    };
    isFavorite: boolean;
	}>> | Dispatch<SetStateAction<{
    name: string;
    description: string;
    price: number;
    images: string[];
    tags: string[];
	}>>;
}) {

	const handleDeleteTag = (e: MouseEvent<HTMLButtonElement>, tagToBeDel: string) => {
		setValues((draft) => ({ ...draft, tags: tags.filter(tag => tag !== tagToBeDel) }));
	};

	return (
		<ul className={styles.tags_list}>
			{tags?.map(tag => {
				return (
					<li key={tag} className={styles.tag}><span className={styles.tag_name}>#{tag}</span><button className={styles.delete} onClick={(e) => handleDeleteTag(e, tag)}><Delete/></button></li>
				);
			})}
			<div className={styles.tag}></div>
		</ul>
	);
}

export default Tags;
