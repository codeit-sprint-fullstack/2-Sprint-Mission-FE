import styled, { css } from 'styled-components';
import DeleteButton from './DeleteButton';
import Label from './Label';
import { ReactComponent as PlusIcon } from '../../assets/images/icons/ic_plus.svg';
import { uploadImage } from '../../api/images';


interface ImageUploadProps {
  id: string;
  label?: string;
  value?: string[];
  onChange: (value: string[]) => void;
}

const ImageUploadContainer = styled.div`
  display: flex;
  gap: 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 18px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    gap: 24px;
  }
`;

const squareStyles = css`
  width: calc(50% - 4px);
  max-width: 200px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    width: 162px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 282px;
  }
`;

const UploadButton = styled.label`
  background-color: ${({ theme }) => theme.colors.gray[1]};
  color: ${({ theme }) => theme.colors.gray[0]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }

  ${squareStyles}
`;

const ImagePreview = styled.div<{src: string}>`
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-position: center;
  position: relative;

  ${squareStyles}
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

function ImageUpload({ id, label, value = [], onChange }: ImageUploadProps) {
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const uploadedUrl = await uploadImage(file);
      onChange([...value, uploadedUrl]);
    }
  };

  const handleDelete = (idx: number) => {
    const nextValue = [...value.slice(0, idx), ...value.slice(idx + 1)];
    onChange(nextValue);
  };

  const uploadEnabled = value.length < 3;

  return (
    <div>
      {label && <Label>{label}</Label>}

      <ImageUploadContainer>
        {uploadEnabled && (
          <>
            <UploadButton htmlFor={id}>
              <PlusIcon />
              이미지 등록
            </UploadButton>

            <HiddenFileInput
              id={id}
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </>
        )}

        {value &&
          value.map((url, idx) => (
            <ImagePreview src={url}>
              <DeleteButtonWrapper>
                <DeleteButton
                  onClick={() => handleDelete(idx)}
                  label="이미지 파일"
                />
              </DeleteButtonWrapper>
            </ImagePreview>
          ))}
      </ImageUploadContainer>
    </div>
  );
}

export default ImageUpload;
