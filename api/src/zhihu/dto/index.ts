export class zhihuDTO {
    readonly url: string
    readonly meun_id: number
}
export class listParamDTO {
    readonly pageSize: number
    readonly pageIndex: number
}
export class editCategroyDTO {
    readonly id: number
    readonly meun_id: number
}
export class deleteArticleDTO {
    readonly id:number
}
export class returnData {
    readonly title: string
    readonly articleThumbnail: string
    readonly meun_id: number
    readonly article_id: string
    readonly introduction: string
}