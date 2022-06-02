import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './login.dto';
import { User } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  public async root() {
    return { hi: 'active auth' };
  }

  @Post('register')
  public async registerUser(@Body() user: User): Promise<any> {
    var response = await this.authService.registerUser(user);
    return response;
  }

  @Post('login')
  public async login(@Body() userLogin: Login): Promise<any> {
    var response = await this.authService.loginUser(userLogin);
    return response;
  }
}
