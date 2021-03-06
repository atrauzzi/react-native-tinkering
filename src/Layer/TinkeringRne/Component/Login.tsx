import React from "react";
import * as Yup from "yup";
import { Card, SocialIcon } from "react-native-elements";
import { Form } from "protoculture-react-form";
import { FormInput } from "../../ProtocultureReactFormRne/Component/FormInput";
import { SubmitButton } from "../../ProtocultureReactFormRne/Component/SubmitButton";
import { reactInject } from "../../ProtocultureReactNative/Component/ReactInject";
import { tinkeringRneSymbols } from "../Symbols";
import { PasswordLogin } from "../Domain/PasswordLogin";
import { UsesEventBus } from "../../ProtocultureReactNative/Component/WithEventBus";
import { AuthenticationService } from "../Service/AuthenticationService";


interface ComponentProps {

    authenticationService: AuthenticationService;
}

export type Props = ComponentProps & UsesEventBus;

class LoginComponent extends React.PureComponent<Props> {

    public render() {

        return <>

            <Card title="Login">

                <Form
                    schema={Yup.object({
                        usernameoremail: Yup.string().min(3, "Please enter at least 3 characters."),
                        password: Yup.string().min(6, "Please enter at least 6 characters."),
                    })}
                    data={({
                        usernameoremail: "",
                        password: "",
                    } as PasswordLogin)}
                    onSubmit={this.doPasswordLogin}
                >
                    <FormInput
                        name="usernameoremail"
                        label="Username or Email"
                        placeholder="Enter your username or email address."
                    />

                    <FormInput 
                        secureTextEntry 
                        name="password"
                        label="Password"
                        placeholder="Enter your password."
                    />

                    <SubmitButton
                        title="Go"
                    />
                </Form>

            </Card>

            <Card title="Third Party">

                {/* https://github.com/react-native-training/react-native-elements/issues/1600 */}
                <SocialIcon
                    button
                    type="google-plus-official"
                    title="Sign in with Google"
                    onPress={this.doGoogleLogin}
                />

                <SocialIcon 
                    button
                    type="facebook"
                    title="Sign in with Facebook"
                    onPress={this.doFacebookLogin}
                />

            </Card>
        </>
    }

    private doPasswordLogin = async (passwordLogin: PasswordLogin) => {
       
        try {

            await this.props.authenticationService.login(passwordLogin);
        }
        catch (e) {
            
            alert("Invalid login.");
        }
    }

    private doGoogleLogin = async () => {

        const googleLogin = await this.props.authenticationService.loginGoogle();

        console.log(googleLogin);
    };

    private doFacebookLogin = async () => {

       const facebookLogin = await this.props.authenticationService.loginFacebook();

       console.log(facebookLogin);
    };
}

export const Login = reactInject(tinkeringRneSymbols.AuthenticationService, "authenticationService", LoginComponent);
