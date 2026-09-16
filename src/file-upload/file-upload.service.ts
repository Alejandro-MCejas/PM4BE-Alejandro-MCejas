import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { ProductsService } from '../Products/products.service';

@Injectable()
export class FileUploadService {
    constructor(private readonly cloudinaryService: CloudinaryService,
        private readonly productsService: ProductsService
    ) { }

    async uploadFileAndLinkToProductService(id: string, file: Express.Multer.File) {
        const url = await this.uploadFileService({
            fieldname: file.fieldname,
            buffer: file.buffer,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size
        })

        await this.productsService.uploadImageService(id, url)
        return { imgUrl: url }
    }

    async uploadFileService(file: UploadFileDto) {
        return this.cloudinaryService.uploadFile(file.buffer, file.originalname)
    }
}
