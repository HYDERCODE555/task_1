import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUp } from './entities/signup.entities';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import * as jwt from "jsonwebtoken";
import { LoginDto } from './dto/login.dto';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(SignUp)
        private signUpRepository: Repository<SignUp>,
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{ message: string, token?: string }> {
        const { name, email, password, confirm_password } = signUpDto;

        if (password !== confirm_password) {
            throw new BadRequestException('password not match.');
        }

        const existingUser = await this.signUpRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('Email already exists.');
        }

        const user = this.signUpRepository.create({
            name,
            email,
            password,
            confirm_password
        });
        if (user) {
            await this.signUpRepository.save(user);

            // const token = jwt.sign({user}, process.env.JWT_SECRET, {
            //     expiresIn: process.env.JWT_EXPIRY,
            // });

            const token = jwt.sign({ user }, "00010100", {
                expiresIn: "30d",
            });

            return {
                message: 'User created successfully.',
                token
            };
        } else {
            return { message: 'User creation failed.' };
        }
    }
    @SkipThrottle({ default: false })
    dontSkip() {
        return 'List users work with Rate limiting.';
      }
    async login(loginDto: LoginDto): Promise<{ message: string }> {
        const { email, password } = loginDto;

        const user = await this.signUpRepository.findOne({ where: { email } });
        // console.log("user",user);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.password !== password) {
            throw new BadRequestException('Invalid email or password.');
        }

        return {
            message: 'Login successful.',
        };
    }


    async getById(id: number): Promise<SignUp> {
        const user = await this.signUpRepository.findOne({ where: { id } });
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    
}


