import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto } from './dto/CategoryResponseDto.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  @ApiOkResponse({
    type: CategoryResponseDto,
    isArray: true,
  })
  async getCategoriesController() {
    return await this.categoriesService.getCategoriesService();
  }
}
