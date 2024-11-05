import Delete from './Delete.jsx';
import styles from '@/styles/RegisPage.module.css';

function Images({ name, images, setValues }) {

	const handleDeleteImage = (e, image) => {
		setValues(draft => ({ ...draft, images: images.filter(img => img !== image) }));
	};

	return (
		<ul className={styles.images_list}>
			{images.map(image => {
				return (
					<li key={image} className={styles.img_container}><img src={image} alt={name}/><button className={styles.delete} onClick={(e) => handleDeleteImage(e, image)}><Delete/></button></li>
				);
			})}
		</ul>
	);
}

export default Images;
