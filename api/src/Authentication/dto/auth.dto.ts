export class SignupDto {
    email: string;
    password: string;
    username: string;
}

export class SigninDto {
    email: string;
    password: string;
}

export class SigninSocialDto {
    email: string;
    idToken: string;
    familyName: string;
    givenName: string;
    photo: string;
    username: string;
}
