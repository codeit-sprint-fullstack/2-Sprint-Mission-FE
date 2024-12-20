import { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getProductComments } from "../../../api/products";
import { deleteComment, patchComment } from "../../../api/comments";
import { useAuth } from "../../../contexts/AuthContext";
import LineDivider from "../../../components/UI/LineDivider";
import ToggleMenu from "../../../components/UI/ToggleMenu";
import ConfirmModal from "../../../components/UI/ConfirmModal";
import CommentForm from "./CommentForm";
import { formatUpdatedAt } from "../../../utils/dateUtils";
import { ReactComponent as EmptyStateImage } from "../../../assets/images/ui/empty-comments.svg";
import { ReactComponent as SeeMoreIcon } from "../../../assets/images/icons/ic_kebab.svg";
import DefaultProfileImage from "../../../assets/images/ui/ic_profile.svg";
import { CommentItemProps } from "../../../../types/comments";
import { CommentThreadProps } from "../../../../types/comments";
import { Option } from "../../../../types/components";
const CommentContainer = styled.div`
  padding: 24px 0;
  position: relative;
`;

const StyledToggleMenu = styled(ToggleMenu)`
  position: absolute;
  right: 0;
`;

const CommentContent = styled.p`
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 24px;
`;

const AuthorProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Username = styled.p`
  color: var(--gray-600);
  font-size: 14px;
  margin-bottom: 4px;
`;

const Timestamp = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 12px;
`;

function CommentItem({ comment, onSubmit }: CommentItemProps) {
  const { user } = useAuth();
  const [mode, setMode] = useState<"view" | "edit" | "delete">("view"); // "view" | "edit" | "delete"

  const writer = comment.writer;
  const formattedTimestamp = formatUpdatedAt(comment.updatedAt);
  const isWriter = user && user.id === writer.id;
  const seeMoreOptions: Array<{ value: "edit" | "delete"; label: string }> = [
    { value: "edit", label: "수정" },
    { value: "delete", label: "삭제" },
  ];


  const handleToggleMenuSelect = (option: Option) => setMode(option.value as "edit" | "delete");

  const handleFormCancel = () => {
    setMode("view");
  };

  const handleFormSubmit = async (content: string) => {
    await patchComment(comment.id, { content });
    onSubmit();
    setMode("view");
  };

  const handleCommentDelete = async () => {
    await deleteComment(comment.id);
    onSubmit();
    setMode("view");
  };

  return (
    <>
      <CommentContainer>
        {mode === "edit" ? (
          <>
            <CommentForm
              defaultValue={comment.content}
              submitLabel="수정 완료"
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </>
        ) : (
          <>
            {isWriter && (
              <StyledToggleMenu
                className="styeldToggle"
                options={seeMoreOptions}
                onSelect={handleToggleMenuSelect}
              >
                <SeeMoreIcon />
              </StyledToggleMenu>
            )}

            <CommentContent>{comment.content}</CommentContent>
          </>
        )}

        <AuthorProfile>
          <UserProfileImage
            src={writer.image || DefaultProfileImage}
            alt={`${writer.nickname}님의 프로필 사진`}
          />

          <div>
            <Username>{writer.nickname}</Username>
            <Timestamp>{formattedTimestamp}</Timestamp>
          </div>
        </AuthorProfile>
      </CommentContainer>

      <ConfirmModal
        content="정말 삭제하시겠습니까?"
        isOpen={mode === "delete"}
        onConfirm={handleCommentDelete}
        onClose={() => setMode("view")}
      />

      <LineDivider $margin="0" />
    </>
  );
}

const EmptyStateContainer = styled.div`
  margin: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 16px;
  line-height: 24px;
`;

function EmptyState() {
  return (
    <EmptyStateContainer>
      <EmptyStateImage />
      <EmptyStateText>아직 문의가 없습니다.</EmptyStateText>
    </EmptyStateContainer>
  );
}

const ThreadContainer = styled.div`
  margin-bottom: 40px;
`;

function CommentThread({ productId }: CommentThreadProps) {
  const { data: comments, refetch } = useQuery<Comment[], Error>({
    queryKey: ["products", productId, "comments"],
    queryFn: () =>
      getProductComments({
        productId,
        params: {
          limit: 10,
        },
      }),
    enabled: !!productId,
  });

  if (!comments || comments.length === 0) {
    return <EmptyState />;
  } else {
    return (
      <ThreadContainer>
        {comments
          .filter((comment): comment is Comment =>
            typeof comment.id === 'number' &&
            typeof comment.content === 'string' &&
            comment.writer &&
            typeof comment.writer.id === 'number' &&
            typeof comment.writer.nickname === 'string'
          ) // 필터링 추가
          .map((comment) => (
            <CommentItem key={comment.id} comment={comment} onSubmit={refetch} />
          ))}
      </ThreadContainer>
    );
  }
}

export default CommentThread;
