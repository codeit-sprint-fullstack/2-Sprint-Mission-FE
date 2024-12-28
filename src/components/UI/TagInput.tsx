import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputItem from "./InputItem";
import { FlexContainer } from "../../styles/CommonStyles";
import DeleteButton from "./DeleteButton";
import { TagInputProps } from "../../../types/components";

const TagButtonsSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap; 
`;

const Tag = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.colors.gray[2]};
  color: ${({ theme }) => theme.colors.black};
  padding: 14px 14px 14px 16px;
  border-radius: 999px;
  min-width: 100px;
`;

const TagText = styled.span`
  font-size: 16px;
  line-height: 24px;
  margin-right: 8px;
  max-width: calc(100% - 28px); 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;


function TagInput({ value, onChange }: TagInputProps) {
  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string[]>(value);
  const [error, setErrors] = useState<string>("");

  const addTag = (tag: string) => {
    const nextTags = [...tags];
    if (!tags.includes(tag)) {
      nextTags.push(tag);
    }
    onChange(nextTags);
  };

  const removeTag = (tagToRemove: string) => {
    const nextTags = tags.filter((tag) => tag !== tagToRemove);
    onChange(nextTags);
  };


  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    const inputString = text.trim();
    if (event.key === "Enter") {
      event.preventDefault();

      if (inputString && !error) {
        addTag(inputString);
        setText("");
      }
    }
  };

  const validateTag = (newTag: string) => {
    if (newTag.length > 5) {
      setErrors((prev) => "태그는 5글자 이내로 입력해주세요.");
    } else {
      setErrors((prev) => "");
    }
  };

  useEffect(() => {
    setTags(value);
  }, [value]);

  return (
    <div>
      <InputItem
        label="태그"
        value={text}
        placeholder="태그를 입력해 주세요"
        onKeyDown={handlePressEnter}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
          validateTag(e.target.value);
        }}
        error={error}
      />

      {tags?.length > 0 && (
        <TagButtonsSection>
          {tags.map((tag) => (
            <Tag key={`tag-${tag}`}>
              <TagText>{tag}</TagText>

              <DeleteButton
                onClick={() => removeTag(tag)}
                label={`${tag} 태그`}
              />
            </Tag>
          ))}
        </TagButtonsSection>
      )}
    </div>
  );
}

export default TagInput;
