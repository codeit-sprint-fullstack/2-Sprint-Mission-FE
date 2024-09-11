import { useEffect, useRef } from 'react';

function PageNum({pageNum, setPageNum, pageNumMax}) {
	return (
	<div className="pagenation" onClick={function (event) {
		const pages = event.currentTarget.querySelectorAll("div");
			const target = event.target;
			const targetN = Number(target.innerText);
			if (isNaN(targetN)) {
				if (!target.classList.contains("disabled")) {
					if (target.innerText === "&lt;" || target.innerText === "<") {
						setPageNum(Number(pages[1].innerText) - 1);
					}
					else if (target.innerText === "&gt;" || target.innerText === ">") {
						setPageNum(Number(pages[pages.length - 2].innerText) + 1);
					}
				}
			}
			else {
				setPageNum(targetN);
			}
	}}>
		{(pageNum <= 1) ?
		<><div className="disabled">&lt;</div><div className="selected">1</div>{pageNumMax >= 2 && <div>2</div>}{pageNumMax >= 3 && <div>3</div>}{pageNumMax >= 4 && <div>4</div>}{pageNumMax >= 5 && <div>5</div>}<div className={pageNumMax <= 5 ? `disabled` : ""}>&gt;</div></>
		:(pageNum <= pageNumMax && pageNum === 2) ?
		<><div className="disabled">&lt;</div><div>1</div><div className="selected">2</div>{pageNumMax >= 3 && <div>3</div>}{pageNumMax >= 4 && <div>4</div>}{pageNumMax >= 5 && <div>5</div>}<div className={pageNumMax <= 5 ? `disabled` : ""}>&gt;</div></>
		:(pageNum <= pageNumMax && pageNum === 3) ?
		<><div className="disabled">&lt;</div><div>1</div><div>2</div><div className="selected">3</div>{pageNumMax >= 4 && <div>4</div>}{pageNumMax >= 5 && <div>5</div>}<div className={pageNumMax <= 5 ? `disabled` : ""}>&gt;</div></>
		:(pageNum < pageNumMax - 2 && pageNum > 3) ?
		<><div>&lt;</div><div>{pageNum - 2}</div><div>{pageNum - 1}</div><div className="selected">{pageNum}</div><div>{pageNum + 1}</div><div>{pageNum + 2}</div><div>&gt;</div></>
		:(pageNum === pageNumMax - 2) ?
		<><div>&lt;</div><div>{pageNum - 2}</div><div>{pageNum - 1}</div><div className="selected">{pageNum}</div><div>{pageNum + 1}</div><div>{pageNum + 2}</div><div className="disabled">&gt;</div></>
		:(pageNum === pageNumMax - 1) ?
		<><div>&lt;</div><div>{pageNum - 3}</div><div>{pageNum - 2}</div><div>{pageNum - 1}</div><div className="selected">{pageNum}</div><div>{pageNum + 1}</div><div className="disabled">&gt;</div></>
		:<><div>&lt;</div><div>{pageNumMax - 4}</div><div>{pageNumMax - 3}</div><div>{pageNumMax - 2}</div><div>{pageNumMax - 1}</div><div className="selected">{pageNumMax}</div><div className="disabled">&gt;</div></>}
	</div>);
}

export default PageNum;
