export interface ResponsePayload{
    status: ResponseStatus,
    monthlyPremium: number
}

export interface ResponseStatus{
    code: number,
    type: ResponseType,
    message: string
}

export enum ResponseType{
    Success,
    BusinessException,
    SystemException
}