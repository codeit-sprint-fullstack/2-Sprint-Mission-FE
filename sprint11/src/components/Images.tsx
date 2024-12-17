import { MouseEvent } from 'react';
import Delete from './Delete.tsx';
import styles from '@/styles/RegisPage.module.css';
import Image from 'next/image';

function Images({ name, images, setValues }: {
	name: string;
	images: string[];
	setValues: (fn: (draft: {images: string[]}) => { images: string[] }) => void
}) {

	const handleDeleteImage = (e: MouseEvent, image: string) => {
		setValues(draft => ({ ...draft, images: images.filter(img => img !== image) }));
	};

	return (
		<ul className={styles.images_list}>
			{images?.map(image => {
				return (
					<li key={image} className={styles.img_container}><Image fill src={image} alt={name}/><button className={styles.delete} onClick={(e) => handleDeleteImage(e, image)}><Delete/></button></li>
				);
			})}
		</ul>
	);
}

export default Images;
