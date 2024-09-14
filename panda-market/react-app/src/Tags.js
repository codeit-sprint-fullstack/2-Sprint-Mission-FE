import Delete from './Delete.js';
import styles from './pages/RegisPage.module.css';

function Tags({ tags, setValues }) {

	const handleDeleteTag = (e, tagToBeDel) => {
		setValues(draft => ({ ...draft, tags: tags.filter(tag => tag !== tagToBeDel) }));
	};

	return (
		<ul className={styles.tags_list}>
			{tags.map(tag => {
				return (
					<li key={tag} className={styles.tag}><span className={styles.tag_name}>#{tag}</span><button className={styles.delete} onClick={(e) => handleDeleteTag(e, tag)}><Delete/></button></li>
				);
			})}
			<div className={styles.tag}></div>
		</ul>
	);
}

export default Tags;
