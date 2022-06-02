import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Role } from 'src/rbac/enum/role.enum';
import { Roles } from 'src/rbac/request.decorator';
import { JwtAuthGuard } from 'src/rbac/request.guard';
import { UserDetailsService } from './userdetails.service';

@Controller('/user')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailsService) {}

  @Get('/')
  async getAllUsers(): Promise<any> {
    var response = await this.userDetailService.getAllUsers();
    return response;
  }

  //localhost:3939/user/cl3wk8u8q0000h214lumw9ha9
  @Get('/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getUserDetails(@Param('id') id: string): Promise<any> {
    var response = await this.userDetailService.getUserDetails(id);
    return response;
  }
}
