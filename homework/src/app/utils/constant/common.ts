export type YesOrNo = 'Y' | 'N'
export type StatusDBD = 'NEW' | 'EXISTING' | 'REMOVED'

export interface RegularHttpHeaderReq{
    reqID: string;
    reqChannel: string;
    reqDtm: string;
    reqBy: string;
    service: string;
}

export interface RegularHttpHeaderResponse{
    reqDtm: string;
    reqID: string;
    service: string;
    statusCd: string
    statusDesc: string
    txnRefID: string
}

export interface LimitOffsetPaginationResult<T>{
    totalElements: number
    results: T
}