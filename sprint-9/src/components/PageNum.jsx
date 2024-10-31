import styles from '../pages/ItemsPage.module.css';

function PageNum({page, setPage, pageMax}) {
	return (
	<div className={styles.pagenation} onClick={function (event) {
		const pages = event.currentTarget.querySelectorAll("div");
			const target = event.target;
			const targetN = Number(target.innerText);
			if (isNaN(targetN)) {
				if (!target.classList.contains("disabled")) {
					if (target.innerText === "&lt;" || target.innerText === "<") {
						const pageNumCandi = Number(pages[1].innerText) - 1;
						setPage(pageNumCandi <= 1 ? 1 : pageNumCandi);
					}
					else if (target.innerText === "&gt;" || target.innerText === ">") {
						const pageNumCandi = Number(pages[pages.length - 2].innerText) + 1;
						setPage(pageNumCandi >= pageMax ? pageMax : pageNumCandi);
					}
				}
			}
			else {
				setPage(targetN);
			}
	}}>
		<div>&lt;</div>
		{(page <= 1) ?
		<><div className={styles.selected}>1</div>{pageMax >= 2 && <div>2</div>}{pageMax >= 3 && <div>3</div>}{pageMax >= 4 && <div>4</div>}{pageMax >= 5 && <div>5</div>}</>
		:(page <= pageMax && page === 2) ?
		<><div>1</div><div className={styles.selected}>2</div>{pageMax >= 3 && <div>3</div>}{pageMax >= 4 && <div>4</div>}{pageMax >= 5 && <div>5</div>}</>
		:(page <= pageMax && page === 3) ?
		<><div>1</div><div>2</div><div className={styles.selected}>3</div>{pageMax >= 4 && <div>4</div>}{pageMax >= 5 && <div>5</div>}</>
		:(page < pageMax - 2 && page > 3) ?
		<><div>{page - 2}</div><div>{page - 1}</div><div className={styles.selected}>{page}</div><div>{page + 1}</div><div>{page + 2}</div></>
		:(page === pageMax - 2) ?
		<><div>{page - 2}</div><div>{page - 1}</div><div className={styles.selected}>{page}</div><div>{page + 1}</div><div>{page + 2}</div></>
		:(page === pageMax - 1) ?
		<><div>{page - 3}</div><div>{page - 2}</div><div>{page - 1}</div><div className={styles.selected}>{page}</div><div>{page + 1}</div></>
		:<><div>{pageMax - 4}</div><div>{pageMax - 3}</div><div>{pageMax - 2}</div><div>{pageMax - 1}</div><div className={styles.selected}>{pageMax}</div></>}
		<div>&gt;</div>
	</div>);
}

export default PageNum;
