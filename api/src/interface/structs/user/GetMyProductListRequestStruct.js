import {
    coerce,
    optional,
    object,
    integer,
    string,
    min,
    max,
    enums,
    nonempty,
    defaulted,
} from 'superstruct';

export const GetMyProductListRequestStruct = object({
    page: defaulted(
        coerce(min(integer(), 0), string(), (value) => Number.parseInt(value, 10)),
        1,
    ),
    pageSize: defaulted(
        coerce(max(min(integer(), 1), 10), string(), (value) => Number.parseInt(value, 10)),
        10,
    ),
    keyword: optional(nonempty(string())),
});
