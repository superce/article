export class zhihuDTO {
    readonly url: string
    readonly categroy_id: number
    readonly meun_id: number
}
export class listParamDTO {
    readonly pageSize: number
    readonly pageIndex: number
}
export class editCategroyDTO {
    readonly id: number
    readonly categroy_id: number
}
export class deleteArticleDTO {
    readonly id:number
}