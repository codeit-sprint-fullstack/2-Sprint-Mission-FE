import styles from './pages/ItemsPage.module.css';

function PageNum({pageNum, setPageNum, pageNumMax}) {
	return (
	<div className={styles.pagenation} onClick={function (event) {
		const pages = event.currentTarget.querySelectorAll("div");
			const target = event.target;
			const targetN = Number(target.innerText);
			if (isNaN(targetN)) {
				if (!target.classList.contains("disabled")) {
					if (target.innerText === "&lt;" || target.innerText === "<") {
						const pageNumCandi = Number(pages[1].innerText) - 1;
						setPageNum(pageNumCandi <= 1 ? 1 : pageNumCandi);
					}
					else if (target.innerText === "&gt;" || target.innerText === ">") {
						const pageNumCandi = Number(pages[pages.length - 2].innerText) + 1;
						setPageNum(pageNumCandi >= pageNumMax ? pageNumMax : pageNumCandi);
					}
				}
			}
			else {
				setPageNum(targetN);
			}
	}}>
		<div className={pageNum <= 3 ? styles.disabled : ""}>&lt;</div>{(pageNum <= 1) ?
		<><div className={styles.selected}>1</div>{pageNumMax >= 2 && <div>2</div>}{pageNumMax >= 3 && <div>3</div>}{pageNumMax >= 4 && <div>4</div>}{pageNumMax >= 5 && <div>5</div>}<div className={pageNumMax <= 5 ? styles.disabled : ""}>&gt;</div></>
		:(pageNum <= pageNumMax && pageNum === 2) ?
		<><div>1</div><div className={styles.selected}>2</div>{pageNumMax >= 3 && <div>3</div>}{pageNumMax >= 4 && <div>4</div>}{pageNumMax >= 5 && <div>5</div>}<div className={pageNumMax <= 5 ? styles.disabled : ""}>&gt;</div></>
		:(pageNum <= pageNumMax && pageNum === 3) ?
		<><div>1</div><div>2</div><div className={styles.selected}>3</div>{pageNumMax >= 4 && <div>4</div>}{pageNumMax >= 5 && <div>5</div>}<div className={pageNumMax <= 5 ? styles.disabled : ""}>&gt;</div></>
		:(pageNum < pageNumMax - 2 && pageNum > 3) ?
		<><div>{pageNum - 2}</div><div>{pageNum - 1}</div><div className={styles.selected}>{pageNum}</div><div>{pageNum + 1}</div><div>{pageNum + 2}</div><div>&gt;</div></>
		:(pageNum === pageNumMax - 2) ?
		<><div>{pageNum - 2}</div><div>{pageNum - 1}</div><div className={styles.selected}>{pageNum}</div><div>{pageNum + 1}</div><div>{pageNum + 2}</div><div className={styles.disabled}>&gt;</div></>
		:(pageNum === pageNumMax - 1) ?
		<><div>{pageNum - 3}</div><div>{pageNum - 2}</div><div>{pageNum - 1}</div><div className={styles.selected}>{pageNum}</div><div>{pageNum + 1}</div><div className={styles.disabled}>&gt;</div></>
		:<><div>{pageNumMax - 4}</div><div>{pageNumMax - 3}</div><div>{pageNumMax - 2}</div><div>{pageNumMax - 1}</div><div className={styles.selected}>{pageNumMax}</div><div className={styles.disabled}>&gt;</div></>}
	</div>);
}

export default PageNum;
