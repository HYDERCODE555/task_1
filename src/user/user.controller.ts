import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) : Promise<{ message: string, token?: string }>{
        return await this.userService.signUp(signUpDto)
    }

    @Post('/login')
    async login(@Body(ValidationPipe) loginDto: LoginDto ) : Promise<{message:string}>{
        return await this.userService.login(loginDto)
    }

    @Get('/:id')
    async getUserById(@Param('id' , ParseIntPipe) id: number) {
        return this.userService.getById(id);
    }

}
