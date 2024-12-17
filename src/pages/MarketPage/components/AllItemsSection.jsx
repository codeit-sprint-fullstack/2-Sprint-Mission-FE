import React, { useState } from "react";
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/products";
import ItemCard from "./ItemCard";
import DropdownMenu from "../../../components/UI/DropdownMenu";
import PaginationBar from "../../../components/UI/PaginationBar";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";
import { ReactComponent as Spinner } from "../../../assets/images/ui/spinner.svg";
import styled from "styled-components";

/**
  피그마 디자인에는 반응형 디자인의 경우 한 줄에 5개, 3개, 2개로 나와있지만
  페이지당 개수를 작게하려고 (30개씩 불러와야 함)
  4개 3개 2개로 디자인을 생각하고
  공배수인 12개씩 불러왔습니다
*/
const PAGE_SIZE = 12;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const StyledSpinner = styled(Spinner)`
  width: 64px;
  height: 64px;
  color: ${({ theme }) => theme.colors.gray[1]};
`;

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["products", page, orderBy, keyword],
    queryFn: () =>
      getProducts({
        orderBy,
        page,
        pageSize: PAGE_SIZE,
        keyword,
      }),
    placeholderData: keepPreviousData, // 페이지 이동시 데이터 유지
    refetchInterval: 60 * 1000, // 1분마다 데이터를 새로 받아온다
  });

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
    /*
      검색어와 함께 없는 페이지를 요청하는 경우가 있으므로 무조건 1 페이지로 옮긴다
    */
    setPage(1);
  };

  return (
    <div className="allItemsContainer">
      <div className="allItemsSectionHeader">
        <h2 className="sectionTitle">판매 중인 상품</h2>
        <Link to="/registration" className="loginLink button">
          상품 등록하기
        </Link>
      </div>

      <div className="allItemsSectionHeader">
        <div className="searchBarWrapper">
          <SearchIcon />
          <input
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
            value={keyword}
            onChange={handleSearch}
          />
        </div>
        <DropdownMenu onSortSelection={setOrderBy} />
      </div>

      {!data && isFetching && ( // 처음 로딩할 때만 스피너 보여주기
        <SpinnerContainer>
          <StyledSpinner />
        </SpinnerContainer>
      )}
      {data && (
        <>
          <div className="allItemsCardSection">
            {data.list.map((item) => (
              <Link to={`/items/${item.id}`}>
                <ItemCard item={item} key={`market-item-${item.id}`} />
              </Link>
            ))}
          </div>

          <div className="paginationBarWrapper">
            <PaginationBar
              totalPageNum={Math.ceil(data.totalCount / PAGE_SIZE)}
              activePageNum={page}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default AllItemsSection;
