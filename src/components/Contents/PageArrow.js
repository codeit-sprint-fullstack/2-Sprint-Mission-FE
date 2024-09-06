import './style/PageArrow.css';
function PageArrow({children, onChangePageGroup, pageInfo}){
    const handleChangeGroup = ()=>{
        onChangePageGroup();
    };
    return <button className=".arrow-button"onClick={handleChangeGroup} >{children}</button>
}
export default PageArrow;