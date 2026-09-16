import { Controller, HttpCode, Param, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadPipe } from '../pipes/image-upload/image-upload.pipe';
import { AuthGuard } from '../Auth/AuthGuard.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/Users/RoleGuard.guard';
import { UserRole } from 'src/Users/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('FilesUpload')
@ApiBearerAuth()
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService
  ) { }

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @HttpCode(200)
  async uploadFileController(@Param('id', new ParseUUIDPipe()) id: string, @UploadedFile(ImageUploadPipe) file: Express.Multer.File) {
    return await this.fileUploadService.uploadFileAndLinkToProductService(id, file)
  }
}
