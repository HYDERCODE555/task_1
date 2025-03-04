import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length, Matches } from "class-validator";

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @Length(8,15)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
          'password must contain uppercase, lowercase, number and special character',
      })
    password : string

    @IsNotEmpty()
    @IsString()
    @Length(8,15)
    confirm_password : string
}