import { MouseEvent } from 'react';
import Delete from './Delete.jsx';
import styles from '@/styles/RegisPage.module.css';

function Tags({ tags, setValues }: {
	tags: string[],
	setValues: (value: any) => void
}) {

	const handleDeleteTag = (e: MouseEvent<HTMLButtonElement>, tagToBeDel: string) => {
		setValues((draft: { tags: string[] }) => ({ ...draft, tags: tags.filter(tag => tag !== tagToBeDel) }));
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
