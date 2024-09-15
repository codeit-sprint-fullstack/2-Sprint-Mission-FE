import { useMemo } from 'react';

function useButtonStyle(isFormValid, isSubmitting = false) {

  const buttonStyle = useMemo(() => ({
    backgroundColor: !isFormValid || isSubmitting ? '#9CA3AF' : '#3692FF',
    color: !isFormValid || isSubmitting ? '#FFFFFF' : '#F3F4F6',
    fontSize: '1.6rem',
    fontWeight: '600',
    cursor: !isFormValid || isSubmitting ? 'not-allowed' : 'pointer',
  }), [isFormValid, isSubmitting]);

  return buttonStyle;
}

export default useButtonStyle;
