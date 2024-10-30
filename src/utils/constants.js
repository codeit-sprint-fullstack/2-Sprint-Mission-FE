export default class CONSTANTS {
  static BEST_PRODUCT_PAGE_SIZE = Object.freeze({
    PC: 4,
    TABLET: 2,
    MOBILE: 1,
  });
  static PRODUCT_PAGE_SIZE = Object.freeze({
    PC: 10,
    TABLET: 6,
    MOBILE: 4,
  });
  static BEST_ARTICLE_PAGE_SIZE = Object.freeze({
    PC: 3,
    TABLET: 0,
    MOBILE: 0,
  });
  static ARTICLE_PAGE_SIZE = Object.freeze({
    PC: 5,
    TABLET: 0,
    MOBILE: 0,
  });
  static BUNDLE_SIZE = 5;
  static SORT_ORDER = Object.freeze({
    RECENT: 'recent',
    LIKE: 'like',
  });
  static SORT_ORDER_MSG = Object.freeze({
    [this.SORT_ORDER.RECENT]: '최신순',
    [this.SORT_ORDER.LIKE]: '좋아요순',
  });
  static MODIFY = Object.freeze({
    EDIT: 'edit',
    DELETE: 'delete',
  });
  static MODIFY_MSG = Object.freeze({
    [this.MODIFY.EDIT]: '수정하기',
    [this.MODIFY.DELETE]: '삭제하기',
  });
  static VIEWPORT = Object.freeze({
    PC: 'PC',
    TABLET: 'TABLET',
    MOBILE: 'MOBILE',
  });
  static BREAKPOINTS = Object.freeze({
    MOBILE: 743,
    TABLET: 1199,
  });
  static EMPTY_INPUT_OBJ = Object.freeze({
    value: '',
    name: '',
    type: '',
    errMsg: '',
  });
  static HTTP_STATUS = Object.freeze({
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  });
}
