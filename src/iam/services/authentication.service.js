import httpInstance from "../../shared/services/http.instance.js";


/**
 * Service class to call authentication APIs
 * @summary
 * This class is responsible to call authentication APIs.
 * It contains methods to call sign-in and sign-up APIs.
 */
export class AuthenticationService {
    /**
     * Method to call sign-in API
     * @param signInRequest {SignInRequest} - Request object to sign-in
     * @returns {Promise<http.AxiosResponse<SignInResponse>>} - Response from the API
     *
     */
    signIn(signInRequest) {
        return httpInstance.post("/authentication/sign-in", signInRequest);
    }

    /**
     * Method to call sign-up API
     * @param signUpRequest {SignUpRequest} - Request object to sign-up
     * @returns {Promise<http.AxiosResponse<SignUpResponse>>} - Response from the API
     */
    signUp(signUpRequest) {
        return http.post("/authentication/sign-up", signUpRequest);
    }
}